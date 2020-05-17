import React, { useState, useEffect } from "react";
import { postTeam } from '../../../actions';
import { connect } from 'react-redux';
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
// Functions
import validateTeam from '../../../utils/functions/validateTeam';
import { capitalizeString } from '../../../utils/functions/capitalizeString';
// Components
import LibrarySearchbar from './LibrarySearchbar';
import ItemSearchSuggestions from './ItemSearchSuggestions';
import MoveSearchSuggestions from './MoveSearchSuggestions';
import { SubmitButton } from '../../../utils/components/SubmitButton';
import SlotForm from "./SlotForm";
// Classes
import Team from '../../../classes/Team';
import Beast from '../../../classes/Beast';
import Move from '../../../classes/Move';
import Item from '../../../classes/Item';
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
      minWidth: "150px",
      width: "100%"
    },
    topContainer: {
      display: "flex",
      flexFlow: "row nowrap",
      width: "100%"
    },
    topContainerBox: {
      display: "flex",
      flexFlow: "column nowrap",
      width: "50%",
      justifyContent: "center",
      alignItems: "center"
    },
    buttonBox: {
      display: "flex",
      flexFlow: "row wrap",
      width: "50%",
      justifyContent: "center",
      alignItems: "center"
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

function TeamNav(props) {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    const [format, setFormat] = useState("");
    const [teamName, setTeamName] = useState('Untitled Team');
    const [slot1, setSlot1] = useState(null);
    const [slot2, setSlot2] = useState(null);
    const [slot3, setSlot3] = useState(null);
    const [slot4, setSlot4] = useState(null);
    const [slot5, setSlot5] = useState(null);
    const [beastSlotChanged, setBeastSlotChanged] = useState(false);
    const [activeSlot, setActiveSlot] = useState('slot1');
    const [activeMoveSlot, setActiveMoveSlot] = useState('move1');
    const [isChoosingMove, setIsChoosingMove] = useState(false);
    const [isChoosingItem, setIsChoosingItem] = useState(true);
    const [itemSlot1, setItemSlot1] = useState("");
    const [itemSlot2, setItemSlot2] = useState("");
    const [itemSlot3, setItemSlot3] = useState("");
    const [itemSlot4, setItemSlot4] = useState("");
    const [itemSlot5, setItemSlot5] = useState("");
    const [slot1Move1, setSlot1Move1] = useState("");
    const [slot1Move2, setSlot1Move2] = useState("");
    const [slot1Move3, setSlot1Move3] = useState("");
    const [slot1Move4, setSlot1Move4] = useState("");
    const [slot2Move1, setSlot2Move1] = useState("");
    const [slot2Move2, setSlot2Move2] = useState("");
    const [slot2Move3, setSlot2Move3] = useState("");
    const [slot2Move4, setSlot2Move4] = useState("");
    const [slot3Move1, setSlot3Move1] = useState("");
    const [slot3Move2, setSlot3Move2] = useState("");
    const [slot3Move3, setSlot3Move3] = useState("");
    const [slot3Move4, setSlot3Move4] = useState("");
    const [slot4Move1, setSlot4Move1] = useState("");
    const [slot4Move2, setSlot4Move2] = useState("");
    const [slot4Move3, setSlot4Move3] = useState("");
    const [slot4Move4, setSlot4Move4] = useState("");
    const [slot5Move1, setSlot5Move1] = useState("");
    const [slot5Move2, setSlot5Move2] = useState("");
    const [slot5Move3, setSlot5Move3] = useState("");
    const [slot5Move4, setSlot5Move4] = useState("");
    const [itemSuggestions, setItemSuggestions] = useState([]);
    const [moveSuggestions, setMoveSuggestions] = useState([]);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      console.log("Beast slot changed.")
    }, [ beastSlotChanged ])

    useEffect(() => {
    }, [ isChoosingItem, isChoosingMove ])

    useEffect(() => {
      console.log("Team successfully validated.");
    }, [ isValid ])

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
      currBeast.updateSlot(activeSlot);

      switch(activeSlot){
        case 'slot1':
          setSlot1(currBeast);
          setBeastSlotChanged(!beastSlotChanged);
          break;
        case 'slot2':
          setSlot2(currBeast);
          setBeastSlotChanged(!beastSlotChanged);
          break;
        case 'slot3':
          setSlot3(currBeast);
          setBeastSlotChanged(!beastSlotChanged);
          break;
        case 'slot4':
          setSlot4(currBeast);
          setBeastSlotChanged(!beastSlotChanged);
          break;
        case 'slot5':
          setSlot5(currBeast);
          setBeastSlotChanged(!beastSlotChanged);
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
          currSuggestions = props.items.sort().filter(obj => {
              const searchId = obj.search_id;
              return regex.test(searchId);
          });
      }
      setItemSuggestions(currSuggestions);
    }

    const onItemClick = (item) => {
      const currItem = new Item(item.format,
        item.item_id,
        item.item_name,
        item.type,
        item.effect,
        item.description,
        item.short_description,
        item.removable);

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
      const regex = new RegExp(`${value}`, 'i');
      switch(activeSlot){
        case 'slot1':
          const allMoves1 = slot1.moveList.map(move => {
            const data = moves.find(moveData => moveData.move_name === move);
            return data;
          })
          currSuggestions = allMoves1.sort().filter(move => {
            const searchId = move.move_name;
            return regex.test(searchId);
          });
          switch(activeMoveSlot){
            case 'move1':
              setSlot1Move1(value);
              break;
            case 'move2':
              setSlot1Move2(value);
              break;
            case 'move3':
              setSlot1Move3(value);
              break;
            case 'move4':
              setSlot1Move4(value);
              break;
            default:
              console.log("Error setting moves for slot1.")
          } break;
        case 'slot2':
          const allMoves2 = slot2.moveList.map(move => {
            const data = moves.find(moveData => moveData.move_name === move);
            return data;
          })
          currSuggestions = allMoves2.sort().filter(move => {
            const searchId = move.move_name;
            return regex.test(searchId);
          });
          switch(activeMoveSlot){
            case 'move1':
              setSlot2Move1(value);
              break;
            case 'move2':
              setSlot2Move2(value);
              break;
            case 'move3':
              setSlot2Move3(value);
              break;
            case 'move4':
              setSlot2Move4(value);
              break;
            default:
              console.log("Error setting moves for slot2.")
          } break;
        case 'slot3':
          const allMoves3 = slot3.moveList.map(move => {
            const data = moves.find(moveData => moveData.move_name === move);
            return data;
          })
          currSuggestions = allMoves3.sort().filter(move => {
            const searchId = move.move_name;
            return regex.test(searchId);
          });
          switch(activeMoveSlot){
            case 'move1':
              setSlot3Move1(value);
              break;
            case 'move2':
              setSlot3Move2(value);
              break;
            case 'move3':
              setSlot3Move3(value);
              break;
            case 'move4':
              setSlot3Move4(value);
              break;
            default:
              console.log("Error setting moves for slot3.")
          } break;
        case 'slot4':
          const allMoves4 = slot4.moveList.map(move => {
            const data = moves.find(moveData => moveData.move_name === move);
            return data;
          })
          currSuggestions = allMoves4.sort().filter(move => {
            const searchId = move.move_name;
            return regex.test(searchId);
          });
          switch(activeMoveSlot){
            case 'move1':
              setSlot4Move1(value);
              break;
            case 'move2':
              setSlot4Move2(value);
              break;
            case 'move3':
              setSlot4Move3(value);
              break;
            case 'move4':
              setSlot4Move4(value);
              break;
            default:
              console.log("Error setting moves for slot4.")
          } break;
        case 'slot5':
          const allMoves5 = slot5.moveList.map(move => {
            const data = moves.find(moveData => moveData.move_name === move);
            return data;
          })
          currSuggestions = allMoves5.sort().filter(move => {
            const searchId = move.move_name;
            return regex.test(searchId);
          });
          switch(activeMoveSlot){
            case 'move1':
              setSlot5Move1(value);
              break;
            case 'move2':
              setSlot5Move2(value);
              break;
            case 'move3':
              setSlot5Move3(value);
              break;
            case 'move4':
              setSlot5Move4(value);
              break;
            default:
              console.log("Error setting moves for slot5.")
          } break;
          default:
            console.log("Error getting active slot.")
      }
      setMoveSuggestions(currSuggestions);
    }

    const onMoveClick = (move) => {
      const newMove = new Move(
        move.move_id,
        move.move_name,
        move.domain,
        move.type,
        move.base_power,
        move.me,
        move.priority,
        move.effect,
        move.description,
        move.short_description,
        move.action_statement);

      switch(activeSlot){
        case 'slot1':
          switch(activeMoveSlot){
            case 'move1':
              slot1.addMove('move1', newMove);
              setSlot1Move1(newMove.move_name);
              break;
            case 'move2':
              slot1.addMove('move2', newMove);
              setSlot1Move2(newMove.move_name);
              break;
            case 'move3':
              slot1.addMove('move3', newMove);
              setSlot1Move3(newMove.move_name);
              break;
            case 'move4':
              slot1.addMove('move4', newMove);
              setSlot1Move4(newMove.move_name);
              break;
            default:
              console.log("Error adding move to slot 1.")
          }
          break;
        case 'slot2':
          switch(activeMoveSlot){
            case 'move1':
              slot2.addMove('move1', newMove);
              setSlot2Move1(newMove.move_name);
              break;
            case 'move2':
              slot2.addMove('move2', newMove);
              setSlot2Move2(newMove.move_name);
              break;
            case 'move3':
              slot2.addMove('move3', newMove);
              setSlot2Move3(newMove.move_name);
              break;
            case 'move4':
              slot2.addMove('move4', newMove);
              setSlot2Move4(newMove.move_name);
              break;
            default:
              console.log("Error adding move to slot 2.")
          }
          break;
        case 'slot3':
          switch(activeMoveSlot){
            case 'move1':
              slot3.addMove('move1', newMove);
              setSlot3Move1(newMove.move_name);
              break;
            case 'move2':
              slot3.addMove('move2', newMove);
              setSlot3Move2(newMove.move_name);
              break;
            case 'move3':
              slot3.addMove('move3', newMove);
              setSlot3Move3(newMove.move_name);
              break;
            case 'move4':
              slot3.addMove('move4', newMove);
              setSlot3Move4(newMove.move_name);
              break;
            default:
              console.log("Error adding move to slot 3.")
          }
          break;
        case 'slot4':
          switch(activeMoveSlot){
            case 'move1':
              slot4.addMove('move1', newMove);
              setSlot4Move1(newMove.move_name);
              break;
            case 'move2':
              slot4.addMove('move2', newMove);
              setSlot4Move2(newMove.move_name);
              break;
            case 'move3':
              slot4.addMove('move3', newMove);
              setSlot4Move3(newMove.move_name);
              break;
            case 'move4':
              slot4.addMove('move4', newMove);
              setSlot4Move4(newMove.move_name);
              break;
            default:
              console.log("Error adding move to slot 4.")
          }
          break;
        case 'slot5':
          switch(activeMoveSlot){
            case 'move1':
              slot5.addMove('move1', newMove);
              setSlot5Move1(newMove.move_name);
              break;
            case 'move2':
              slot5.addMove('move2', newMove);
              setSlot5Move2(newMove.move_name);
              break;
            case 'move3':
              slot5.addMove('move3', newMove);
              setSlot5Move3(newMove.move_name);
              break;
            case 'move4':
              slot5.addMove('move4', newMove);
              setSlot5Move4(newMove.move_name);
              break;
            default:
              console.log("Error adding move to slot 5.")
          }
          break;
        default:
          console.log("Error setting move to slot.");
      }

      if(activeMoveSlot === 'move4'){
        setIsChoosingMove(false);
        setIsChoosingItem(true);
      }
    }

    const returnDomains = (domain1, domain2) => {
      if(domain2){
          const capDomain1 = capitalizeString(domain1);
          const capDomain2 = capitalizeString(domain2);
          return `${capDomain1}/${capDomain2}`;
      } else {
          const capDomain1 = capitalizeString(domain1);
          return `${capDomain1}`;
      }
    }

    const clearItem = () => {
      switch(activeSlot){
        case 'slot1':
          slot1.removeItem();
          setItemSlot1("");
          break;
        case 'slot2':
          slot2.removeItem();
          setItemSlot2("");
          break;
        case 'slot3':
          slot3.removeItem();
          setItemSlot3("");
          break;
        case 'slot4':
          slot4.removeItem();
          setItemSlot4("");
          break;
        case 'slot5':
          slot5.removeItem();
          setItemSlot5("");
          break;
        default:
          console.log("Error clearing item.")
      }
    }

    const clearMove = (moveSlot) => {
      switch(activeSlot){
        case 'slot1':
          switch(moveSlot){
            case 'move1':
              slot1.removeMove('move1');
              setSlot1Move1("");
              break;
            case 'move2':
              slot1.removeMove('move2');
              setSlot1Move2("");
              break;
            case 'move3':
              slot1.removeMove('move3');
              setSlot1Move3("");
              break;
            case 'move4':
              slot1.removeMove('move4');
              setSlot1Move4("");
              break;
            default:
              console.log("Error removing move from slot 1.")
          } break;
        case 'slot2':
          switch(moveSlot){
            case 'move1':
              slot2.removeMove('move1');
              setSlot2Move1("");
              break;
            case 'move2':
              slot2.removeMove('move2');
              setSlot2Move2("");
              break;
            case 'move3':
              slot2.removeMove('move3');
              setSlot2Move3("");
              break;
            case 'move4':
              slot2.removeMove('move4');
              setSlot2Move4("");
              break;
            default:
              console.log("Error removing move from slot 2.")
          } break;
        case 'slot3':
          switch(moveSlot){
            case 'move1':
              slot3.removeMove('move1');
              setSlot3Move1("");
              break;
            case 'move2':
              slot3.removeMove('move2');
              setSlot3Move2("");
              break;
            case 'move3':
              slot3.removeMove('move3');
              setSlot3Move3("");
              break;
            case 'move4':
              slot3.removeMove('move4');
              setSlot3Move4("");
              break;
            default:
              console.log("Error removing move from slot 3.")
          } break;
        case 'slot4':
          switch(moveSlot){
            case 'move1':
              slot4.removeMove('move1');
              setSlot4Move1("");
              break;
            case 'move2':
              slot4.removeMove('move2');
              setSlot4Move2("");
              break;
            case 'move3':
              slot4.removeMove('move3');
              setSlot4Move3("");
              break;
            case 'move4':
              slot4.removeMove('move4');
              setSlot4Move4("");
              break;
            default:
              console.log("Error removing move from slot 4.")
          } break;
        case 'slot5':
          switch(moveSlot){
            case 'move1':
              slot5.removeMove('move1');
              setSlot5Move1("");
              break;
            case 'move2':
              slot5.removeMove('move2');
              setSlot5Move2("");
              break;
            case 'move3':
              slot5.removeMove('move3');
              setSlot5Move3("");
              break;
            case 'move4':
              slot5.removeMove('move4');
              setSlot5Move4("");
              break;
            default:
              console.log("Error removing move from slot 5.")
          } break;
        default:
          console.log("Error clearing item.")
      }
    }

    const clearSlot = () => {
      switch(activeSlot){
        case 'slot1':
          setSlot1(null);
          setBeastSlotChanged(!beastSlotChanged);
          break;
        case 'slot2':
          setSlot2(null);
          setBeastSlotChanged(!beastSlotChanged);
          break;
        case 'slot3':
          setSlot3(null);
          setBeastSlotChanged(!beastSlotChanged);
          break;
        case 'slot4':
          setSlot4(null);
          setBeastSlotChanged(!beastSlotChanged);
          break;
        case 'slot5':
          setSlot5(null);
          setBeastSlotChanged(!beastSlotChanged);
          break;
        default:
          console.log("Error clearing beast slot")
      }
    }

    const saveTeam = () => {
      console.log('Team Saved')
      validateTeam(format, slot1, slot2, slot3, slot4, slot5, setIsValid);
      if(isValid){
        const team = new Team(format, teamName);
        team.addBeast(slot1, 'slot1');
        team.addBeast(slot2, 'slot2');
        team.addBeast(slot3, 'slot3');
        team.addBeast(slot4, 'slot4');
        team.addBeast(slot5, 'slot5');
        const teamDatastring = team.convertToString();
        console.log(teamDatastring);
        props.postTeam(props.id, teamDatastring);
        props.stopBuilding();
        props.setIsReturning(!props.isReturning)
      }
    }

    return(
        <div className={classes.tabs}>
            <Container className={classes.topContainer}>
              <Box className={classes.topContainerBox}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="format-select-label">Format</InputLabel>
                  <Select
                      labelId="format-select-label"
                      id="format-select"
                      value={format}
                      autoWidth={true}
                      className={classes.topInputs}
                      onChange={handleFormatChange}>
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
              </Box>
              <Box className={classes.buttonBox}>
                <SubmitButton onClick={clearSlot}>Clear Slot</SubmitButton>
                <SubmitButton type="submit" onClick={() => validateTeam(format, slot1, slot2, slot3, slot4, slot5, setIsValid)}>Validate Team</SubmitButton>
                <SubmitButton onClick={saveTeam} disabled={!isValid}>Save Team</SubmitButton>
                <SubmitButton onClick={props.stopBuilding}>Cancel</SubmitButton>
              </Box>
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
                <LibrarySearchbar allLibraries={props.allLibraries}
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
                            move1={slot1Move1}
                            move2={slot1Move2}
                            move3={slot1Move3}
                            move4={slot1Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
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
                            move1={slot1Move1}
                            move2={slot1Move2}
                            move3={slot1Move3}
                            move4={slot1Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} onMoveClick={onMoveClick} />
                </> :
                  <SlotForm beast={slot1}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot1}
                  move1={slot1Move1}
                  move2={slot1Move2}
                  move3={slot1Move3}
                  move4={slot1Move4}
                  clearItem={clearItem}
                  clearMove={clearMove} />
                }
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={1}>
                {slot2 === null ?
                <LibrarySearchbar allLibraries={props.allLibraries}
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
                            move1={slot2Move1}
                            move2={slot2Move2}
                            move3={slot2Move3}
                            move4={slot2Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
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
                            move1={slot2Move1}
                            move2={slot2Move2}
                            move3={slot2Move3}
                            move4={slot2Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} onMoveClick={onMoveClick} />
                </> :
                  <SlotForm beast={slot2}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot2}
                  move1={slot2Move1}
                  move2={slot2Move2}
                  move3={slot2Move3}
                  move4={slot2Move4}
                  clearItem={clearItem}
                  clearMove={clearMove} />
                }
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={2}>
                {slot3 === null ?
                <LibrarySearchbar allLibraries={props.allLibraries}
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
                            move1={slot3Move1}
                            move2={slot3Move2}
                            move3={slot3Move3}
                            move4={slot3Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
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
                            move1={slot3Move1}
                            move2={slot3Move2}
                            move3={slot3Move3}
                            move4={slot3Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} onMoveClick={onMoveClick} />
                </> :
                  <SlotForm beast={slot3}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot3}
                  move1={slot3Move1}
                  move2={slot3Move2}
                  move3={slot3Move3}
                  move4={slot3Move4}
                  clearItem={clearItem}
                  clearMove={clearMove} />
                }
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={3}>
                {slot4 === null ?
                <LibrarySearchbar allLibraries={props.allLibraries}
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
                            move1={slot4Move1}
                            move2={slot4Move2}
                            move3={slot4Move3}
                            move4={slot4Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
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
                            move1={slot4Move1}
                            move2={slot4Move2}
                            move3={slot4Move3}
                            move4={slot4Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} onMoveClick={onMoveClick} />
                </> :
                  <SlotForm beast={slot4}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot4}
                  move1={slot4Move1}
                  move2={slot4Move2}
                  move3={slot4Move3}
                  move4={slot4Move4}
                  clearItem={clearItem}
                  clearMove={clearMove} />
                }
            </TabPanel>
            <TabPanel classes={classes} value={tabValue} index={4}>
                {slot5 === null ?
                <LibrarySearchbar allLibraries={props.allLibraries}
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
                            move1={slot5Move1}
                            move2={slot5Move2}
                            move3={slot5Move3}
                            move4={slot5Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
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
                            move1={slot5Move1}
                            move2={slot5Move2}
                            move3={slot5Move3}
                            move4={slot5Move4}
                            clearItem={clearItem}
                            clearMove={clearMove} />
                  <MoveSearchSuggestions suggestions={moveSuggestions} onMoveClick={onMoveClick} />
                </> :
                  <SlotForm beast={slot5}
                  returnDomains={returnDomains}
                  chooseItem={chooseItem}
                  onItemSearch={onItemSearch}
                  fillInMove={fillInMove}
                  onMoveSearch={onMoveSearch}
                  item={itemSlot5}
                  move1={slot5Move1}
                  move2={slot5Move2}
                  move3={slot5Move3}
                  move4={slot5Move4}
                  clearItem={clearItem}
                  clearMove={clearMove} />
                }
            </TabPanel>
        </div>
)}

const mapStateToProps = state => {
  return {
      ...state
  }
}

export default connect(mapStateToProps, { postTeam })(TeamNav)