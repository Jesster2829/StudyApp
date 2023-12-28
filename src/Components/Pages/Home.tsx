import React from "react";
import { Tab, Tabs, AppBar, Box, Avatar } from "@mui/material";
import { Menu } from "../Menu";
import { getAuth } from "firebase/auth";
import {db} from "../../Config/FireBase";
import { getDocs, collection } from "firebase/firestore";


export const Home = () => {
  const [value, setValue] = React.useState(0);
  const [classes, setClasses] = React.useState([]); 
  const Classesreference= collection(db,"Classes");

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

      } catch (error) {
        console.log(error);
      }
      
    };
    fetchClasses();
  }, []);


  const auth = getAuth();
  const picture = auth.currentUser?.photoURL;


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}> 
    <Avatar src={picture || ''} alt="Profile Picture" />     
      <Menu />
      <AppBar position="static">

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>

          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Class 1" />
            <Tab label="Class 2" />
            <Tab label="Class 3" />
          </Tabs>
          <div>
            {classes.map((classes: any) => (
              <div key={classes.id}>
                <h1>{classes.Name}</h1>
              </div>
            ))}
          </div>
          </Box>
      </AppBar>
    </Box>
  );
};
