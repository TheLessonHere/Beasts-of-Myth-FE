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
// Libraries
import { beasts } from '../../../data/libraries/BeastLibrary';

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
    const [newBeastAdded, setNewBeastAdded] = useState(false);
    const [activeSlot, setActiveSlot] = useState('slot1');
    const [activeMoveSlot, setActiveMoveSlot] = useState('move1');
    const [isChoosingMove, setIsChoosingMove] = useState(false);
    const [isChoosingItem, setIsChoosingItem] = useState(true);
    const [itemSuggestions, setItemSuggestions] = useState([]);
    const [moveSuggestions, setMoveSuggestions] = useState([]);

    useEffect(() => {
      console.log("New beast added.")
    }, [ newBeastAdded ])

    useEffect(() => {
    }, [ isChoosingItem, isChoosingMove ])

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

    const onBeastClick = (beast) => {
      // Fills in active slot with beast info and renders SlotForm
      const data = beasts.find(beastData => beastData.search_id === beast);
      const currBeast = new Beast(data.format,
                                  data.beast_id,
                                  data.beast_name,
                                  data.domain1,
                                  data.domain2,
                                  data.ability,
                                  data.hp,
                                  data.pa,
                                  data.pd,
                                  data.ma,
                                  data.md,
                                  data.sc,
                                  data.moveList);

      switch(activeSlot){
        case 'slot1':
          setSlot1(currBeast);
          setNewBeastAdded(!newBeastAdded);
          break;
        case 'slot2':
          setSlot2(currBeast);
          setNewBeastAdded(!newBeastAdded);
          break;
        case 'slot3':
          setSlot3(currBeast);
          setNewBeastAdded(!newBeastAdded);
          break;
        case 'slot4':
          setSlot4(currBeast);
          setNewBeastAdded(!newBeastAdded);
          break;
        case 'slot5':
          setSlot5(currBeast);
          setNewBeastAdded(!newBeastAdded);
          break;
        default:
          console.log("Error setting move suggestions.");
      }
    }

    const chooseItem = (event) => {
      // renders item search results under form
      console.log(event.target);
      setIsChoosingMove(false);
      setIsChoosingItem(true);
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
      console.log(event.target.id);
      setActiveMoveSlot(event.target.id);
      setIsChoosingItem(false);
      setIsChoosingMove(true);
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
              break;
            case 'slot2':
              currSuggestions = slot2.moveList.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
              });
              break;
            case 'slot3':
              currSuggestions = slot3.moveList.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
              });
              break;
            case 'slot4':
              currSuggestions = slot4.moveList.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
              });
              break;
            case 'slot5':
              currSuggestions = slot5.moveList.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
              });
              break;
            default:
              console.log("Error setting move suggestions.");
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
                slot1 !== null && isChoosingItem ?
                <>
                  <SlotForm beast={slot1}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} />
                </> :
                slot1 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot1}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
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
                slot2 !== null && isChoosingItem ?
                <>
                  <SlotForm beast={slot2}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} />
                </> :
                slot2 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot2}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
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
                slot3 !== null && isChoosingItem ?
                <>
                  <SlotForm beast={slot3}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} />
                </> :
                slot3 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot3}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
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
                slot4 !== null && isChoosingItem ?
                <>
                  <SlotForm beast={slot4}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} />
                </> :
                slot4 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot4}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
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
                slot5 !== null && isChoosingItem ?
                <>
                  <SlotForm beast={slot5}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} />
                </> :
                slot5 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot5}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
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