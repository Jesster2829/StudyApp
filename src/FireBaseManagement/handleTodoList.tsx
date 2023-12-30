import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { Task } from "./AppBaseTypes";
import { db } from '../Config/FireBase';


export const handleTodoList = async (userId: string) => {
    // Get a reference to the user's document
    const userRef = doc(db, 'users', userId);

    // Get the user's document
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        // The user's document exists
        const userData = userDoc.data();

        if (!userData?.TodoList) {
        // The TodoList field does not exist, create an empty array
        await updateDoc(userRef, { TodoList: [] });
        }
    } else {
        // The user's document does not exist
        console.log(`No document found for user with ID ${userId}`);
    }
}
