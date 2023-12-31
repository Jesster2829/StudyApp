import React from "react";
import {
  Button,
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
}: {
  name: string;
  description: string;
  getUserClasses: () => void;
}) {
  const oldName = name;
  const oldDescription = description;
  const [open, setOpen] = React.useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const userRef = collection(db, "users");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    setOpen(false);
    getUserClasses();
  };

  const handleDelete = async () => {
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = async (confirmed: boolean) => {
    
    setDeleteConfirmationOpen(false);
    if (confirmed) {
        //first gets the document of the user
      const userDoc = doc(userRef, uid);
      const classes = await getDoc(userDoc);
      //then gets the data of the user
      const classesData = classes.data();
      //filters through the classes, and does not include the class that is being deleted
      const newClasses = classesData?.Classes.filter(
        (c: { className: string; description: string }) =>
          c.className !== oldName || c.description !== oldDescription
      );
        //updates the document with the new classes
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
        <DialogTitle>{"Editing flash set:" + name}</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-textarea"
            label="Description"
            placeholder="Placeholder"
            multiline
            variant="filled"
            defaultValue={description}
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
