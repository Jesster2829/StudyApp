//create a authentication component that uses google authentication from firebase

import React,{useState} from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../Config/FireBase';
import { Flex, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
export const GoogleSigning = () => {
    const [email, setEmail] = useState("");
    const auth = getAuth();
    const navigate = useNavigate();    

    const signInWithGoogle = async () => {
        try{
        await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
        auth.currentUser?.email && setEmail(auth.currentUser?.email);
        navigate("/homePage");
    }

    const signOutWithGoogle = async () => {
        try{
        await signOut(auth);
        } catch (error) {
            console.log(error);
        }
        auth.currentUser?.email && setEmail("");
    }
    
    return (
        <div>
            <Flex direction="column" gap="2">
                <Text>Current User: {email}</Text>
                <Button onClick={signInWithGoogle}>Sign In With Google</Button>
                <Button onClick={signOutWithGoogle}>Sign Out</Button>
            </Flex>
        </div>
    )
}
