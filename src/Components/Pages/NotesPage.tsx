import { Button, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { darker } from "../../themes";
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { Link } from "react-router-dom";

export const Notes = () => {
    return (
        <ThemeProvider theme={darker}>
            <ResponsiveAppBar />
            <Typography>Calendar goes here Maria</Typography>
            
            <Link to="/notes">
                <Button>Edit</Button>
            </Link>

        </ThemeProvider>
    )
}