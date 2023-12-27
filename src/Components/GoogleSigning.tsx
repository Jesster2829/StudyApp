//create a authentication component that uses google authentication from firebase

import React,{useState} from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from '../Config/FireBase';


export const GoogleSigning = () => {
    const [email, setEmail] = useState("");
    const auth = getAuth();
    
    const signInWithGoogle = async () => {
        try{
        await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
        auth.currentUser?.email && setEmail(auth.currentUser?.email);
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
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <button onClick={signOutWithGoogle}>Sign out</button>
        </div>
    )
}
