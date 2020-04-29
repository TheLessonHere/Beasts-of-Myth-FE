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

    useEffect(() => {
        let p1Team;
        let p2Team;
        let player1;
        let player2;
        if(props.opponent.playerNum === "player1"){
            p1Team = new Team('Unrestricted', 'Team1');
            p1Team.fillInTeamFromString(props.opponent.player.team);
            p2Team = props.teamSelected;
            player1 = new Player(props.opponent.player.player_id,
                                props.opponent.player.username,
                                null,
                                props.opponent.player.team);
            const teamDatastring = props.teamSelected.convertToString();
            player2 = new Player(props.id,
                                props.username,
                                null,
                                teamDatastring);
            console.log(p1Team, p2Team, player1, player2);
        } else {
            p2Team = new Team('Unrestricted', 'Team2');
            p2Team.fillInTeamFromString(props.opponent.player.team);
            p1Team = props.teamSelected;
            player1 = new Player(props.opponent.player.player_id,
                                props.opponent.player.username,
                                null,
                                props.opponent.player.team);
            const teamDatastring = props.teamSelected.convertToString();
            player2 = new Player(props.id,
                                props.username,
                                null,
                                teamDatastring);
            console.log(p1Team, p2Team, player1, player2);
        }
        const newGame = new Game(player1, player2);
        console.log(newGame);
        setGame(newGame);
    }, [])

    return (
        <Container className={classes.container}>
            Battle room
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, { removeConnection })(BattleRoom)