import React from "react";
import { Tab, Tabs, Box, ThemeProvider, Button, AppBar, IconButton, Typography, Stack } from "@mui/material";
// import { Menu } from "../Menu";
import { getAuth } from "firebase/auth";
import { db } from "../../Config/FireBase";
import { getDocs, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { darker } from "../../themes";
import { Link } from 'react-router-dom';
import ResponsiveAppBar from "../PageHeaders/homeHeader";
import { HomeCalendar } from "../Calendar/homeCalendar";
import TodoList from "../Home/TodoList";
import { handleTodoList } from "../../FireBaseManagement/handleTodoList";
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Events from "../Home/Events";
import AllOutIcon from '@mui/icons-material/AllOut';


export const Home = () => {
  const [value, setValue] = React.useState(0);
  const auth = getAuth();

  //this is the picture of the user, if they have one. if not, it will be blank
  //this is the email of the user, if they have one. if not, it will be blank
  const email = auth.currentUser?.email;
  
  React.useEffect(() => {
    if (auth.currentUser?.uid !== null) {
      const userRef = collection(db, "users");
      const user = {
        uid: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        TodoList: [],
        FlashCards: [],
        Notes: [],
        Calendar: [],
        Classes: [],
      };

      const updateUser = async () => {
        try {
          const userDoc = doc(userRef, auth.currentUser?.uid);
          const userDocSnapshot = await getDoc(userDoc);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            if (!userData.uid || !userData.email || !userData.TodoList || !userData.FlashCards || !userData.Notes || !userData.Calendar || !userData.Classes) {
              await setDoc(userDoc, user, { merge: true });
              console.log("Document updated with ID: ", auth.currentUser?.uid);
            } else {
              console.log("Document already has all necessary fields!");
            }
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error updating document: ", e);
        }
      };
      updateUser();
    }
  }, []);

  return (
    <ThemeProvider theme={darker}>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Box
          marginTop={7}
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 5, mb: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    borderRadius: 10,
                  }}
                >
                  <TodoList />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    borderRadius: 10,
                  }}
                >
                  <Typography>
                    FlashCards
                  </Typography>
                  <Link to="/flashcardsPage">
                    <IconButton sx= {{fontSize: "large"}}>
                      <AllOutIcon />
                    </IconButton>
                  </Link>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 10,
                  }}
                >
                  <HomeCalendar />
                  <Link to="/calendarPage">
                    <IconButton sx= {{fontSize: "large"}}>
                      <AllOutIcon />
                    </IconButton>
                  </Link>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    borderRadius: 10,
                  }}
                >
                  <Events />
                </Paper>
                  <Box marginTop={2} >
                    <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                    borderRadius: 10,
                  }}>
                    <Typography>
                      Note's
                    </Typography>
                    <Stack direction="row">
                    <Link to="/notesPage">
                    <Button>
                      Quick Note
                    </Button>
                  </Link>
                    </Stack>
                    <Link to="/notesPage">
                    <IconButton sx= {{fontSize: "large"}}>
                      <AllOutIcon />
                    </IconButton>
                  </Link>
                    </Paper>
                  </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
