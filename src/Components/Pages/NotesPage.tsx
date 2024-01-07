import { Button, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { darker } from "../../themes";
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { useNavigate } from "react-router-dom";
import { Note } from "../../FireBaseManagement/AppBaseTypes";

export const Notes = () => {
    const [notes, setNotes] = React.useState<Note[]>([]);

    const navigate = useNavigate();

    React.useEffect(() => {
        setNotes([{Name: "Math", Content: "math"}, {Name: "Astronomy", Content: "astronomy"}]);
    }, []);

    function selectNote(name: string) {
        console.log(name);
        navigate(`/notes`, {state: {NoteName: name}});
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
                            onClick={() => {
                                console.log(note.Name);
                                selectNote(note.Name)}}>Edit</Button>
                    </Stack>
                </Paper>
            ))}
            </Stack>

        </ThemeProvider>
    )
}