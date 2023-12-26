//create a authentication component that uses google authentication from firebase

import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export const Auth = () => {
    const auth = getAuth();
    
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }
    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}
