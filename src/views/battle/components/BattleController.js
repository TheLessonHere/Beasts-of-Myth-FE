import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Button,
    Icon,
    CircularProgress,
    Typography,
    Box,
    Select,
    FormControl,
    MenuItem,
    InputLabel
    } from "@material-ui/core";

import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';
import { createTeamObjects } from '../../../actions';

const useStyles = makeStyles(theme => ({
    containerPreview: {
        display: "flex",
        flexFlow: "column nowrap",
        border: "1px solid darkgrey",
        borderRadius: "5px",
        backgroundColor: "lightgrey",
        height: "175px",
        width: "1120px",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    },
    containerGame: {
        display: "flex",
        flexFlow: "row nowrap",
        border: "1px solid darkgrey",
        borderRadius: "5px",
        backgroundColor: "lightgrey",
        height: "175px",
        width: "1120px",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "20px"
    },
    buttonBox: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        padding: "20px"
    },
    formControl: {
        minWidth: "90%"
    },
    moveBox: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        width: "26%",
    },
    move1_2: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "5px"
    },
    move1: {
        marginRight: '5px'
    },
    move2: {
        marginLeft: '5px'
    },
    move3_4: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "5px"
    },
    move3: {
        marginRight: '5px'
    },
    move4: {
        marginLeft: '5px'
    },
    modifierBox: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "left",
        width: "16%"
    },
    superButton: {
        marginTop: '5px'
    },
    switchBox: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "58%",
        paddingLeft: "10px",
        marginLeft: "10px"
    },
    switchBoxHeader: {
        width: '100%',
        textAlign: 'left'
    },
    switchButtonBox: {
        display: 'flex',
        flexFlow: 'row nowrap',
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    switchButton: {
        margin: "10px"
    }
}))

