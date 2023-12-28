import React from "react";
import { Button, Tab, Tabs, AppBar, Box } from "@mui/material";
import { Menu } from "../Menu";

export const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        <Menu/>
      <AppBar position="static">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Class 1" />
            <Tab label="Class 2" />
            <Tab label="Class 3" />
          </Tabs>
        </Box>
      </AppBar>
    </Box>
  );
};
