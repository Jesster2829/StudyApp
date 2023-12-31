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
import { ColorPicker } from "./ColorPicker";
import { Flashcard } from "../../FireBaseManagement/AppBaseTypes";

export function NewFlashCard({
  getFlashCards, className
}: {
  getFlashCards: () => void;
    className: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [Question, setQuestion] = React.useState("");
  const [description, setDescription] = React.useState("");
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const userRef = collection(db, "users");



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    if (Question !== "" || description !== "") {
        console.log(uid )
        console.log(auth.currentUser?.email ?? "")


        const userDoc = doc(db, "users", uid || "");

        const NewFlashCard: Flashcard = {
            Question: Question,
            Answer: description,
            id: uid ?? "",
            User: auth.currentUser?.email ?? "",
            Class_Name: className,
        }

        await updateDoc(userDoc, {
            FlashCards: arrayUnion({
                NewFlashCard
            }),
        });

      
      console.log("done");
      setOpen(false);
      getFlashCards();
      setQuestion("");
      setDescription("");
    } else {
      alert("Please fill out all fields");
    }
  };

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion(event.target.value);
  };
  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleCancel = () => {
    setOpen(false);
    setQuestion("");
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
            outline: "2px solid #373c50",
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create New FlashCard
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Question"
              type="name"
              multiline
              fullWidth
              variant="standard"
              value={Question}
              onChange={handleQuestionChange}
            />
            <TextField
              autoFocus
              id="description"
              label="Answer"
              type="description"
              multiline
              fullWidth
              variant="standard"
              onChange={handleAnswerChange}
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
