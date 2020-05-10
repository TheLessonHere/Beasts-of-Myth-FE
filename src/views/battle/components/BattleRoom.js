import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    removeConnection
} from '../../../actions';
import {
    Container,
    Typography,
    Box,
    Select,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Components
import BattleWindow from './BattleWindow';
import PlayerHUD from './PlayerHUD';
import OpponentHUD from './OpponentHUD';
import BattleController from './BattleController';
// Classes
import Game from '../../../classes/Game';
import GameLog from '../../../classes/GameLog';
import Player from '../../../classes/Player';
import Team from '../../../classes/Team';
// Libraries
import { beasts } from '../../../data/libraries/BeastLibrary';
import { abilities } from '../../../data/libraries/AbilityLibrary';
import { items } from '../../../data/libraries/ItemLibrary';
import { moves } from '../../../data/libraries/MoveLibrary';
// Functions
import { getBeastImage } from '../../../utils/functions/getBeastImage';

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: "96%",
        width: "100%",
        display: 'flex',
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: 'center'
    },
    topBox: {
        display: "flex",
        flexFlow: "row nowrap",
        maxWidth: "1120px",
        width: '100%'
    }
}));

function BattleRoom(props) {
    const classes = useStyles();
    const [hoverInfo, setHoverInfo] = useState(null);
    const [opponentTeamLineup, setOpponentTeamLineup] = useState(null);
    const [playerTeamLineup, setPlayerTeamLineup] = useState(null);

    // Images
    const [p1s1, setP1S1] = useState(null);
    const [p1s2, setP1S2] = useState(null);
    const [p1s3, setP1S3] = useState(null);
    const [p1s4, setP1S4] = useState(null);
    const [p1s5, setP1S5] = useState(null);
    const [p2s1, setP2S1] = useState(null);
    const [p2s2, setP2S2] = useState(null);
    const [p2s3, setP2S3] = useState(null);
    const [p2s4, setP2S4] = useState(null);
    const [p2s5, setP2S5] = useState(null);

    useEffect(() => {
        let p1Team = new Team('Unrestricted', 'Team1');
        let p2Team = new Team('Unrestricted', 'Team2');
        p1Team.fillInTeamFromString(props.room.player1.team);
        p2Team.fillInTeamFromString(props.room.player2.team);
        const p1s1Search = p1Team.slot1.beast.beast_name.toLowerCase();
        const p1s2Search = p1Team.slot2.beast.beast_name.toLowerCase();
        const p1s3Search = p1Team.slot3.beast.beast_name.toLowerCase();
        const p1s4Search = p1Team.slot4.beast.beast_name.toLowerCase();
        const p1s5Search = p1Team.slot5.beast.beast_name.toLowerCase();
        const p2s1Search = p2Team.slot1.beast.beast_name.toLowerCase();
        const p2s2Search = p2Team.slot2.beast.beast_name.toLowerCase();
        const p2s3Search = p2Team.slot3.beast.beast_name.toLowerCase();
        const p2s4Search = p2Team.slot4.beast.beast_name.toLowerCase();
        const p2s5Search = p2Team.slot5.beast.beast_name.toLowerCase();
        setP1S1(getBeastImage(p1s1Search));
        setP1S2(getBeastImage(p1s2Search));
        setP1S3(getBeastImage(p1s3Search));
        setP1S4(getBeastImage(p1s4Search));
        setP1S5(getBeastImage(p1s5Search));
        setP2S1(getBeastImage(p2s1Search));
        setP2S2(getBeastImage(p2s2Search));
        setP2S3(getBeastImage(p2s3Search));
        setP2S4(getBeastImage(p2s4Search));
        setP2S5(getBeastImage(p2s5Search));
        let player1 = new Player(props.room.player1.player_id,
                                props.room.player1.username,
                                "player1",
                                null,
                                p1Team);
        let player2 = new Player(props.room.player2.player_id,
                                props.room.player2.username,
                                "player2",
                                null,
                                p2Team);
        if(props.id === player1.player_id){
            props.setPlayer(player1);
            props.setOpponent(player2);
        } else {
            props.setPlayer(player2);
            props.setOpponent(player1);
        }
        const newGame = new Game(player1, player2);
        props.setGame(newGame);
    }, [])

    useEffect(() => {
        if(props.player && props.player.player_num === "player1"){
            setOpponentTeamLineup({
                s1: p2s1,
                s2: p2s2,
                s3: p2s3,
                s4: p2s4,
                s5: p2s5
            });
            setPlayerTeamLineup({
                s1: p1s1,
                s2: p1s2,
                s3: p1s3,
                s4: p1s4,
                s5: p1s5
            });
        }
        else if(props.player && props.player.player_num === "player2") {
            setOpponentTeamLineup({
                s1: p1s1,
                s2: p1s2,
                s3: p1s3,
                s4: p1s4,
                s5: p1s5
            });
            setPlayerTeamLineup({
                s1: p2s1,
                s2: p2s2,
                s3: p2s3,
                s4: p2s4,
                s5: p2s5
            });
        }
    }, [ props.player, props.opponent ])

    const onMoveButtonHover = (moveSlot) => {
        const moveInfo = props.player.team.active_slot.beast.moves.get(moveSlot);
        const calcedDamage = props.calcMoveDamage(moveInfo);
        const info = {
            infoType: 'move',
            moveInfo: moveInfo,
            calcedDamage: calcedDamage
        };
        setHoverInfo(info);
    }

    const onSwitchButtonHover = (slot) => {
        let beastInfo;
        switch(slot){
            case 'slot1':
                beastInfo = props.player.team.slot1.beast;
                const info1 = {
                    infoType: 'switch',
                    beastInfo: beastInfo
                };
                setHoverInfo(info1);
                break;
            case 'slot2':
                beastInfo = props.player.team.slot2.beast;
                const info2 = {
                    infoType: 'switch',
                    beastInfo: beastInfo
                };
                setHoverInfo(info2);
                break;
            case 'slot3':
                beastInfo = props.player.team.slot3.beast;
                const info3 = {
                    infoType: 'switch',
                    beastInfo: beastInfo
                };
                setHoverInfo(info3);
                break;
            case 'slot4':
                beastInfo = props.player.team.slot4.beast;
                const info4 = {
                    infoType: 'switch',
                    beastInfo: beastInfo
                };
                setHoverInfo(info4);
                break;
            case 'slot5':
                beastInfo = props.player.team.slot5.beast;
                const info5 = {
                    infoType: 'switch',
                    beastInfo: beastInfo
                };
                setHoverInfo(info5);
                break;
            default:
                setHoverInfo(null);
        }
    }

    const onOpponentPreviewHover = (slot) => {
        let beastInfo;
        switch(slot){
            case 'slot1':
                beastInfo = props.opponent.team.slot1.beast;
                const info1 = {
                    infoType: 'preview',
                    beastInfo: beastInfo
                };
                setHoverInfo(info1);
                break;
            case 'slot2':
                beastInfo = props.opponent.team.slot2.beast;
                const info2 = {
                    infoType: 'preview',
                    beastInfo: beastInfo
                };
                setHoverInfo(info2);
                break;
            case 'slot3':
                beastInfo = props.opponent.team.slot3.beast;
                const info3 = {
                    infoType: 'preview',
                    beastInfo: beastInfo
                };
                setHoverInfo(info3);
                break;
            case 'slot4':
                beastInfo = props.opponent.team.slot4.beast;
                const info4 = {
                    infoType: 'preview',
                    beastInfo: beastInfo
                };
                setHoverInfo(info4);
                break;
            case 'slot5':
                beastInfo = props.opponent.team.slot5.beast;
                const info5 = {
                    infoType: 'preview',
                    beastInfo: beastInfo
                };
                setHoverInfo(info5);
                break;
            default:
                setHoverInfo(null);
        }
    }

    const onOpponentBeastHover = () => {
        const beastInfo = props.opponent.team.active_slot.beast;
        const info = {
            infoType: 'opponent',
            beastInfo: beastInfo
        };
        setHoverInfo(info);
    }

    const onPlayerBeastHover = () => {
        const beastInfo = props.player.team.active_slot.beast;
        const info = {
            infoType: 'player',
            beastInfo: beastInfo
        };
        setHoverInfo(info);
    }

    const onHoverLeave = () => {
        setHoverInfo(null);
    }

    if(props.game){
        return (
            <Container className={classes.container}>
                <Box className={classes.topBox}>
                    <PlayerHUD
                    hoverInfo={hoverInfo} />
                    <BattleWindow
                    inTeamPreview={props.inTeamPreview}
                    opponentTeamLineup={opponentTeamLineup}
                    playerTeamLineup={playerTeamLineup}
                    player={props.player}
                    opponent={props.opponent}
                    game={props.game}
                    gameDidUpdate={props.gameDidUpdate}
                    playerDidMove={props.playerDidMove}
                    playerDidSwitch={props.playerDidSwitch}
                    opponentDidMove={props.opponentDidMove}
                    opponentDidSwitch={props.opponentDidSwitch}
                    beastDidGetKOd={props.beastDidGetKOd}
                    onOpponentBeastHover={onOpponentBeastHover}
                    onPlayerBeastHover={onPlayerBeastHover}
                    onOpponentPreviewHover={onOpponentPreviewHover}
                    onSwitchButtonHover={onSwitchButtonHover}
                    onHoverLeave={onHoverLeave} />
                    <OpponentHUD />
                </Box>
                <BattleController
                inTeamPreview={props.inTeamPreview}
                player={props.player}
                sendAction={props.sendAction}
                sendPostKOAction={props.sendPostKOAction}
                game={props.game}
                gameDidUpdate={props.gameDidUpdate}
                playerDidMove={props.playerDidMove}
                playerDidSwitch={props.playerDidSwitch}
                opponentDidMove={props.opponentDidMove}
                opponentDidSwitch={props.opponentDidSwitch}
                beastDidGetKOd={props.beastDidGetKOd}
                onMoveButtonHover={onMoveButtonHover}
                onSwitchButtonHover={onSwitchButtonHover}
                onHoverLeave={onHoverLeave}
                playerDidWin={props.playerDidWin}
                opponentDidWin={props.opponentDidWin}
                playersHaveTied={props.playersHaveTied} />
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            Error loading game.
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, { removeConnection })(BattleRoom)