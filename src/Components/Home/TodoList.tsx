import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { ThemeProvider } from '@mui/material';
import { lighter } from '../../themes';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../Config/FireBase';


export default function TodoList() {
    const [checked, setChecked] = React.useState([0]);
    const [todoList, setTodoList] = React.useState([]);

    React.useEffect(() => {
        const userRef = doc(db, 'users', 'userId'); // replace 'userId' with the actual user ID
        const unsubscribe = onSnapshot(userRef, (doc) => {
            const data = doc.data();
            if (data?.TodoList) {
                setTodoList(data.TodoList);
                console.log(data.TodoList);
            }
        });

        // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <ThemeProvider theme={lighter}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: lighter.palette.secondary.main }}>
        {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
            <ListItem
                key={value}
                secondaryAction={
                <IconButton edge="end" aria-label="comments" style={{ backgroundColor: lighter.palette.primary.main, color: lighter.palette.primary.contrastText }}>
                    <CommentIcon />
                </IconButton>
                }
                disablePadding
            >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                    <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} sx={{ color: lighter.palette.primary.main }} />
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
        </ThemeProvider>
    );
}