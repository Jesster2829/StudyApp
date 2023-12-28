import React from 'react';
import { createTheme } from '@mui/material/styles';

export const darker = createTheme({
    palette: {
        primary: {
        main: '#2A324B',
        },
        secondary: {
        main: '#F7C59F',
        },
        background: {
            default: '#E1E5EE',
        },
    },
});

export const lighter = createTheme({
    palette: {
        primary: {
            main: '#767B91',
        },
        secondary: {
            main: '#C7CCDB',
        },
        background: {
            default: '#E1E5EE',
        },
    },
});
