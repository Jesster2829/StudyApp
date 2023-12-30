import React from "react";


/*
    This file is used to hold the different Intefaces
    To be used by the application for Database Management
*/

export interface Task {
    Name: string;
    isComplete: boolean;
}

export interface User {
    Name: string;
    Email: string;
    
}