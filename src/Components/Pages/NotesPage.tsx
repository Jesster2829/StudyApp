import { Button, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { darker } from "../../themes";
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { Link } from "react-router-dom";
import { Note } from "../../FireBaseManagement/AppBaseTypes";

export const Notes = () => {
    const [notes, setNotes] = React.useState<Note[]>([]);

    React.useEffect(() => {
        setNotes([{Name: "Math", Content: ""}, {Name: "Astronomy", Content: ""}]);
    }, []);

    return (
        <ThemeProvider theme={darker}>
            <ResponsiveAppBar />

            <Stack spacing={1}>
            {notes.map((note) => (
                <Paper sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography>{note.Name}</Typography>
                        <Link to="/notes">
                            <Button>Edit</Button>
                        </Link>
                    </Stack>
                </Paper>
            ))}
            </Stack>

        </ThemeProvider>
    )
}