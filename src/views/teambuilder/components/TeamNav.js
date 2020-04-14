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
import { moves } from '../../../data/libraries/MoveLibrary';

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
    // Each slot needs an active move and item state
    const [itemSlot1, setItemSlot1] = useState("");
    const [itemSlot2, setItemSlot2] = useState("");
    const [itemSlot3, setItemSlot3] = useState("");
    const [itemSlot4, setItemSlot4] = useState("");
    const [itemSlot5, setItemSlot5] = useState("");
    const [moveSlot1, setMoveSlot1] = useState({
      move1: "",
      move2: "",
      move3: "",
      move4: ""
    });
    const [moveSlot2, setMoveSlot2] = useState({
      move1: "",
      move2: "",
      move3: "",
      move4: ""
    });
    const [moveSlot3, setMoveSlot3] = useState({
      move1: "",
      move2: "",
      move3: "",
      move4: ""
    });
    const [moveSlot4, setMoveSlot4] = useState({
      move1: "",
      move2: "",
      move3: "",
      move4: ""
    });
    const [moveSlot5, setMoveSlot5] = useState({
      move1: "",
      move2: "",
      move3: "",
      move4: ""
    });
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
                setItemSuggestions([]);
                setMoveSuggestions([]);
                break;
            case 1:
                setActiveSlot('slot2');
                setItemSuggestions([]);
                setMoveSuggestions([]);
                break;
            case 2:
                setActiveSlot('slot3');
                setItemSuggestions([]);
                setMoveSuggestions([]);
                break;
            case 3:
                setActiveSlot('slot4');
                setItemSuggestions([]);
                setMoveSuggestions([]);
                break;
            case 4:
                setActiveSlot('slot5');
                setItemSuggestions([]);
                setMoveSuggestions([]);
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
                                  data.move_list);

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
          console.log("Error setting Beast to slot.");
      }
    }

    const chooseItem = (event) => {
      setIsChoosingMove(false);
      setIsChoosingItem(true);
    }

    const onItemSearch = (event) => {
      const value = event.target.value;
      switch(activeSlot){
        case 'slot1':
          setItemSlot1(value);
          break;
        case 'slot2':
          setItemSlot2(value);
          break;
        case 'slot3':
          setItemSlot3(value);
          break;
        case 'slot4':
          setItemSlot4(value);
          break;
        case 'slot5':
          setItemSlot5(value);
          break;
        default:
          console.log("Error getting active slot for item.")
      }
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

    const onItemClick = (item) => {
      const data = items.find(itemData => itemData.search_id === item);
      const currItem = new Item(data.format,
        data.item_id,
        data.item_name,
        data.type,
        data.effect,
        data.description,
        data.short_description,
        data.removable);

      switch(activeSlot){
        case 'slot1':
          slot1.addItem(currItem);
          setItemSlot1(currItem.item_name);
          break;
        case 'slot2':
          slot2.addItem(currItem);
          setItemSlot2(currItem.item_name);
          break;
        case 'slot3':
          slot3.addItem(currItem);
          setItemSlot3(currItem.item_name);
          break;
        case 'slot4':
          slot4.addItem(currItem);
          setItemSlot4(currItem.item_name);
          break;
        case 'slot5':
          slot5.addItem(currItem);
          setItemSlot5(currItem.item_name);
          break;
        default:
          console.log("Error setting item to slot.");
      }

      setIsChoosingItem(false);
      setIsChoosingMove(true);
    }

    const fillInMove = (event) => {
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
              const allMoves1 = slot1.moveList.map(move => {
                const data = moves.find(moveData => moveData.move_name === move);
                const newMove = new Move(data.move_id,
                                        data.move_name,
                                        data.domain,
                                        data.type,
                                        data.base_power,
                                        data.me,
                                        data.priority,
                                        data.effect,
                                        data.description,
                                        data.short_description);
                return newMove;
              })
              currSuggestions = allMoves1.sort().filter(move => {
                const searchId = move.move_name;
                return regex.test(searchId);
              });
              switch(activeMoveSlot){
                case 'move1':
                  setMoveSlot1({...moveSlot1,
                                move1: value})
                                break;
                case 'move2':
                  setMoveSlot1({...moveSlot1,
                                move2: value})
                                break;
                case 'move3':
                  setMoveSlot1({...moveSlot1,
                                move3: value})
                                break;
                case 'move4':
                  setMoveSlot1({...moveSlot1,
                                move4: value})
                                break;
                default:
                  console.log("Error setting moves for slot1.")
              } break;
            case 'slot2':
              const allMoves2 = slot2.moveList.map(move => {
                const data = moves.find(moveData => moveData.move_name === move);
                const newMove = new Move(data.move_id,
                                        data.move_name,
                                        data.domain,
                                        data.type,
                                        data.base_power,
                                        data.me,
                                        data.priority,
                                        data.effect,
                                        data.description,
                                        data.short_description);
                return newMove;
              })
              currSuggestions = allMoves2.sort().filter(move => {
                const searchId = move.move_name;
                return regex.test(searchId);
              });
              switch(activeMoveSlot){
                case 'move1':
                  setMoveSlot2({...moveSlot2,
                                move1: value})
                                break;
                case 'move2':
                  setMoveSlot2({...moveSlot2,
                                move2: value})
                                break;
                case 'move3':
                  setMoveSlot2({...moveSlot2,
                                move3: value})
                                break;
                case 'move4':
                  setMoveSlot2({...moveSlot2,
                                move4: value})
                                break;
                default:
                  console.log("Error setting moves for slot2.")
              } break;
            case 'slot3':
              const allMoves3 = slot3.moveList.map(move => {
                const data = moves.find(moveData => moveData.move_name === move);
                const newMove = new Move(data.move_id,
                                        data.move_name,
                                        data.domain,
                                        data.type,
                                        data.base_power,
                                        data.me,
                                        data.priority,
                                        data.effect,
                                        data.description,
                                        data.short_description);
                return newMove;
              })
              currSuggestions = allMoves3.sort().filter(move => {
                const searchId = move.move_name;
                return regex.test(searchId);
              });
              switch(activeMoveSlot){
                case 'move1':
                  setMoveSlot3({...moveSlot3,
                                move1: value})
                                break;
                case 'move2':
                  setMoveSlot3({...moveSlot3,
                                move2: value})
                                break;
                case 'move3':
                  setMoveSlot3({...moveSlot3,
                                move3: value})
                                break;
                case 'move4':
                  setMoveSlot3({...moveSlot3,
                                move4: value})
                                break;
                default:
                  console.log("Error setting moves for slot3.")
              } break;
            case 'slot4':
              const allMoves4 = slot4.moveList.map(move => {
                const data = moves.find(moveData => moveData.move_name === move);
                const newMove = new Move(data.move_id,
                                        data.move_name,
                                        data.domain,
                                        data.type,
                                        data.base_power,
                                        data.me,
                                        data.priority,
                                        data.effect,
                                        data.description,
                                        data.short_description);
                return newMove;
              })
              currSuggestions = allMoves4.sort().filter(move => {
                const searchId = move.move_name;
                return regex.test(searchId);
              });
              switch(activeMoveSlot){
                case 'move1':
                  setMoveSlot4({...moveSlot4,
                                move1: value})
                                break;
                case 'move2':
                  setMoveSlot4({...moveSlot4,
                                move2: value})
                                break;
                case 'move3':
                  setMoveSlot4({...moveSlot4,
                                move3: value})
                                break;
                case 'move4':
                  setMoveSlot4({...moveSlot4,
                                move4: value})
                                break;
                default:
                  console.log("Error setting moves for slot4.")
              } break;
            case 'slot5':
              const allMoves5 = slot5.moveList.map(move => {
                const data = moves.find(moveData => moveData.move_name === move);
                const newMove = new Move(data.move_id,
                                        data.move_name,
                                        data.domain,
                                        data.type,
                                        data.base_power,
                                        data.me,
                                        data.priority,
                                        data.effect,
                                        data.description,
                                        data.short_description);
                return newMove;
              })
              currSuggestions = allMoves5.sort().filter(move => {
                const searchId = move.move_name;
                return regex.test(searchId);
              });
              switch(activeMoveSlot){
                case 'move1':
                  setMoveSlot5({...moveSlot5,
                                move1: value})
                                break;
                case 'move2':
                  setMoveSlot5({...moveSlot5,
                                move2: value})
                                break;
                case 'move3':
                  setMoveSlot5({...moveSlot5,
                                move3: value})
                                break;
                case 'move4':
                  setMoveSlot5({...moveSlot5,
                                move4: value})
                                break;
                default:
                  console.log("Error setting moves for slot5.")
              } break;
              default:
                console.log("Error getting active slot.")
          }}
      setMoveSuggestions(currSuggestions);
    }

    const onMoveClick = (event) => {
      // Sets the clicked move to the active move slot
      switch(activeSlot){
        case 'slot1':
          const data1 = items.find(itemData => itemData.search_id === itemSlot1);
          const currItem1 = new Item(data1.format,
            data1.item_id,
            data1.item_name,
            data1.type,
            data1.effect,
            data1.description,
            data1.short_description,
            data1.removable);
          slot1.addItem(currItem1);
          setItemSlot1(currItem1.item_name);
          break;
        case 'slot2':
          const data2 = items.find(itemData => itemData.search_id === itemSlot2);
          const currItem2 = new Item(data2.format,
            data2.item_id,
            data2.item_name,
            data2.type,
            data2.effect,
            data2.description,
            data2.short_description,
            data2.removable);
          slot2.addItem(currItem2);
          setItemSlot2(currItem2.item_name);
          break;
        case 'slot3':
          const data3 = items.find(itemData => itemData.search_id === itemSlot3);
          const currItem3 = new Item(data3.format,
            data3.item_id,
            data3.item_name,
            data3.type,
            data3.effect,
            data3.description,
            data3.short_description,
            data3.removable);
          slot3.addItem(currItem3);
          setItemSlot3(currItem3.item_name);
          break;
        case 'slot4':
          const data4 = items.find(itemData => itemData.search_id === itemSlot4);
          const currItem4 = new Item(data4.format,
            data4.item_id,
            data4.item_name,
            data4.type,
            data4.effect,
            data4.description,
            data4.short_description,
            data4.removable);
          slot4.addItem(currItem4);
          setItemSlot4(currItem4.item_name);
          break;
        case 'slot5':
          const data5 = items.find(itemData => itemData.search_id === itemSlot5);
          const currItem5 = new Item(data5.format,
            data5.item_id,
            data5.item_name,
            data5.type,
            data5.effect,
            data5.description,
            data5.short_description,
            data5.removable);
          slot5.addItem(currItem5);
          setItemSlot5(currItem5.item_name);
          break;
        default:
          console.log("Error setting item to slot.");
      }

      setIsChoosingItem(false);
      setIsChoosingMove(true);
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
      // Create an iteration of the team class based on the beasts in the slots
      // upload that team to the server in the string format
      // Redirect user back to the teams page where the users teams are rendered
      // Should have some form of validation before saving
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
                            onMoveSearch={onMoveSearch}
                            item={itemSlot1}
                            moveSlot={moveSlot1} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} onItemClick={onItemClick} />
                </> :
                slot1 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot1}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch}
                            item={itemSlot1}
                            moveSlot={moveSlot1} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
                  <SlotForm beast={slot1}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot1}
                  moveSlot={moveSlot1} />
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
                            onMoveSearch={onMoveSearch}
                            item={itemSlot2}
                            moveSlot={moveSlot2} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} onItemClick={onItemClick} />
                </> :
                slot2 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot2}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch}
                            item={itemSlot2}
                            moveSlot={moveSlot2} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
                  <SlotForm beast={slot2}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot2}
                  moveSlot={moveSlot2} />
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
                            onMoveSearch={onMoveSearch}
                            item={itemSlot3}
                            moveSlot={moveSlot3} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} onItemClick={onItemClick} />
                </> :
                slot3 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot3}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch}
                            item={itemSlot3}
                            moveSlot3={moveSlot3} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
                  <SlotForm beast={slot3}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot3}
                  moveSlot={moveSlot3} />
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
                            onMoveSearch={onMoveSearch}
                            item={itemSlot4}
                            moveSlot={moveSlot4} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} onItemClick={onItemClick} />
                </> :
                slot4 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot4}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch}
                            item={itemSlot4}
                            moveSlot={moveSlot4} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
                  <SlotForm beast={slot4}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot4}
                  moveSlot={moveSlot4} />
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
                            onMoveSearch={onMoveSearch}
                            item={itemSlot5}
                            moveSlot={moveSlot5} />
                  <ItemSearchSuggestions suggestions={itemSuggestions} onItemClick={onItemClick} />
                </> :
                slot5 !== null && isChoosingMove ?
                <>
                  <SlotForm beast={slot5}
                            returnDomains={returnDomains}
                            chooseItem={chooseItem}
                            onItemSearch={onItemSearch}
                            fillInMove={fillInMove}
                            onMoveSearch={onMoveSearch}
                            item={itemSlot5}
                            moveSlot={moveSlot5} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} />
                </> :
                  <SlotForm beast={slot5}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot5}
                  moveSlot={moveSlot5} />
                }
                <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
            </TabPanel>
        </div>
)}