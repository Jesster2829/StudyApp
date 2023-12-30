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
import { Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    // profile picture
    const auth = getAuth();
    const picture = auth.currentUser?.photoURL;
    const navigate= useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const returnToHome = () => {
        navigate('/homePage');


    }
    return (
        <ThemeProvider theme={darker}>
            <AppBar position="fixed"  sx={{ justifyContent: 'center', backgroundColor: 'secondary.main'}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" padding={2}>
                    <MenuIcon sx={{color: 'primary.main'}}></MenuIcon>
                    <Button onClick={returnToHome}>
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
                    </Button>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar src={picture || ''} alt="Profile Picture" />   
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                </Stack>
            </AppBar>
        </ThemeProvider>
    );
}
export default ResponsiveAppBar;