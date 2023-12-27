//create a authentication component that uses google authentication from firebase

import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleProvider } from '../Config/FireBase';


export const GoogleSigning = () => {
    const auth = getAuth();
    
    const signInWithGoogle = async () => {
        try{
        await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}
