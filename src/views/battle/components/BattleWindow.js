import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Box,
    Typography,
    CircularProgress
    } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexFlow: "column nowrap",
        border: "2px solid darkgrey",
        borderRadius: "5px",
        backgroundColor: "white",
        height: "400px",
        width: "600px",
        padding: "20px",
        marginBottom: "10px"
    },
    teamPreviewBoxOpponent: {
        display: "flex",
        justifyContent: "flex-end",
        flexFlow: "row nowrap",
        width: "100%",
        height: "50%"
    },
    teamPreviewBoxPlayer: {
        display: "flex",
        alignItems: "flex-end",
        flexFlow: "row nowrap",
        width: "100%",
        height: "50%"
    },
    gameBoxOpponent: {
        display: "flex",
        alignItems: "flex-end",
        flexFlow: "column nowrap",
        width: "100%",
        height: "50%",
        paddingRight: "20px"
    },
    gameBoxPlayer: {
        display: "flex",
        alignItems: "flex-start",
        flexFlow: "column nowrap",
        width: "100%",
        height: "50%",
        paddingLeft: "20px"
    },
    beastImg: {
        display: "flex",
        width: "120px",
        height: "120px",
    },
    previewImg: {
        display: "flex",
        width: "100px",
        height: "100px"
    }
}))

export default function BattleWindow(props) {
    const classes = useStyles();

    useEffect(() => {
        return;
    }, [ props ])

    if(props.inTeamPreview){
        return (
            <Container className={classes.container}>
                <Box className={classes.teamPreviewBoxOpponent}>
                    <img
                    className={classes.previewImg}
                    src={props.opponentTeamLineup.s1}
                    alt="opposing-slot1" />
                    <img
                    className={classes.previewImg}
                    src={props.opponentTeamLineup.s2}
                    alt="opposing-slot2" />
                    <img
                    className={classes.previewImg}
                    src={props.opponentTeamLineup.s3}
                    alt="opposing-slot3" />
                    <img
                    className={classes.previewImg}
                    src={props.opponentTeamLineup.s4}
                    alt="opposing-slot4" />
                    <img
                    className={classes.previewImg}
                    src={props.opponentTeamLineup.s5}
                    alt="opposing-slot5" />
                </Box>
                <Box className={classes.teamPreviewBoxPlayer}>
                    <img
                    className={classes.previewImg}
                    src={props.playerTeamLineup.s1}
                    alt="player-slot1" />
                    <img
                    className={classes.previewImg}
                    src={props.playerTeamLineup.s2}
                    alt="player-slot2" />
                    <img
                    className={classes.previewImg}
                    src={props.playerTeamLineup.s3}
                    alt="player-slot3" />
                    <img
                    className={classes.previewImg}
                    src={props.playerTeamLineup.s4}
                    alt="player-slot4" />
                    <img
                    className={classes.previewImg}
                    src={props.playerTeamLineup.s5}
                    alt="player-slot5" />
                </Box>
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            <Box className={classes.gameBoxOpponent}>
                <h5>Health Bar Here</h5>
                <img
                className={classes.beastImg}
                src={props.opponent.player_num === 'player1' ?
                    props.p1ActiveBeastImg :
                    props.p2ActiveBeastImg}
                alt="active-beast" />
            </Box>
            <Box className={classes.gameBoxPlayer}>
                <h5>Health Bar Here</h5>
                <img
                className={classes.beastImg}
                src={props.player.player_num === 'player1' ?
                    props.p1ActiveBeastImg :
                    props.p2ActiveBeastImg}
                alt="active-beast" />
            </Box>
        </Container>
    )
}