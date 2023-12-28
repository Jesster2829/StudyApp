import React from "react";
import { Tab, Tabs, AppBar, Box, Avatar } from "@mui/material";
import { Menu } from "../Menu";
import { getAuth } from "firebase/auth";
import {db} from "../../Config/FireBase";
import { getDocs, collection } from "firebase/firestore";


export const Home = () => {
  const [value, setValue] = React.useState(0);
  const [classes, setClasses] = React.useState([]); 
  const auth = getAuth();
  const picture = auth.currentUser?.photoURL;
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
    fetchClasses();
  }, []);




  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue, lists[value].class)
  };

  return (
    <Box sx={{ flexGrow: 1 }}> 
    <Avatar src={picture || ''} alt="Profile Picture" />     
      <Menu />
      <AppBar position="static">

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>

          <Tabs value={value} onChange={handleChange} centered>
          {lists.map((classItem, index) => 
            classItem.user === auth.currentUser?.uid && (
              <Tab label={`Class ${classItem.class}`} key={index} />
            )
          )}
          </Tabs>
          
          </Box>
      </AppBar>
    </Box>
  );
};
