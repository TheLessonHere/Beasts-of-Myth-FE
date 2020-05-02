import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Button,
    Icon,
    CircularProgress,
    Box
    } from "@material-ui/core";

import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexFlow: "row nowrap",
        border: "10px solid darkgrey",
        backgroundColor: "lightgrey",
        height: "200px",
        width: "800px",
        padding: "20px"
    },
    teamPreviewButton: {
        width: "100px",
        marginLeft: "20px",
        marginRight: "20px"
    }
}))

export default function BattleController(props) {
    const classes = useStyles();

    useEffect(() => {
    }, [ props ])

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
        console.log(action);
        props.sendAction(action);
    }

    if(props.inTeamPreview){
        // Add handlers to buttons that send a select starter action
        return (
            <Container className={classes.container}>
                <button onClick={props.logGame}>log game</button>
                <Button
                variant="contained"
                color="default"
                className={classes.teamPreviewButton}
                onClick={() => startBeast('slot1')}
                startIcon={<Filter1Icon />}>
                    {props.player.team.slot1.beast.beast_name}
                </Button>
                <Button
                variant="contained"
                color="default"
                className={classes.teamPreviewButton}
                onClick={() => startBeast('slot2')}
                startIcon={<Filter2Icon />}>
                    {props.player.team.slot2.beast.beast_name}
                </Button>
                <Button
                variant="contained"
                color="default"
                className={classes.teamPreviewButton}
                onClick={() => startBeast('slot3')}
                startIcon={<Filter3Icon />}>
                    {props.player.team.slot3.beast.beast_name}
                </Button>
                <Button
                variant="contained"
                color="default"
                className={classes.teamPreviewButton}
                onClick={() => startBeast('slot4')}
                startIcon={<Filter4Icon />}>
                    {props.player.team.slot4.beast.beast_name}
                </Button>
                <Button
                variant="contained"
                color="default"
                className={classes.teamPreviewButton}
                onClick={() => startBeast('slot5')}
                startIcon={<Filter5Icon />}>
                    {props.player.team.slot5.beast.beast_name}
                </Button>
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            <Box className={classes.gameBoxOpponent}>
                <h5>Health Bar Here</h5>
                <img
                className={classes.beastImg}
                src={props.p1ActiveBeastImg}
                alt="active-beast" />
            </Box>
            <Box className={classes.gameBoxPlayer}>
                <h5>Health Bar Here</h5>
                <img
                className={classes.beastImg}
                src={props.p2ActiveBeastImg}
                alt="active-beast" />
            </Box>
        </Container>
    )
}