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
        width: "100%"
    }
}));

function BattleRoom(props) {
    const classes = useStyles();
    const [inTeamPreview, setInTeamPreview] = useState(true);

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
        console.log(newGame);
        props.setGame(newGame);
    }, [])

    useEffect(() => {
        return;
    }, [ props.game ])

    if(props.game){
        let opponentTeamLineup;
        let playerTeamLineup;
        if(props.player.player_num === "player1"){
            opponentTeamLineup = {
                s1: p2s1,
                s2: p2s2,
                s3: p2s3,
                s4: p2s4,
                s5: p2s5
            };
            playerTeamLineup = {
                s1: p1s1,
                s2: p1s2,
                s3: p1s3,
                s4: p1s4,
                s5: p1s5
            };
        } else {
            opponentTeamLineup = {
                s1: p1s1,
                s2: p1s2,
                s3: p1s3,
                s4: p1s4,
                s5: p1s5
            };
            playerTeamLineup = {
                s1: p2s1,
                s2: p2s2,
                s3: p2s3,
                s4: p2s4,
                s5: p2s5
            };
        }

        let p1ActiveBeastImg = null;
        let p2ActiveBeastImg = null;
        if(props.game.player1.team.active_slot.slotNumber && props.game.player2.team.active_slot.slotNumber){
            switch(props.game.player1.team.active_slot.slotNumber){
                case 'slot1':
                    p1ActiveBeastImg = p1s1;
                    break;
                case 'slot2':
                    p1ActiveBeastImg = p1s2;
                    break;
                case 'slot3':
                    p1ActiveBeastImg = p1s3;
                    break;
                case 'slot4':
                    p1ActiveBeastImg = p1s4;
                    break;
                case 'slot5':
                    p1ActiveBeastImg = p1s5;
                    break;
                default:
                    console.log("Error setting p1activebeastimg.")
            }
            switch(props.game.player2.team.active_slot.slotNumber){
                case 'slot1':
                    p2ActiveBeastImg = p2s1;
                    break;
                case 'slot2':
                    p2ActiveBeastImg = p2s2;
                    break;
                case 'slot3':
                    p2ActiveBeastImg = p2s3;
                    break;
                case 'slot4':
                    p2ActiveBeastImg = p2s4;
                    break;
                case 'slot5':
                    p2ActiveBeastImg = p2s5;
                    break;
                default:
                    console.log("Error setting p2activebeastimg.")
            }
        }

        return (
            <Container className={classes.container}>
                <BattleWindow
                inTeamPreview={inTeamPreview}
                setInTeamPreview={setInTeamPreview}
                opponentTeamLineup={opponentTeamLineup}
                playerTeamLineup={playerTeamLineup}
                p1ActiveBeastImg={p1ActiveBeastImg}
                p2ActiveBeastImg={p2ActiveBeastImg}
                game={props.game} />
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