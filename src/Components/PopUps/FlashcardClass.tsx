import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, ThemeProvider } from "@mui/material";
import { darker } from "../../themes";
import AddIcon from "@mui/icons-material/Add";
import { db } from "../../Config/FireBase";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, updateDoc,getDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";

export function FlashcardClass({
  getUserClasses,
}: {
  getUserClasses: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [className, setClassName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const userRef = collection(db, "users");

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    if (className !== "" || description !== "") {
      const userDoc = doc(userRef, uid);
      //check if class name already exists
      
        const userDocSnapshot = await getDoc(userDoc);
        const userData = userDocSnapshot.data();
        const userClasses = userData?.Classes || [];
        const classExists = userClasses.some((c: { className: string }) => c.className === className);

        if (classExists) {
          alert("Class name already exists");
          return;
        }

        await updateDoc(userDoc, {
        Classes: arrayUnion({
          className: className,
          description: description,
          color: getRandomColor(),
        }),
      });
      console.log("done");
      setOpen(false);
      getUserClasses();
      setClassName("");
      setDescription("");
    } else {
      alert("Please fill out all fields");
    }
  };

  const handleClassNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClassName(event.target.value);
  };
  const handleClassDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleCancel = () => {
    setOpen(false);
    setClassName("");
    setDescription("");
  };

  return (
    <ThemeProvider theme={darker}>
      <React.Fragment>
        <IconButton
          onClick={handleClickOpen}
          sx={{
            color: "primary.main",
            backgroundColor: "secondary.main",
            fontSize: "large",
            outline: "2px solid #373c50",
          }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a class for flashcards, please enter the name of the
              class
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Class Name"
              type="name"
              fullWidth
              variant="standard"
              value={className}
              onChange={handleClassNameChange}
            />
            <TextField
              autoFocus
              //   margin="dense"
              id="description"
              label="Class Description"
              type="description"
              multiline
              fullWidth
              variant="standard"
              onChange={handleClassDescriptionChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancel}
              sx={{ color: "primary.main", backgroundColor: "secondary.main" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              sx={{ color: "primary.main", backgroundColor: "secondary.main" }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </ThemeProvider>
  );
}
