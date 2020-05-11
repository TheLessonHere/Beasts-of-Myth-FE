import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Select,
    CircularProgress
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: "250px",
        width: "100%",
        height: "400px",
        backgroundColor: "lightgrey",
        border: "1px solid darkgrey",
        borderRadius: "5px"
    },
    opponentPrevBox: {
        width: '100%',
        height: '25%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    prevImg: {
        height: '50px',
        width: '50px',
        padding: '5px'
    },
    knockedOutIcon: {
        fontSize: '2.25rem',
        padding: '5px'
    }
}));

export default function OpponentHUD(props) {
    const classes = useStyles();
    const {
    opponentTeamLineup,
    gameDidUpdate,
    beastDidGetKOd,
    opponent,
    onOpponentPreviewHover,
    onHoverLeave
    } = props;

    useEffect(() => {
    }, [ opponent, gameDidUpdate, beastDidGetKOd ])

    if(opponent && opponentTeamLineup){
        return (
            <Container className={classes.container}>
                <Box className={classes.opponentPrevBox}>
                    {opponent.team.slot1.beast.knocked_out ?
                    <CloseIcon
                    className={classes.knockedOutIcon}
                    onMouseOver={() => onOpponentPreviewHover('slot1')}
                    onMouseLeave={onHoverLeave} /> :
                    <img
                    className={classes.prevImg}
                    onMouseOver={() => onOpponentPreviewHover('slot1')}
                    onMouseLeave={onHoverLeave}
                    src={opponentTeamLineup.s1}
                    alt="s1" />}
                    {opponent.team.slot2.beast.knocked_out ?
                    <CloseIcon
                    className={classes.knockedOutIcon}
                    onMouseOver={() => onOpponentPreviewHover('slot2')}
                    onMouseLeave={onHoverLeave} /> :
                    <img
                    className={classes.prevImg}
                    onMouseOver={() => onOpponentPreviewHover('slot2')}
                    onMouseLeave={onHoverLeave}
                    src={opponentTeamLineup.s2}
                    alt="s2" />}
                    {opponent.team.slot3.beast.knocked_out ?
                    <CloseIcon
                    className={classes.knockedOutIcon}
                    onMouseOver={() => onOpponentPreviewHover('slot3')}
                    onMouseLeave={onHoverLeave} /> :
                    <img
                    className={classes.prevImg}
                    onMouseOver={() => onOpponentPreviewHover('slot3')}
                    onMouseLeave={onHoverLeave}
                    src={opponentTeamLineup.s3}
                    alt="s3" />}
                    {opponent.team.slot4.beast.knocked_out ?
                    <CloseIcon
                    className={classes.knockedOutIcon}
                    onMouseOver={() => onOpponentPreviewHover('slot4')}
                    onMouseLeave={onHoverLeave} /> :
                    <img
                    className={classes.prevImg}
                    onMouseOver={() => onOpponentPreviewHover('slot4')}
                    onMouseLeave={onHoverLeave}
                    src={opponentTeamLineup.s4}
                    alt="s4" />}
                    {opponent.team.slot5.beast.knocked_out ?
                    <CloseIcon
                    className={classes.knockedOutIcon}
                    onMouseOver={() => onOpponentPreviewHover('slot5')}
                    onMouseLeave={onHoverLeave} /> :
                    <img
                    className={classes.prevImg}
                    onMouseOver={() => onOpponentPreviewHover('slot5')}
                    onMouseLeave={onHoverLeave}
                    src={opponentTeamLineup.s5}
                    alt="s5" />}
                </Box>
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            <Box className={classes.opponentPrevBox}>
                <CloseIcon className={classes.knockedOutIcon} />
                <CloseIcon className={classes.knockedOutIcon} />
                <CloseIcon className={classes.knockedOutIcon} />
                <CloseIcon className={classes.knockedOutIcon} />
                <CloseIcon className={classes.knockedOutIcon} />
            </Box>
        </Container>
    )
}