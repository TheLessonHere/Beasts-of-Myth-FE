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
        backgroundColor: "lightgrey",
        height: "400px",
        width: "800px",
        padding: "20px"
    },
    teamPreviewBox: {
        display: "flex",
        flexFlow: "row nowrap",
        width: "100%",
        height: "50%"
    },
    gameBox: {
        display: "flex",
        flexFlow: "column nowrap",
        width: "100%",
        height: "50%"
    },
    beastImg: {
        display: "flex",
        width: "60px",
        height: "60px"
    },
    previewImg: {
        display: "flex",
        width: "80px",
        height: "80px"
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
                <Box className={classes.teamPreviewBox}>
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
                <Box className={classes.teamPreviewBox}>
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
            <Box className={classes.gameBox}>
                <h5>Health Bar Here</h5>
                <img
                className={classes.beastImg}
                src={props.p1ActiveBeastImg}
                alt="active-beast" />
            </Box>
            <Box className={classes.gameBox}>
                <h5>Health Bar Here</h5>
                <img
                className={classes.beastImg}
                src={props.p2ActiveBeastImg}
                alt="active-beast" />
            </Box>
        </Container>
    )
}