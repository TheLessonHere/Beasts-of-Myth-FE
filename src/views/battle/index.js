import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import {
  createTeamObjects,
  addConnection
 } from '../../actions';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    List,
    ListItem,
    Box,
    Typography,
    CircularProgress
    } from "@material-ui/core";
// Components
import TeamMiniBox from '../../utils/components/TeamMiniBox';
import QueueForm from './components/QueueForm';
import BattleRoom from './components/BattleRoom';
// Socket
import io from 'socket.io-client';
// Classes
import Game from '../../classes/Game';
import GameLog from '../../classes/GameLog';
import Player from '../../classes/Player';
import Team from '../../classes/Team';
import Beast from '../../classes/Beast';
import Move from '../../classes/Move';
import Item from '../../classes/Item';
// Libraries
import { beasts } from '../../data/libraries/BeastLibrary';
import { abilities } from '../../data/libraries/AbilityLibrary';
import { items } from '../../data/libraries/ItemLibrary';
import { moves } from '../../data/libraries/MoveLibrary';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexFlow: "row nowrap",
        backgroundColor: "lightgrey",
        height: "800px",
        padding: "20px",
        borderRadius: "5px",
    },
    miniBoxList: {
        width: "55%",
        height: "100%",
        backgroundColor: "darkgrey",
        overflow: "scroll"
    }
}))

let socket;

function Battle(props) {
  const classes = useStyles();
  const [isSearching, setIsSearching] = useState(false);
  const [isBattling, setIsBattling] = useState(false);
  const [format, setFormat] = useState('Unrestricted');
  const [teamSelected, setTeamSelected] = useState(null);
  const [teamSelectedId, setTeamSelectedId] = useState(null);
  const [room, setRoom] = useState(null);
  // Post connection state
  const [game, setGame] = useState(null);
  const [gameLog, setGameLog] = useState(null);
  const [player, setPlayer] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [inTeamPreview, setInTeamPreview] = useState(true);

  useEffect(() => {
    socket = io('localhost:8000');
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [])

  useEffect(() => {
    props.createTeamObjects(props.user_teams);
    setTeamSelected(null);
    setTeamSelectedId(null);
  }, [ props.user_teams ])

  useEffect(() => {
    setTeamSelected(null);
    setTeamSelectedId(null);
  }, [ format ])

  useEffect(() => {
    if(room){
      joinAsPlayer();
      setIsBattling(true);
    } else {
      setIsBattling(false);
    }
  }, [ room ])

  useEffect(() => {
  }, [ game ])

  const onMiniBoxClick = (team) => {
    setTeamSelected(team.team_object);
    setTeamSelectedId(team.team_id);
  }

  const handleFormatChange = (event) => {
      setFormat(event.target.value);
  }

  const queueTeam = (event) => {
    event.preventDefault();
    setIsSearching(true);
    const team = props.user_teams.find(team => team.team_id === teamSelectedId);
    if(team){
      const queueObject = {
        id: props.id,
        username: props.username,
        format: format,
        team: team.team_datastring
      }
      console.log(queueObject);
      socket.emit('enqueue', queueObject);
    }
  }

  const cancelQueue = (event) => {
    event.preventDefault();
    const user = { id: props.id };
    socket.emit('dequeue', user);
    socket.emit('disconnect');
    setIsSearching(false);
  }

  const joinAsPlayer = () => {
    let credentials = {};
    if(room.player1.player_id === props.id){
      credentials = {
        playerNum: "player1",
        player: room.player1,
        room_id: room.room_id
      }
    } else {
      credentials = {
        playerNum: "player2",
        player: room.player2,
        room_id: room.room_id
      }
    }
    socket.emit('join as player', credentials);
  }

  const seeSpectators = () => {
    socket.emit('see spectators', { room_id: room.room_id });
  }

  const forfeit = () => {
    let credentials = {};
    if(room.player1.player_id === props.id){
      credentials = {
        playerNum: "player1",
        player: room.player1,
        room_id: room.room_id
      }
    } else {
      credentials = {
        playerNum: "player2",
        player: room.player2,
        room_id: room.room_id
      }
    }
    socket.emit('forfeit', credentials);
  }

  const sendAction = (action) => {
    socket.emit('player action', { room: room.room_id, action: action });
    game.selectAction(action, player.player_id);
    game.updateActions();
    const result = game.actionsExecutable();
    if(result){
      game.executeActions();
      if(action.actionType === "starting-beast"){
        setInTeamPreview(false);
      }
    }
  }

  if(socket){
    socket.on('room created', (room, callback) => {
      console.log(room);
      props.addConnection();
      setRoom(room);
    })

    if(game){
      socket.on('opponent action', (action, callback) => {
        game.selectAction(action, opponent.player_id);
        game.updateActions();
        const result = game.actionsExecutable();
        if(result){
          game.executeActions();
          if(action.actionType === "starting-beast"){
            setInTeamPreview(false);
          }
        }
      })

      socket.on('player exit', ({ player, action }, callback) => {
        // Handle game loss for the player exiting.
        console.log(`Player ${player.player_id} has forfeited.`);
      })
    }
  }

  // State handlers

  const handleGameChange = (game) => {
    setGame(game);
  }

  const handlePlayerChange = (player) => {
    setPlayer(player);
  }

  const handleOpponentChange = (opponent) => {
    setOpponent(opponent);
  }

  const logGame = () => {
    console.log(game);
  }

  if(isBattling){
      return (
          <BattleRoom
          room={room}
          game={game}
          setGame={handleGameChange}
          player={player}
          setPlayer={handlePlayerChange}
          opponent={opponent}
          setOpponent={handleOpponentChange}
          seeSpectators={seeSpectators}
          sendAction={sendAction}
          forfeit={forfeit}
          inTeamPreview={inTeamPreview}
          logGame={logGame} />
      )
  }

  return (
    <Container className={classes.container}>
      <QueueForm
        format={format}
        handleFormatChange={handleFormatChange}
        team={teamSelected}
        teamId={teamSelectedId}
        isSearching={isSearching}
        queueTeam={queueTeam}
        cancelQueue={cancelQueue} />
      <List className={classes.miniBoxList}>
        {props.team_objects.length > 0 ?
        props.team_objects.map(team => {
        if(team.team_object.format === format){
            return <ListItem component="div" key={`${team.team_id}`} onClick={() => {onMiniBoxClick(team)}}>
                        <TeamMiniBox team={team} />
                    </ListItem>
        }}) :
          <Typography align="center">No Teams Found</Typography>}
      </List>
    </Container>
  );
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, { createTeamObjects, addConnection })(Battle)