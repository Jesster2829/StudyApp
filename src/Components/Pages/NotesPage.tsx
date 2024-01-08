import { Button, Dialog, DialogContent, Paper, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { darker } from "../../themes";
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { useNavigate } from "react-router-dom";
import { Note } from "../../FireBaseManagement/AppBaseTypes";

export const Notes = () => {
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [open, setOpen] = React.useState(false);
    const [newNote, setNewNote] = React.useState<string>("");

    const navigate = useNavigate();

    React.useEffect(() => {
        setNotes([{Name: "Math", Content: "math"}, {Name: "Astronomy", Content: "astronomy"}]);
    }, []);

    function selectNote(name: string) {
        console.log(name);
        navigate(`/notes`, {state: {NoteName: name}});
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    const handleCreate = () => {
        console.log("create");
        setNotes([...notes, {Name: newNote, Content: ""}]);
        setOpen(false);
    }

    const handleNoteNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewNote(event.target.value);
    }

    return (
        <ThemeProvider theme={darker}>
            <ResponsiveAppBar />

            <Stack spacing={1}>
            {notes.map((note) => (
                <Paper 
                  key={note.Name}
                  sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>{note.Name}</Typography>
                        <Button
                          onClick={() => selectNote(note.Name)}    
                        >Edit</Button>
                    </Stack>
                </Paper>
            ))}
            <Button onClick={handleOpen}>
                New Note
            </Button>
            </Stack>
            
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    <TextField 
                      fullWidth
                      id="Note Name"
                      onChange={handleNoteNameChange}
                    />
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogContent>
            </Dialog>

        </ThemeProvider>
    )
}