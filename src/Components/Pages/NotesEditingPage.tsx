import { ThemeProvider } from "@emotion/react";
import React from "react";
import { darker } from "../../themes";
import { Paper, TextField, Typography } from "@mui/material";

export const NoteEditing = () => {
  return (
    <ThemeProvider theme={darker}>
      <Paper 
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}>
        
        <TextField
          defaultValue="hello" 
          multiline
          sx={{
            whiteSpace: 'pre-wrap',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove the border
              },
              '&:hover fieldset': {
                border: 'none', // Remove border on hover
              },
              '&.Mui-focused fieldset': {
                border: 'none', // Remove border when focused
              },
            },
          }}/>
      </Paper>
    </ThemeProvider>
  )
}