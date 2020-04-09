import React, { useState } from "react";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Components
import LibrarySearchbar from './LibrarySearchbar';
// Classes
import Team from '../../../classes/Team';
import Beast from '../../../classes/Beast';
import Move from '../../../classes/Move';
import Item from '../../../classes/Item';

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

export default function TeamNav(props) {
    const { allLibraries, items } = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [slot1, setSlot1] = useState({});
    const [slot2, setSlot2] = useState({});
    const [slot3, setSlot3] = useState({});
    const [slot4, setSlot4] = useState({});
    const [slot5, setSlot5] = useState({});
    const [activeSlot, setActiveSlot] = useState(slot1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch(newValue){
            case 0:
                setActiveSlot(slot1);
                break;
            case 1:
                setActiveSlot(slot2);
                break;
            case 2:
                setActiveSlot(slot3);
                break;
            case 3:
                setActiveSlot(slot4);
                break;
            case 4:
                setActiveSlot(slot5);
                break;
            default:
                console.log("Error with shifting tabs.")
        };
    };

    return(
        <div className={classes.tabs}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
            >
              <Tab label="Slot 1" {...a11yProps(0)} />
              <Tab label="Slot 2" {...a11yProps(1)} />
              <Tab label="Slot 3" {...a11yProps(2)} />
              <Tab label="Slot 4" {...a11yProps(3)} />
              <Tab label="Slot 5" {...a11yProps(4)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <LibrarySearchbar allLibraries={allLibraries} items={items}/>
                Slot 1
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LibrarySearchbar allLibraries={allLibraries} items={items}/>
                Slot 2
            </TabPanel>
            <TabPanel value={value} index={2}>
                <LibrarySearchbar allLibraries={allLibraries} items={items}/>
                Slot 3
            </TabPanel>
            <TabPanel value={value} index={3}>
                <LibrarySearchbar allLibraries={allLibraries} items={items}/>
                Slot 4
            </TabPanel>
            <TabPanel value={value} index={4}>
                <LibrarySearchbar allLibraries={allLibraries} items={items}/>
                Slot 5
            </TabPanel>
        </div>
)}