import React from "react";
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { db } from "../../Config/FireBase";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { ColorPicker } from "./ColorPicker";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FlashCardSetEdit({
  name,
  description,
  getUserClasses,
  color
}: {
  name: string;
  description: string;
  getUserClasses: () => void;
  color: string;
}) {
  const oldName = name;
  const oldDescription = description;
  const [open, setOpen] = React.useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [newDescription, setNewDescription] = React.useState("");
  const [newColor, setNewColor] = React.useState("");
  
  
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const userRef = collection(db, "users");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewDescription(oldDescription);
  };

  const handleSave = async () => {
    console.log("saving new color is: ", newColor)
    if (newDescription === "") {
      alert("Description cannot be empty");
      return;
    }
    const userDoc= doc(userRef, uid);
    const userDocSnapshot = await getDoc(userDoc);
    const userData = userDocSnapshot.data();
    const userClasses = userData?.Classes;

    if (newColor === "") {
        setNewColor(color);
        }
   
    if(userClasses.length !== 0){
        const newClasses = userClasses.map((c: { className: string; description: string, color: string }) => {
        if(c.className === oldName){
            return {className: oldName, description: newDescription, color: "primary.main"}
        }
        return c;
        });
        await updateDoc(userDoc, {
            
        Classes: newClasses,
        });
        
        }
    const classDoc = setOpen(false);
    setNewColor("");
    getUserClasses();
  };

  const handleDelete = async () => {
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = async (confirmed: boolean) => {
    setDeleteConfirmationOpen(false);
    if (confirmed) {
      const userDoc = doc(userRef, uid);
      const classes = await getDoc(userDoc);
      const classesData = classes.data();
      const newClasses = classesData?.Classes.filter(
        (c: { className: string; description: string }) =>
          c.className !== oldName || c.description !== oldDescription
      );
      await updateDoc(userDoc, {
        Classes: newClasses,
      });

      setOpen(false);
      getUserClasses();
    }
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        onClick={handleClickOpen}
        sx={{ color: "primary.main", backgroundColor: "secondary.main" }}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Editing flash set: \"" + name+"\""}</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-textarea"
            label="Description"
            placeholder="Placeholder"
            multiline
            variant="filled"
            defaultValue={description}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ color: "primary.main", backgroundColor: "secondary.main" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            sx={{ color: "primary.main", backgroundColor: "secondary.main" }}
          >
            Save
          </Button>
          <ColorPicker newColor={newColor}/>
          <Button
            onClick={handleDelete}
            sx={{ color: "secondary.main", backgroundColor: "primary.main" }}
          >
            Delete
          </Button>
          
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmationOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleDeleteConfirmationClose(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All flash cards for this set will be
            lost
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDeleteConfirmationClose(false)}
            sx={{ color: "primary.main", backgroundColor: "secondary.main" }}
          >
            No
          </Button>
          <Button
            onClick={() => handleDeleteConfirmationClose(true)}
            sx={{ color: "secondary.main", backgroundColor: "primary.main" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>    
      </React.Fragment>
  );
}
