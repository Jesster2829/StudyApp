import { ThemeProvider } from "@emotion/react";
import React from "react";
import { darker } from "../../themes";
import { Button, Paper, TextField, Typography } from "@mui/material";
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { Note } from "../../FireBaseManagement/AppBaseTypes";
import { useLocation } from "react-router-dom";

export const NoteEditing = () => {
  const [notes, setNotes] = React.useState<Note[]>([{Name: "Math", Content: "math"}, {Name: "Astronomy", Content: "astronomy"}]);
  const [content, setContent] = React.useState<String>("");

  const location = useLocation();
  const noteName = location.state?.NoteName || "";

  React.useEffect(() => {
    notes.forEach((n) => {
      if (n.Name === noteName) {
        setContent(n.Content);
      }
    });
  }, []);

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
        
        {/* figure out the white space and resizing */}
        {/* <TextField
          defaultValue="hello"
          multiline
          fullWidth
          sx={{
            // whiteSpace: 'pre-line',
            '& fieldset': {border: 'none'},
          }}/> */}
          <Typography>{content}</Typography>
      </Paper>
      <Button>Save</Button>
    </ThemeProvider>
  )
}