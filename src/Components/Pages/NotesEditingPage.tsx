import { ThemeProvider } from "@emotion/react";
import React from "react";
import { darker } from "../../themes";
import { Button, Paper, TextField, Typography } from "@mui/material";
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { useLocation } from "react-router-dom";
import { db } from "../../Config/FireBase";
import { getAuth } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

export const NoteEditing = () => {
  const [content, setContent] = React.useState<String>("");
  const [name, setName] = React.useState<String>("");
  const [oldContent, setOldContent] = React.useState<String>("");

  const auth = getAuth();
  const location = useLocation();
  const noteName = location.state?.NoteName || "";

  const getNotes = async() => {
    const ref = doc(db, "users", auth.currentUser?.uid || "");
    const refSnap = await getDoc(ref);
    const data = refSnap.data();

    if (data?.Notes) {
      const filteredNotes = data.Notes.filter((n: {Name: string}) => n.Name === noteName);
      setName(filteredNotes[0].Name);
      setOldContent(filteredNotes[0].Content);
      setContent(filteredNotes[0].Content);
    }
  }

  React.useEffect(() => {
    getNotes();
  }, []);

  const saveChanges = async() => {
    console.log("saving changes");
    const ref = doc(db, "users", auth.currentUser?.uid || "");
    console.log(ref);
    await updateDoc(ref, {Notes: arrayRemove({Name: noteName, Content: oldContent})});
    await updateDoc(ref, {Notes: arrayUnion({Name: noteName, Content: content})});
    setOldContent(content);
    console.log("finished saving");
  }

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }

  return (
    <ThemeProvider theme={darker}>
      <ResponsiveAppBar />
      <br></br>
      <Paper 
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          // height: 500,
          // figure out the width
        }}>
        
        <Typography>name: {name}</Typography>
        
        {/* figure out the white space and resizing */}
        <TextField
          defaultValue={content}
          multiline
          fullWidth
          sx={{
            // whiteSpace: 'pre-line',
            '& fieldset': {border: 'none'},
          }}
          onChange={handleContentChange}/>
          <Typography>{content}</Typography>
      </Paper>
      <Button onClick={saveChanges}>Save</Button>
    </ThemeProvider>
  )
}