import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Select,
    CircularProgress
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
// Components
import GameChatLog from './GameChatLog';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: "250px",
        width: "100%",
        height: "400px",
        padding: '0px',
        backgroundColor: "white",
        border: "1px solid darkgrey",
        borderRadius: "5px"
    },
    opponentPrevBox: {
        width: '100%',
        height: '25%',
        padding: '10px',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    gameChatLog: {
        width: '100%',
        height: '73%',
        paddingLeft: '5px',
        paddingRight: '5px',
        marginBottom: '1%',
        marginTop: '1%',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    prevImg: {
        height: '40px',
        width: '40px',
        marginLeft: '10px',
        marginRight: '10px'
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
    onHoverLeave,
    sendMessage,
    chatLog
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
                <Box className={classes.gameChatLog}>
                    <GameChatLog
                    sendMessage={sendMessage}
                    chatLog={chatLog} />
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