import React, { useState, useEffect } from "react";
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
import ItemSearchSuggestions from './ItemSearchSuggestions';
import MoveSearchSuggestions from './MoveSearchSuggestions';
import { SubmitButton } from '../../../utils/components/SubmitButton';
// Classes
import Team from '../../../classes/Team';
import Beast from '../../../classes/Beast';
import Move from '../../../classes/Move';
import Item from '../../../classes/Item';
import SlotForm from "./SlotForm";

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
    const [activeMoveSlot, setActiveMoveSlot] = useState('move1');
    const [isChoosingMove, setIsChoosingMove] = useState(false);
    const [isChoosingItem, setIsChoosingItem] = useState(true);
    const [itemSuggestions, setItemSuggestions] = useState([]);
    const [moveSuggestions, setMoveSuggestions] = useState([]);

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

    const onBeastClick = (event, beast) => {
      // Fills in active slot with beast info and renders SlotForm
      console.log(event.target, beast);
      const currBeast = new Beast(beast.format,
        beast.beast_id,
        beast.beast_name,
        beast.domain1,
        beast.domain2,
        beast.ability,
        beast.hp,
        beast.pa,
        beast.pd,
        beast.ma,
        beast.md,
        beast.sc,
        beast.moveList);
    }

    const chooseItem = (event) => {
      // renders item search results under form
      console.log(event.target);
    }

    const onItemSearch = (event) => {
      const value = event.target.value;
      let currSuggestions = [];
      if (value.length > 0){
          const regex = new RegExp(`${value}`, 'i');
          currSuggestions = items.sort().filter(obj => {
              const searchId = obj.search_id;
              return regex.test(searchId);
          });
      }
      setItemSuggestions(currSuggestions);
    }

    const onItemClick = (event) => {
      // Sets the item of the beast in the active slot to the clicked item
    }

    const fillInMove = (event) => {
      // renders move search results under form and sets active move slot to
      // the clicked one based on its id
      console.log(event.target);
    }

    const onMoveSearch = (event) => {
      const value = event.target.value;
      let currSuggestions = [];
      if (value.length > 0){
          const regex = new RegExp(`${value}`, 'i');
          switch(activeSlot){
            case 'slot1':
              currSuggestions = slot1.moveList.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
              });
            case 'slot2':
              currSuggestions = slot2.moveList.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
              });
            case 'slot3':
              currSuggestions = slot3.moveList.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
              });
            case 'slot4':
              currSuggestions = slot4.moveList.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
              });
            case 'slot5':
              currSuggestions = slot5.moveList.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
              });
          }
      }
      setMoveSuggestions(currSuggestions);
    }

    const onMoveClick = (event) => {
      // Sets the clicked move to the active move slot
    }

    const returnDomains = (domain1, domain2) => {
      if(domain2){
          const capDomain1 = domain1.charAt(0).toUpperCase() + domain1.slice(1);
          const capDomain2 = domain2.charAt(0).toUpperCase() + domain2.slice(1);
          return `${capDomain1}-${capDomain2}`;
      } else {
          const capDomain1 = domain1.charAt(0).toUpperCase() + domain1.slice(1);
          return `${capDomain1}`;
      }
    }

    const saveTeam = () => {
      console.log('Team Saved')
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
                {slot1 === null ?
                <LibrarySearchbar allLibraries={allLibraries}
                                  returnDomains={returnDomains}
                                  onBeastClick={onBeastClick} /> :
                <SlotForm beast={slot1}
                          returnDomains={returnDomains}
                          chooseItem={chooseItem}
                          onItemSearch={onItemSearch}
                          fillInMove={fillInMove}
                          onMoveSearch={onMoveSearch} />
                }
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={1}>
                {slot2 === null ?
                <LibrarySearchbar allLibraries={allLibraries}
                                  returnDomains={returnDomains}
                                  onBeastClick={onBeastClick} /> :
                <SlotForm beast={slot2}
                          returnDomains={returnDomains}
                          chooseItem={chooseItem}
                          onItemSearch={onItemSearch}
                          fillInMove={fillInMove}
                          onMoveSearch={onMoveSearch} />
                }
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={2}>
                {slot3 === null ?
                <LibrarySearchbar allLibraries={allLibraries}
                                  returnDomains={returnDomains}
                                  onBeastClick={onBeastClick} /> :
                <SlotForm beast={slot3}
                          returnDomains={returnDomains}
                          chooseItem={chooseItem}
                          onItemSearch={onItemSearch}
                          fillInMove={fillInMove}
                          onMoveSearch={onMoveSearch} />
                }
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={3}>
                {slot4 === null ?
                <LibrarySearchbar allLibraries={allLibraries}
                                  returnDomains={returnDomains}
                                  onBeastClick={onBeastClick} /> :
                <SlotForm beast={slot4}
                          returnDomains={returnDomains}
                          chooseItem={chooseItem}
                          onItemSearch={onItemSearch}
                          fillInMove={fillInMove}
                          onMoveSearch={onMoveSearch} />
                }
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={4}>
                {slot5 === null ?
                <LibrarySearchbar allLibraries={allLibraries}
                                  returnDomains={returnDomains}
                                  onBeastClick={onBeastClick} /> :
                <SlotForm beast={slot5}
                          returnDomains={returnDomains}
                          chooseItem={chooseItem}
                          onItemSearch={onItemSearch}
                          fillInMove={fillInMove}
                          onMoveSearch={onMoveSearch} />
                }
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
        </div>
)}