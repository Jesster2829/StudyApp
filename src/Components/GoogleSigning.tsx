
import { useState } from 'react';
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../Config/FireBase';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export const GoogleSigning = () => {
    const [email, setEmail] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
        auth.currentUser?.email && setEmail(auth.currentUser?.email);
        localStorage.setItem("email", auth.currentUser?.email || "");
        if (localStorage.getItem("email") !== "") {
            console.log(localStorage.getItem("email"));
            navigate("/homePage");
        }
    }

    const signOutWithGoogle = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
        auth.currentUser?.email && setEmail("");
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography>Current User: {email}</Typography>
                <Button onClick={signInWithGoogle}>Sign In With Google</Button>
                <Button onClick={signOutWithGoogle}>Sign Out</Button>
            </Box>
        </Box>
    )
}
