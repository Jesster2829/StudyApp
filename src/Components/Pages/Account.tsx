import { Avatar, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { darker } from "../../themes";
import { getAuth } from "firebase/auth";

export const AccountPage = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
    // User is signed in, so you can get the properties of the user.
    const email = user.email; // Email
    const displayName = user.displayName; // Display Name
    const photoURL = user.photoURL; // Profile Picture URL
    const phoneNumber = user.phoneNumber; // Phone Number
    const emailVerified = user.emailVerified; // Email Verification Status
}

    return (
        <ThemeProvider theme={darker}>
        <ResponsiveAppBar />
        <Stack>
            {user && (
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={user.photoURL || ""} alt={user.displayName || ""} />
                    <Typography variant="h6">{user.displayName}</Typography>
                    <Typography variant="body2">{user.email}</Typography>
                </Stack>
            )}
            <Link to="/homePage">
                <Button>Home</Button>
            </Link>
        </Stack>
    </ThemeProvider>
    );
}