import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop: 70
    },

    tabs: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop: 10
    },

    circleProgress: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2)
      }
    }
  }));

export default function Nav(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <div className={classes.tabs}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
            >
              <Tab label="Battle" {...a11yProps(0)} />
              <Tab label="Teambuilder" {...a11yProps(1)} />
              <Tab label="Account" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <Typography align="center">
                        Find a battle here!
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography align="center">
                        Build your teams here!
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography align="center">
                        View your account stats here!
                </Typography>
            </TabPanel>
        </div>
)}