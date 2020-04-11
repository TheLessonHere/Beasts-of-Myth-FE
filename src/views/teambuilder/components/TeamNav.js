import React, { useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Components
import LibrarySearchbar from './LibrarySearchbar';
import { SubmitButton } from '../../../utils/components/SubmitButton';
// Classes
import Team from '../../../classes/Team';
import Beast from '../../../classes/Beast';
import Move from '../../../classes/Move';
import Item from '../../../classes/Item';

function TabPanel(props) {
    const { children, value, index, classes, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        <Box p={3} className={classes.boxes}>{children}</Box>
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
    },
    boxes: {
      height: "550px"
    },
    formControl: {
      margin: theme.spacing(1),
      display: "flex",
      flexFlow: "column",
      minWidth: 150,
    },
    topInputs: {
      maxWidth: "600px",
      width: "100%"
    },
    circleProgress: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2)
      }
    }
  }));

export default function TeamNav(props) {
    const { allLibraries, items, stopBuilding } = props;
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    const [format, setFormat] = useState('');
    const [teamName, setTeamName] = useState('');
    const [slot1, setSlot1] = useState(null);
    const [slot2, setSlot2] = useState(null);
    const [slot3, setSlot3] = useState(null);
    const [slot4, setSlot4] = useState(null);
    const [slot5, setSlot5] = useState(null);
    const [activeSlot, setActiveSlot] = useState('slot1');

    const handleTabChange = (event, newValue) => {
        event.preventDefault();
        setTabValue(newValue);
        switch(newValue){
            case 0:
                setActiveSlot('slot1');
                break;
            case 1:
                setActiveSlot('slot2');
                break;
            case 2:
                setActiveSlot('slot3');
                break;
            case 3:
                setActiveSlot('slot4');
                break;
            case 4:
                setActiveSlot('slot5');
                break;
            default:
                console.log("Error with shifting tabs.")
        };
    };

    const handleFormatChange = (event) => {
      setFormat(event.target.value);
    };

    const handleTeamNameChange = (event) => {
      setTeamName(event.target.value);
    };

    const onBeastClick = (event) => {

    }

    return(
        <div className={classes.tabs}>
            <Container>
              <FormControl className={classes.formControl}>
                <InputLabel id="simple-select-label">Format</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="format-select"
                    value={format}
                    autoWidth={true}
                    className={classes.topInputs}
                    onChange={handleFormatChange}
                  >
                    <MenuItem value={'Unrestricted'}>Unrestricted</MenuItem>
                  </Select>
                  <TextField
                    value={teamName}
                    onChange={handleTeamNameChange}
                    label="Team Name"
                    variant="filled"
                    className={classes.topInputs}
                  />
              </FormControl>
            </Container>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="simple tabs example"
              variant="fullWidth"
            >
              <Tab label="Slot 1" {...a11yProps(0)} />
              <Tab label="Slot 2" {...a11yProps(1)} />
              <Tab label="Slot 3" {...a11yProps(2)} />
              <Tab label="Slot 4" {...a11yProps(3)} />
              <Tab label="Slot 5" {...a11yProps(4)} />
            </Tabs>
            <TabPanel classes={classes} value={tabValue} index={0}>
                <LibrarySearchbar allLibraries={allLibraries} />
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={1}>
                <LibrarySearchbar allLibraries={allLibraries} />
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={2}>
                <LibrarySearchbar allLibraries={allLibraries} />
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={3}>
                <LibrarySearchbar allLibraries={allLibraries} />
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={4}>
                <LibrarySearchbar allLibraries={allLibraries} />
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
        </div>
)}