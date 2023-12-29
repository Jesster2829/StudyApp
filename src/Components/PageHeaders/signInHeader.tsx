import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { getAuth } from "firebase/auth";
import { ThemeProvider } from '@emotion/react';
import { darker } from '../../themes';
import { Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export const SignInHeader = () => {

    return (
        <ThemeProvider theme={darker}>
            <AppBar position="fixed"  sx={{ justifyContent: 'center', backgroundColor: 'secondary.main'}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" padding={2}>
                    <Typography
                        variant="h2"
                        sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'primary.main',
                        }}
                    >
                        STUDiOUS
                    </Typography>
                </Stack>
            </AppBar>
        </ThemeProvider>
    );
}