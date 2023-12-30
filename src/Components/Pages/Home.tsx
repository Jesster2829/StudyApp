import React from "react";
import { styled, Tab, Tabs, Box, ThemeProvider, Button, Stack, AppBar } from "@mui/material";
// import { Menu } from "../Menu";
import { getAuth } from "firebase/auth";
import {db} from "../../Config/FireBase";
import { getDocs, collection } from "firebase/firestore";
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
  const [classes, setClasses] = React.useState([]); 
  const auth = getAuth();
  
  //this is the picture of the user, if they have one. if not, it will be blank
  //this is the email of the user, if they have one. if not, it will be blank
  const email = auth.currentUser?.email;

  //each user has a uid that is unique to them, so we can use that to filter the classes
  //this list contains mine (Jesse's) uid. if you want to test yours out, go to console and 
  //see what uid Prints out and replace it. this is a temp measure until we can get the database 
  // and middleware working and communicating with each other
  const lists = [
    { user: "uelk3an6UuPAqsrCqa3CNdhkyA23", class: "CMPT 332", useremail:email },
    { user: "uelk3an6UuPAqsrCqa3CNdhkyA23", class: "CMPT 317", useremail:email },
    { user: "uelk3an6UuPAqsrCqa3CNdhkyA23", class: "CMPT 340", useremail:email },
    { user: "2", class: "1" },
    { user: "2", class: "2" },
    { user: "2", class: "3" }
  ];


  //this is the reference to the classes collection in the database
  const Classesreference = collection(db, "Classes");
  
  React.useEffect(() => {
    const fetchClasses = async () => {
      try{
      const data = await getDocs(Classesreference);
      //so this function grabs the data, which is what we want from the database, then the id of each one. THis makes it 
      // so that filtered classes is all classes with userId and class Name. currently there is no field for the linked notes
      const filteredClasses= data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id}));

        console.log(filteredClasses);
        console.log("Your UID : "+ auth.currentUser?.uid);


      } catch (error) {
        console.log(error);
      }
      
    };
    if (auth.currentUser !== null) {
      handleTodoList(auth.currentUser?.uid)
    }
    fetchClasses();
  }, []);




  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue, lists[value].class)
  };

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
                <Container maxWidth="lg" sx={{ mt: 5, mb: 1}}>
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
