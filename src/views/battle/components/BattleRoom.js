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

    if(props.game && inTeamPreview){
        return (
            <Container className={classes.container}>
                <Typography>{props.game.player1.username}</Typography>
                <Typography>{props.game.player2.username}</Typography>
            </Container>
        )
    }

    if(props.game && !inTeamPreview){
        return (
            <Container className={classes.container}>
                <Typography>{props.game.player1.username}</Typography>
                <Typography>{props.game.player2.username}</Typography>
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