export default function BattleController(props) {
    const classes = useStyles();
    const {
        inTeamPreview,
        player,
        sendAction,
        sendPostKOAction,
        game,
        gameDidUpdate,
        playerDidMove,
        playerDidSwitch,
        opponentDidMove,
        opponentDidSwitch,
        onMoveButtonHover,
        onSwitchButtonHover,
        onHoverLeave,
        beastDidGetKOd,
        playerDidWin,
        opponentDidWin,
        playersHaveTied
    } = props;
    const [critRollChances, setCritRollChances] = useState(['0%', '25%', '50%', '75%', '100%']);
    const [activatedRolls, setActivatedRolls] = useState(0);
    const [activatingSuper, setActivatingSuper] = useState(false);
    const [switchAfterKO, setSwitchAfterKO] = useState(false);

    useEffect(() => {
    }, [ gameDidUpdate, switchAfterKO, playerDidWin, opponentDidWin ])

    useEffect(() => {
        if(player && inTeamPreview === false && player.team.active_slot.beast === null){
            setSwitchAfterKO(true);
        } else {
            setSwitchAfterKO(false);
        }
    }, [ inTeamPreview, beastDidGetKOd ])

    const startBeast = (slot) => {
        let action;
        switch(slot){
            case 'slot1':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: player.team.slot1.beast
                }
                break;
            case 'slot2':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: player.team.slot2.beast
                }
                break;
            case 'slot3':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: player.team.slot3.beast
                }
                break;
            case 'slot4':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: player.team.slot4.beast
                }
                break;
            case 'slot5':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: player.team.slot5.beast
                }
                break;
            default:
                action = null;
        }
        sendAction(action);
    }

    const nextBeastPostKO = (slot) => {
        const action = {
            playerNum: player.player_num,
            slot: slot
        };
        sendPostKOAction(action);
    }

    const handleCritRolls = (event) => {
        setActivatedRolls(event.target.value);
    }

    const handleMoveClick = (event, moveSlot) => {
        event.preventDefault();
        if(event.target.innerHTML != "No Move"){
            sendAction({
                actionType: 'select-move',
                moveSlot: moveSlot,
                superActivated: activatingSuper,
                critRolls: activatedRolls
            });

            let tempCrc;
            switch(activatedRolls){
                case 0:
                    return;
                case 1:
                    tempCrc = critRollChances;
                    tempCrc.pop();
                    setCritRollChances(tempCrc);
                    setActivatedRolls(0);
                    break;
                case 2:
                    tempCrc = critRollChances;
                    tempCrc.pop();
                    tempCrc.pop();
                    setCritRollChances(tempCrc);
                    setActivatedRolls(0);
                    break;
                case 3:
                    tempCrc = critRollChances;
                    tempCrc.pop();
                    tempCrc.pop();
                    tempCrc.pop();
                    setCritRollChances(tempCrc);
                    setActivatedRolls(0);
                    break;
                case 4:
                    tempCrc = critRollChances;
                    tempCrc.pop();
                    tempCrc.pop();
                    tempCrc.pop();
                    tempCrc.pop();
                    setCritRollChances(tempCrc);
                    setActivatedRolls(0);
                    break;
                default:
                    console.log('Error calculating remaining crit rolls.');
            }
        }
    }

    const calculatePossibleSwitches = () => {
        switch(player.team.active_slot.slotNumber){
            case 'slot1':
                return (
                    <>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot2')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot2.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot3')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot3.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot4')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot4.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {player.team.slot4.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot5')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot5.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {player.team.slot5.beast.beast_name}
                        </Button>
                    </>
                );
            case 'slot2':
                return (
                    <>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot1')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot1.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot3')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot3.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot4')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot4.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {player.team.slot4.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot5')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot5.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {player.team.slot5.beast.beast_name}
                        </Button>
                    </>
                )
            case 'slot3':
                return (
                    <>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot1')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot1.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot2')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot2.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot4')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot4.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {player.team.slot4.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot5')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot5.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {player.team.slot5.beast.beast_name}
                        </Button>
                    </>
                )
            case 'slot4':
                return (
                    <>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot1')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot1.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot2')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot2.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot3')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot3.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot5')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot5.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {player.team.slot5.beast.beast_name}
                        </Button>
                    </>
                )
            case 'slot5':
                return (
                    <>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot1')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot1.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot2')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot2.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot3')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot3.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot4')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot4.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {player.team.slot4.beast.beast_name}
                        </Button>
                    </>
                )
            default:
                return (
                    <>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot1')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot1.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot2')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot2.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot3')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot3.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot4')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot4.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {player.team.slot4.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        onMouseOver={() => onSwitchButtonHover('slot5')}
                        onMouseOut={onHoverLeave}
                        className={classes.switchButton}
                        disabled={player.team.slot5.beast.knocked_out}
                        onClick={() => sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {player.team.slot5.beast.beast_name}
                        </Button>
                    </>
                )
        }
    }

    if(opponentDidWin){
        let winner;
        if(player.player_num === 'player1'){
            winner = game.player2.username;
        } else {
            winner = game.player1.username;
        }
        return (
            <Container className={classes.containerGame}>
                <Typography variant="h5">Game has ended.</Typography>
                <Typography variant="h6">{winner} has won the game.</Typography>
            </Container>
        )
    }

    if(playerDidWin){
        let winner;
        if(player.player_num === 'player1'){
            winner = game.player1.username;
        } else {
            winner = game.player2.username;
        }
        return (
            <Container className={classes.containerGame}>
                <Typography variant="h5">Game has ended.</Typography>
                <Typography variant="h6">{winner} has won the game.</Typography>
            </Container>
        )
    }

    if(inTeamPreview){
        return (
            <Container className={classes.containerPreview}>
                <Typography variant="h6">Choose your starting Beast:</Typography>
                <Box className={classes.buttonBox}>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot1.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot1')}
                    onMouseOut={onHoverLeave}
                    onClick={() => startBeast('slot1')}
                    startIcon={<Filter1Icon />}>
                        {player.team.slot1.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot2.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot2')}
                    onMouseOut={onHoverLeave}
                    onClick={() => startBeast('slot2')}
                    startIcon={<Filter2Icon />}>
                        {player.team.slot2.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot3.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot3')}
                    onMouseOut={onHoverLeave}
                    onClick={() => startBeast('slot3')}
                    startIcon={<Filter3Icon />}>
                        {player.team.slot3.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot4.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot4')}
                    onMouseOut={onHoverLeave}
                    onClick={() => startBeast('slot4')}
                    startIcon={<Filter4Icon />}>
                        {player.team.slot4.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot5.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot5')}
                    onMouseOut={onHoverLeave}
                    onClick={() => startBeast('slot5')}
                    startIcon={<Filter5Icon />}>
                        {player.team.slot5.beast.beast_name}
                    </Button>
                </Box>
            </Container>
        )
    }

    if(switchAfterKO){
        return (
            <Container className={classes.containerPreview}>
                <Typography variant="h6">Choose your next Beast:</Typography>
                <Box className={classes.buttonBox}>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot1.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot1')}
                    onMouseOut={onHoverLeave}
                    onClick={() => nextBeastPostKO('slot1')}
                    startIcon={<Filter1Icon />}>
                        {player.team.slot1.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot2.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot2')}
                    onMouseOut={onHoverLeave}
                    onClick={() => nextBeastPostKO('slot2')}
                    startIcon={<Filter2Icon />}>
                        {player.team.slot2.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot3.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot3')}
                    onMouseOut={onHoverLeave}
                    onClick={() => nextBeastPostKO('slot3')}
                    startIcon={<Filter3Icon />}>
                        {player.team.slot3.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot4.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot4')}
                    onMouseOut={onHoverLeave}
                    onClick={() => nextBeastPostKO('slot4')}
                    startIcon={<Filter4Icon />}>
                        {player.team.slot4.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    disabled={player.team.slot5.beast.knocked_out}
                    onMouseOver={() => onSwitchButtonHover('slot5')}
                    onMouseOut={onHoverLeave}
                    onClick={() => nextBeastPostKO('slot5')}
                    startIcon={<Filter5Icon />}>
                        {player.team.slot5.beast.beast_name}
                    </Button>
                </Box>
            </Container>
        )
    }

    const rollOptions = critRollChances.length;

    return (
        <Container className={classes.containerGame}>
            <Box className={classes.moveBox}>
                <Box className={classes.move1_2}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.move1}
                    size="large"
                    disabled={player.team.active_slot.beast ?
                        player.team.active_slot.beast.disabled_moves.includes('move1') :
                        false}
                    onMouseOver={() => onMoveButtonHover('move1')}
                    onMouseOut={onHoverLeave}
                    onClick={(event) => handleMoveClick(event, 'move1')}>
                        {player.team.active_slot.beast && player.team.active_slot.beast.moves.get('move1') ?
                        player.team.active_slot.beast.moves.get('move1').move_name :
                        "No Move"}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.move2}
                    size="large"
                    disabled={player.team.active_slot.beast ?
                        player.team.active_slot.beast.disabled_moves.includes('move2') :
                        false}
                    onMouseOver={() => onMoveButtonHover('move2')}
                    onMouseOut={onHoverLeave}
                    onClick={(event) => handleMoveClick(event, 'move2')}>
                        {player.team.active_slot.beast && player.team.active_slot.beast.moves.get('move2') ?
                        player.team.active_slot.beast.moves.get('move2').move_name :
                        "No Move"}
                    </Button>
                </Box>
                <Box className={classes.move3_4}>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.move3}
                    size="large"
                    disabled={player.team.active_slot.beast ?
                        player.team.active_slot.beast.disabled_moves.includes('move3') :
                        false}
                    onMouseOver={() => onMoveButtonHover('move3')}
                    onMouseOut={onHoverLeave}
                    onClick={(event) => handleMoveClick(event, 'move3')}>
                        {player.team.active_slot.beast && player.team.active_slot.beast.moves.get('move3') ?
                        player.team.active_slot.beast.moves.get('move3').move_name :
                        "No Move"}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    className={classes.move4}
                    size="large"
                    disabled={player.team.active_slot.beast ?
                        player.team.active_slot.beast.disabled_moves.includes('move4') :
                        false}
                    onMouseOver={() => onMoveButtonHover('move4')}
                    onMouseOut={onHoverLeave}
                    onClick={(event) => handleMoveClick(event, 'move4')}>
                        {player.team.active_slot.beast && player.team.active_slot.beast.moves.get('move4') ?
                        player.team.active_slot.beast.moves.get('move4').move_name :
                        "No Move"}
                    </Button>
                </Box>
            </Box>
            <Box className={classes.modifierBox}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="crit-roll-select">Crit Roll(s)</InputLabel>
                    <Select
                    labelId="crit-roll-select"
                    value={activatedRolls}
                    onChange={handleCritRolls}>
                        {rollOptions === 5 ?
                        [<MenuItem key="0-rolls" value={0}>0 (0%)</MenuItem>,
                        <MenuItem key="1-roll" value={1}>1 (25%)</MenuItem>,
                        <MenuItem key="2-rolls" value={2}>2 (50%)</MenuItem>,
                        <MenuItem key="3-rolls" value={3}>3 (75%)</MenuItem>,
                        <MenuItem key="4-rolls" value={4}>4 (100%)</MenuItem>]:
                        rollOptions === 4 ?
                        [<MenuItem key="0-rolls" value={0}>0 (0%)</MenuItem>,
                        <MenuItem key="1-roll" value={1}>1 (25%)</MenuItem>,
                        <MenuItem key="2-rolls" value={2}>2 (50%)</MenuItem>,
                        <MenuItem key="3-rolls" value={3}>3 (75%)</MenuItem>]:
                        rollOptions === 3 ?
                        [<MenuItem key="0-rolls" value={0}>0 (0%)</MenuItem>,
                        <MenuItem key="1-roll" value={1}>1 (25%)</MenuItem>,
                        <MenuItem key="2-rolls" value={2}>2 (50%)</MenuItem>]:
                        rollOptions === 2 ?
                        [<MenuItem key="0-rolls" value={0}>0 (0%)</MenuItem>,
                        <MenuItem key="1-roll" value={1}>1 (25%)</MenuItem>]:
                        rollOptions === 1 ?
                        [<MenuItem key="0-rolls" value={0}>0 (0%)</MenuItem>]:
                        <MenuItem key="none-rolls" value="">None</MenuItem>
                        }
                    </Select>
                </FormControl>
                <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.superButton}
                onClick={() => setActivatingSuper(true)}
                disabled={
                    player.team.active_slot.beast &&
                    player.team.active_slot.beast.item &&
                    player.team.active_slot.beast.item.item_name === "Super Crystal" ?
                        false :
                        true}>
                    Activate Super
                </Button>
            </Box>
            <Box className={classes.switchBox}>
                <Typography className={classes.switchBoxHeader} variant="h6">Switch:</Typography>
                <Box className={classes.switchButtonBox}>
                    {calculatePossibleSwitches()}
                </Box>
            </Box>
        </Container>
    )
}