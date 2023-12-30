
import { useState } from 'react';
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../Config/FireBase';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { db } from '../Config/FireBase';



// firebase document imports
import { doc, setDoc, getDoc } from "firebase/firestore";

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
    
        if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
    
        // Check if the user document already exists
        const docSnap = await getDoc(userRef);
    
        if (!docSnap.exists()) {
            // User document does not exist, create a new document
            await setDoc(userRef, { email: auth.currentUser.email });
        }
    
        auth.currentUser?.email && setEmail(auth.currentUser?.email);
        localStorage.setItem("email", auth.currentUser?.email || "");
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

    const signInwithApple= async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
        auth.currentUser?.email && setEmail("");
    }

    const signInwithMicrosoft= async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
        auth.currentUser?.email && setEmail("");
    }

    const signInwithEmail= async () => {
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
                <IconButton onClick={signInWithGoogle}>
                    <GoogleIcon />
                </IconButton>
                <IconButton onClick={signInWithGoogle}>
                    <AppleIcon />
                </IconButton>
                <IconButton onClick={signInWithGoogle}>
                    <MicrosoftIcon />
                </IconButton>
            </Box>
        </Box>
    )
}
