import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, ThemeProvider } from '@mui/material';
import { darker, lighter } from '../../themes';
import AddIcon from '@mui/icons-material/Add';
import { AddShoppingCart } from '@mui/icons-material';

export function FlashcardClass() {
    const [open, setOpen] = React.useState(false);
    const [className, setClassName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log("class entered is", className);
        console.log("description entered is", description);
        setOpen(false);
        setClassName('');
        setDescription(''); 
    };

    const handleClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(event.target.value);
    };
    const handleClassDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };


    return (
        <ThemeProvider theme={darker}>
            <React.Fragment>
                <IconButton 
                    onClick={handleClickOpen} 
                    sx={{ 
                        color: 'primary.main', 
                        backgroundColor: 'secondary.main', 
                        fontSize: 'large',
                        outline: '2px solid #373c50' // Add outline style here
                    }}
                >
                    <AddIcon fontSize="large" />
                </IconButton>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a class for flashcards, please enter the name of the class
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Class Name"
                            type="name"
                            fullWidth
                            variant="standard"
                            value={className}
                            onChange={handleClassNameChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Class Description"
                            type="description"
                            fullWidth
                            variant="standard"
                            onChange={handleClassDescriptionChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ color: 'primary.main', backgroundColor: 'secondary.main' }}>Cancel</Button>
                        <Button onClick={handleClose} sx={{ color: 'primary.main', backgroundColor: 'secondary.main' }}>Create</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
    );
}