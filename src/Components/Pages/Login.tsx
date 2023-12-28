
import React from 'react';
import { Grid } from '@mui/material';
import { GoogleSigning } from '../GoogleSigning';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    return (
        <Grid container direction="column" spacing={2}>
            <GoogleSigning/>
        </Grid>
    )
}