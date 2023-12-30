import React from "react";
import { Tab, Tabs, Box, ThemeProvider, Button, AppBar } from "@mui/material";
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
                  }}
                >
                  <Link to="/calendarPage">
                    <Button>
                      Calendar
                    </Button>
                  </Link>
                  <Link to="/notesPage">
                    <Button>
                      Notes
                    </Button>
                    <Link to="/flashcardsPage">
                      <Button>
                        Flashcards
                      </Button>
                    </Link>
                  </Link>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <HomeCalendar />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Events />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
