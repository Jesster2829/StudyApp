import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { TextField } from '@mui/material';


export interface InputDialogProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputDialog({ text, setText }: InputDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  
    const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
        setMaxWidth(
          // @ts-expect-error autofill of arbitrary value is not handled.
          event.target.value,
        );
      };
  
    const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFullWidth(event.target.checked);
    };
  
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    };
  
    return (
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open max-width dialog
        </Button>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Optional sizes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can set my maximum width and whether to adapt or not.
            </DialogContentText>
            <Box
              noValidate
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: 'fit-content',
              }}
            >
              {/* Existing code for maxWidth and fullWidth */}
              {/* ... */}
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <InputLabel htmlFor="max-width">maxWidth</InputLabel>
                <Select
                  autoFocus
                  value={maxWidth}
                  onChange={handleMaxWidthChange}
                  label="maxWidth"
                  inputProps={{
                    name: 'max-width',
                    id: 'max-width',
                  }}
                >
                </Select>
              </FormControl>
              <FormControlLabel
                sx={{ mt: 1 }}
                control={
                  <Switch checked={fullWidth} onChange={handleFullWidthChange} />
                }
                label="Full width"
              />
  
              {/* New text input */}
              <TextField
                label="Text"
                value={text}
                onChange={handleTextChange}
                margin="normal"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  