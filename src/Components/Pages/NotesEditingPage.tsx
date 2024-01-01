import { ThemeProvider } from "@emotion/react";
import React from "react";
import { darker } from "../../themes";
import { Button, Paper, TextField, Typography } from "@mui/material";
import ResponsiveAppBar from "../PageHeaders/homeHeader";

export const NoteEditing = () => {
  return (
    <ThemeProvider theme={darker}>
      <ResponsiveAppBar />
      <Paper 
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 500,
          // figure out the width
        }}>
        
        <TextField
          defaultValue="hello" 
          multiline
          fullWidth
          sx={{
            whiteSpace: 'pre-line',
            '& fieldset': {border: 'none'},
          }}/>
      </Paper>
      <Button>Save</Button>
    </ThemeProvider>
  )
}