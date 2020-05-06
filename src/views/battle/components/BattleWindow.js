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
        marginBottom: "10px",
        marginLeft: "10px",
        marginRight: "10px"
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
    const {
        inTeamPreview,
        opponentTeamLineup,
        playerTeamLineup,
        player,
        opponent,
        game,
        gameDidUpdate,
        playerDidMove,
        playerDidSwitch,
        opponentDidMove,
        opponentDidSwitch,
        beastDidGetKOd,
        onOpponentBeastHover,
        onPlayerBeastHover,
        onOpponentPreviewHover,
        onSwitchButtonHover,
        onHoverLeave
    } = props;
    const [playerActiveBeastImg, setPlayerActiveBeastImg] = useState(null);
    const [opponentActiveBeastImg, setOpponentActiveBeastImg] = useState(null);

    useEffect(() => {
        if(inTeamPreview === false && player && opponent){
                const pActiveSlot = player.team.active_slot.slotNumber;
                const oActiveSlot = opponent.team.active_slot.slotNumber;
                switch(pActiveSlot){
                    case 'slot1':
                        setPlayerActiveBeastImg(playerTeamLineup.s1);
                        break;
                    case 'slot2':
                        setPlayerActiveBeastImg(playerTeamLineup.s2);
                        break;
                    case 'slot3':
                        setPlayerActiveBeastImg(playerTeamLineup.s3);
                        break;
                    case 'slot4':
                        setPlayerActiveBeastImg(playerTeamLineup.s4);
                        break;
                    case 'slot5':
                        setPlayerActiveBeastImg(playerTeamLineup.s5);
                        break;
                    case null:
                        setPlayerActiveBeastImg(null);
                        break;
                    default:
                        console.log("Error setting playeractivebeastimg.")
                }
                switch(oActiveSlot){
                    case 'slot1':
                        setOpponentActiveBeastImg(opponentTeamLineup.s1);
                        break;
                    case 'slot2':
                        setOpponentActiveBeastImg(opponentTeamLineup.s2);
                        break;
                    case 'slot3':
                        setOpponentActiveBeastImg(opponentTeamLineup.s3);
                        break;
                    case 'slot4':
                        setOpponentActiveBeastImg(opponentTeamLineup.s4);
                        break;
                    case 'slot5':
                        setOpponentActiveBeastImg(opponentTeamLineup.s5);
                        break;
                    case null:
                        setPlayerActiveBeastImg(null);
                        break;
                    default:
                        console.log("Error setting oppactivebeastimg.")
                }
        }
    }, [ gameDidUpdate, inTeamPreview, playerDidSwitch, opponentDidSwitch ])

    if(inTeamPreview){
        return (
            <Container className={classes.container}>
                <Box className={classes.teamPreviewBoxOpponent}>
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onOpponentPreviewHover('slot1')}
                    onMouseOut={onHoverLeave}
                    src={opponentTeamLineup ? opponentTeamLineup.s1 : null}
                    alt="opposing-slot1" />
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onOpponentPreviewHover('slot2')}
                    onMouseOut={onHoverLeave}
                    src={opponentTeamLineup ? opponentTeamLineup.s2 : null}
                    alt="opposing-slot2" />
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onOpponentPreviewHover('slot3')}
                    onMouseOut={onHoverLeave}
                    src={opponentTeamLineup ? opponentTeamLineup.s3 : null}
                    alt="opposing-slot3" />
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onOpponentPreviewHover('slot4')}
                    onMouseOut={onHoverLeave}
                    src={opponentTeamLineup ? opponentTeamLineup.s4 : null}
                    alt="opposing-slot4" />
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onOpponentPreviewHover('slot5')}
                    onMouseOut={onHoverLeave}
                    src={opponentTeamLineup ? opponentTeamLineup.s5 : null}
                    alt="opposing-slot5" />
                </Box>
                <Box className={classes.teamPreviewBoxPlayer}>
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onSwitchButtonHover('slot1')}
                    onMouseOut={onHoverLeave}
                    src={playerTeamLineup ? playerTeamLineup.s1 : null}
                    alt="player-slot1" />
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onSwitchButtonHover('slot2')}
                    onMouseOut={onHoverLeave}
                    src={playerTeamLineup ? playerTeamLineup.s2 : null}
                    alt="player-slot2" />
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onSwitchButtonHover('slot3')}
                    onMouseOut={onHoverLeave}
                    src={playerTeamLineup ? playerTeamLineup.s3 : null}
                    alt="player-slot3" />
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onSwitchButtonHover('slot4')}
                    onMouseOut={onHoverLeave}
                    src={playerTeamLineup ? playerTeamLineup.s4 : null}
                    alt="player-slot4" />
                    <img
                    className={classes.previewImg}
                    onMouseOver={() => onSwitchButtonHover('slot5')}
                    onMouseOut={onHoverLeave}
                    src={playerTeamLineup ? playerTeamLineup.s5 : null}
                    alt="player-slot5" />
                </Box>
            </Container>
        )
    }

    if(opponentActiveBeastImg && playerActiveBeastImg){
        return(
            <Container className={classes.container}>
                <Box
                className={classes.gameBoxOpponent}
                onMouseOver={onOpponentBeastHover}
                onMouseOut={onHoverLeave}>
                    <h5>Health Bar Here</h5>
                    <img
                    className={classes.beastImg}
                    src={opponentActiveBeastImg}
                    alt="active-beast-opponent" />
                </Box>
                <Box
                className={classes.gameBoxPlayer}
                onMouseOver={onPlayerBeastHover}
                onMouseOut={onHoverLeave}>
                    <h5>Health Bar Here</h5>
                    <img
                    className={classes.beastImg}
                    src={playerActiveBeastImg}
                    alt="active-beast-player" />
                </Box>
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            <Box
            className={classes.gameBoxOpponent}
            onMouseOver={onOpponentBeastHover}
            onMouseOut={onHoverLeave}>
                <h5>Health Bar Here</h5>
                <img
                className={classes.beastImg}
                src={null}
                alt="active-beast-opponent" />
            </Box>
            <Box
            className={classes.gameBoxPlayer}
            onMouseOver={onPlayerBeastHover}
            onMouseOut={onHoverLeave}>
                <h5>Health Bar Here</h5>
                <img
                className={classes.beastImg}
                src={null}
                alt="active-beast-player" />
            </Box>
        </Container>
    )
}