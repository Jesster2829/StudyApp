import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, ThemeProvider } from '@mui/material';
import { lighter } from '../../themes';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../Config/FireBase';
import { getAuth } from 'firebase/auth';
import { arrayUnion, updateDoc } from "firebase/firestore";
import { Task } from '../../FireBaseManagement/AppBaseTypes';

export default function TodoList() {
    const [checked, setChecked] = React.useState([0]);
    const [todoList, setTodoList] = React.useState<Task[]>([]);

    const auth = getAuth();

    React.useEffect(() => {

        if (auth.currentUser !== null) {
            const userRef = doc(db, 'users', auth.currentUser?.uid);
            const unsubscribe = onSnapshot(userRef, (doc) => {
                const data = doc.data();
                if (data?.TodoList) {
                    setTodoList(data.TodoList);
                    console.log(todoList);
                }
            });
    
            return () => unsubscribe();
        }
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

    const addTodo = async () => {
        const newTask = { Name: 'Testing', isComplete: false }; // The new task to add
    
        if (auth.currentUser !== null) {
            const userRef = doc(db, 'users', auth.currentUser?.uid);
            await updateDoc(userRef, {
                TodoList: arrayUnion(newTask)
            });
        }
    }

    return (
        <ThemeProvider theme={lighter}>
            <Button
            onClick={addTodo}
            >
                Add TODO
            </Button>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: lighter.palette.secondary.main }}>
    {todoList.map((task, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
        <ListItem
            key={index}
            secondaryAction={
            <IconButton edge="end" aria-label="comments" style={{ backgroundColor: lighter.palette.primary.main, color: lighter.palette.primary.contrastText }}>
                <DeleteForeverIcon />
            </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
            <ListItemIcon>
                <Checkbox
                edge="start"
                checked={checked.indexOf(index) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                />
            </ListItemIcon>
            <ListItemText id={labelId} primary={task.Name} sx={{ color: lighter.palette.primary.main }} />
            </ListItemButton>
        </ListItem>
        );
    })}
</List>
        </ThemeProvider>
    );
}