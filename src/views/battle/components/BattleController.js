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
    const [critRollChances, setCritRollChances] = useState(['0%', '25%', '50%', '75%', '100%']);
    const [activatedRolls, setActivatedRolls] = useState(0);
    const [activatingSuper, setActivatingSuper] = useState(false);

    useEffect(() => {
    }, [ props.gameDidUpdate ])

    const startBeast = (slot) => {
        let action;
        switch(slot){
            case 'slot1':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: props.player.team.slot1.beast
                }
                break;
            case 'slot2':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: props.player.team.slot2.beast
                }
                break;
            case 'slot3':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: props.player.team.slot3.beast
                }
                break;
            case 'slot4':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: props.player.team.slot4.beast
                }
                break;
            case 'slot5':
                action = {
                    actionType: 'starting-beast',
                    startingBeast: props.player.team.slot5.beast
                }
                break;
            default:
                action = null;
        }
        props.sendAction(action);
    }

    const handleCritRolls = (event) => {
        setActivatedRolls(event.target.value);
    }

    const calculatePossibleSwitches = () => {
        switch(props.player.team.active_slot.slotNumber){
            case 'slot1':
                return (
                    <>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot2.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {props.player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot3.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {props.player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot4.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {props.player.team.slot4.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot5.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {props.player.team.slot5.beast.beast_name}
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
                        className={classes.switchButton}
                        disabled={props.player.team.slot1.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {props.player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot3.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {props.player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot4.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {props.player.team.slot4.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot5.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {props.player.team.slot5.beast.beast_name}
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
                        className={classes.switchButton}
                        disabled={props.player.team.slot1.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {props.player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot2.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {props.player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot4.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {props.player.team.slot4.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot5.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {props.player.team.slot5.beast.beast_name}
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
                        className={classes.switchButton}
                        disabled={props.player.team.slot1.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {props.player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot2.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {props.player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot3.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {props.player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot5.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {props.player.team.slot5.beast.beast_name}
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
                        className={classes.switchButton}
                        disabled={props.player.team.slot1.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {props.player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot2.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {props.player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot3.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {props.player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot4.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {props.player.team.slot4.beast.beast_name}
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
                        className={classes.switchButton}
                        disabled={props.player.team.slot1.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot1'
                        })}
                        startIcon={<Filter1Icon />}>
                            {props.player.team.slot1.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot2.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot2'
                        })}
                        startIcon={<Filter2Icon />}>
                            {props.player.team.slot2.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot3.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot3'
                        })}
                        startIcon={<Filter3Icon />}>
                            {props.player.team.slot3.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot4.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot4'
                        })}
                        startIcon={<Filter4Icon />}>
                            {props.player.team.slot4.beast.beast_name}
                        </Button>
                        <Button
                        variant="contained"
                        color="default"
                        size="large"
                        className={classes.switchButton}
                        disabled={props.player.team.slot5.beast.knocked_out}
                        onClick={() => props.sendAction({
                            actionType: 'change-beast',
                            benchedBeastSlot: 'slot5'
                        })}
                        startIcon={<Filter5Icon />}>
                            {props.player.team.slot5.beast.beast_name}
                        </Button>
                    </>
                )
        }
    }

    if(props.inTeamPreview){
        // Add handlers to buttons that send a select starter action
        return (
            <Container className={classes.containerPreview}>
                <Typography variant="h6">Choose your starter:</Typography>
                <Box className={classes.buttonBox}>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    onClick={() => startBeast('slot1')}
                    startIcon={<Filter1Icon />}>
                        {props.player.team.slot1.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    onClick={() => startBeast('slot2')}
                    startIcon={<Filter2Icon />}>
                        {props.player.team.slot2.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    onClick={() => startBeast('slot3')}
                    startIcon={<Filter3Icon />}>
                        {props.player.team.slot3.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    onClick={() => startBeast('slot4')}
                    startIcon={<Filter4Icon />}>
                        {props.player.team.slot4.beast.beast_name}
                    </Button>
                    <Button
                    variant="contained"
                    color="default"
                    size="large"
                    onClick={() => startBeast('slot5')}
                    startIcon={<Filter5Icon />}>
                        {props.player.team.slot5.beast.beast_name}
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
                    id="move1"
                    variant="contained"
                    color="default"
                    className={classes.move1}
                    size="large">
                        {props.player.team.active_slot.beast.moves.get('move1') ?
                        props.player.team.active_slot.beast.moves.get('move1').move_name :
                        "No Move"}
                    </Button>
                    <Button
                    id="move2"
                    variant="contained"
                    color="default"
                    className={classes.move2}
                    size="large">
                        {props.player.team.active_slot.beast.moves.get('move2') ?
                        props.player.team.active_slot.beast.moves.get('move2').move_name :
                        "No Move"}
                    </Button>
                </Box>
                <Box className={classes.move3_4}>
                    <Button
                    id="move3"
                    variant="contained"
                    color="default"
                    className={classes.move3}
                    size="large">
                        {props.player.team.active_slot.beast.moves.get('move3') ?
                        props.player.team.active_slot.beast.moves.get('move3').move_name :
                        "No Move"}
                    </Button>
                    <Button
                    id="move4"
                    variant="contained"
                    color="default"
                    className={classes.move4}
                    size="large">
                        {props.player.team.active_slot.beast.moves.get('move4') ?
                        props.player.team.active_slot.beast.moves.get('move4').move_name :
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
                    props.player.team.active_slot.beast.item &&
                    props.player.team.active_slot.beast.item.item_name === "Super Crystal" ?
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