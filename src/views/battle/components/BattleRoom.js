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

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: "96%",
        width: "100%"
    }
}));

function BattleRoom(props) {
    const classes = useStyles();
    const [game, setGame] = useState(null);
    const [gameLog, setGameLog] = useState(null);
    const [player, setPlayer] = useState(null);
    const [opponent, setOpponent] = useState(null);

    useEffect(() => {
        let p1Team = new Team('Unrestricted', 'Team1');
        let p2Team = new Team('Unrestricted', 'Team2');
        p1Team.fillInTeamFromString(props.room.player1.team);
        p2Team.fillInTeamFromString(props.room.player2.team);
        let player1 = new Player(props.room.player1.player_id,
                                props.room.player1.username,
                                null,
                                p1Team);
        let player2 = new Player(props.room.player2.player_id,
                                props.room.player2.username,
                                null,
                                p2Team);
        if(props.id === player1.player_id){
            setPlayer(player1);
            setOpponent(player2);
        } else {
            setPlayer(player2);
            setOpponent(player1);
        }
        const newGame = new Game(player1, player2);
        console.log(newGame);
        setGame(newGame);
    }, [])

    useEffect(() => {

    }, [ game ])

    if(game){
        return (
            <Container className={classes.container}>
                <Typography>{game.player1.username}</Typography>
                <Typography>{game.player2.username}</Typography>
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            Default
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, { removeConnection })(BattleRoom)