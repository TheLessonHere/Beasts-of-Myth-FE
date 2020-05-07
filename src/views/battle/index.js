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
    },
    noTeams: {
      marginTop: "20px"
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
  const [gameDidUpdate, setGameDidUpdate] = useState(false);
  const [game, setGame] = useState(null);
  const [gameLog, setGameLog] = useState(null);
  const [player, setPlayer] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [lastPlayerAction, setLastPlayerAction] = useState(null);
  const [lastOpponentAction, setLastOpponentAction] = useState(null);
  const [playerDidSwitch, setPlayerDidSwitch] = useState(false);
  const [opponentDidSwitch, setOpponentDidSwitch] = useState(false);
  const [playerDidMove, setPlayerDidMove] = useState(false);
  const [opponentDidMove, setOpponentDidMove] = useState(false);
  const [beastDidGetKOd, setBeastDidGetKOd] = useState(false);
  const [playerDidWin, setPlayerDidWin] = useState(false);
  const [opponentDidWin, setOpponentDidWin] = useState(false);
  const [playersHaveTied, setPlayersHaveTied] = useState(false);
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
    if(game){
      if(props.id === game.player1.player_id){
          setPlayer(game.player1);
          setOpponent(game.player2);
      } else {
          setPlayer(game.player2);
          setOpponent(game.player1);
      }

      if(lastPlayerAction){
        switch(lastPlayerAction.actionType){
          case 'select-move':
            console.log(lastPlayerAction, 'select')
            setPlayerDidMove(!playerDidMove);
            break;
          case 'change-beast':
            console.log(lastPlayerAction, 'switch')
            setPlayerDidSwitch(!playerDidSwitch);
            break;
          default:
            break;
        }
      }

      if(lastOpponentAction){
        switch(lastOpponentAction.actionType){
          case 'select-move':
            console.log(lastOpponentAction, 'select')
            setOpponentDidMove(!opponentDidMove);
            break;
          case 'change-beast':
            console.log(lastOpponentAction, 'switch')
            setOpponentDidSwitch(!opponentDidSwitch);
            break;
          default:
            break;
        }
      }
  }
  }, [ gameDidUpdate, lastPlayerAction, lastOpponentAction ])

  useEffect(() => {
    socket.on('room created', (room, callback) => {
      props.addConnection();
      setRoom(room);
    });

    socket.on('player exit', ({ player, action }, callback) => {
      // Handle game loss for the player exiting.
      console.log(`Player ${player.player_id} has forfeited.`);
    });

    if(game){
      socket.on('opponent action', (action, callback) => {
        console.log(action);
        const gameCopy = game;
        gameCopy.selectAction(action, opponent.player_id);
        gameCopy.updateActions();
        const result = gameCopy.actionsExecutable();
        if(result){
          setLastPlayerAction(action);
          if(player.player_num === 'player1'){
            setLastOpponentAction(game.player2.selected_action);
          } else {
            setLastOpponentAction(game.player1.selected_action);
          }
          gameCopy.executeActions();
          if(gameCopy.player1.team.active_slot.beast === null ||
            gameCopy.player2.team.active_slot.beast === null){
              setBeastDidGetKOd(true);
            }
          console.log(gameCopy);
          if(gameCopy.winner && gameCopy.winner.player_num === player.player_num){
            setPlayerDidWin(true);
          }
          else if(gameCopy.winner && gameCopy.winner.player_num === opponent.player_num){
            setOpponentDidWin(true);
          }
          else if(gameCopy.draw){
            setPlayersHaveTied(true);
          }
          handleGameChange(gameCopy);
          if(action.actionType === "starting-beast"){
            setInTeamPreview(false);
          }
          setGameDidUpdate(!gameDidUpdate);
        }
      });

      socket.on('opponent post ko', (action, callback) => {
        console.log(action);
        const gameCopy = game;
        gameCopy.postKOSwitch(action.playerNum, action.slot);
        setLastOpponentAction(action);
        setBeastDidGetKOd(false);
        console.log(gameCopy);
        handleGameChange(gameCopy);
        setGameDidUpdate(!gameDidUpdate);
      })
    }

    return () => {
      socket.off('room created');
      socket.off('player exit');
      socket.off('opponent action');
    }
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
    console.log(action);
    socket.emit('player action', { room: room.room_id, action: action });
    const gameCopy = game;
    gameCopy.selectAction(action, player.player_id);
    gameCopy.updateActions();
    const result = gameCopy.actionsExecutable();
    if(result){
      setLastPlayerAction(action);
      if(player.player_num === 'player1'){
        setLastOpponentAction(game.player2.selected_action);
      } else {
        setLastOpponentAction(game.player1.selected_action);
      }
      gameCopy.executeActions();
      if(gameCopy.player1.team.active_slot.beast === null ||
        gameCopy.player2.team.active_slot.beast === null){
          setBeastDidGetKOd(true);
        }
      console.log(gameCopy);
      if(gameCopy.winner && gameCopy.winner.player_num === player.player_num){
        setPlayerDidWin(true);
      }
      else if(gameCopy.winner && gameCopy.winner.player_num === opponent.player_num){
        setOpponentDidWin(true);
      }
      else if(gameCopy.draw){
        setPlayersHaveTied(true);
      }
      handleGameChange(gameCopy);
      if(action.actionType === "starting-beast"){
        setInTeamPreview(false);
      }
      setGameDidUpdate(!gameDidUpdate);
    }
  }

  const sendPostKOAction = (action) => {
    console.log(action);
    socket.emit('post ko switch', { room: room.room_id, action: action });
    const gameCopy = game;
    gameCopy.postKOSwitch(action.playerNum, action.slot);
    setLastPlayerAction(action);
    setBeastDidGetKOd(false);
    console.log(gameCopy);
    handleGameChange(gameCopy);
    setGameDidUpdate(!gameDidUpdate);
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

  if(isBattling){
      return (
          <BattleRoom
          room={room}
          game={game}
          setGame={handleGameChange}
          gameDidUpdate={gameDidUpdate}
          player={player}
          setPlayer={handlePlayerChange}
          opponent={opponent}
          setOpponent={handleOpponentChange}
          seeSpectators={seeSpectators}
          sendAction={sendAction}
          sendPostKOAction={sendPostKOAction}
          forfeit={forfeit}
          inTeamPreview={inTeamPreview}
          playerDidMove={playerDidMove}
          playerDidSwitch={playerDidSwitch}
          opponentDidMove={opponentDidMove}
          opponentDidSwitch={opponentDidSwitch}
          beastDidGetKOd={beastDidGetKOd}
          playerDidWin={playerDidWin}
          opponentDidWin={opponentDidWin}
          playersHaveTied={playersHaveTied} />
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
          <Typography className={classes.noTeams} align="center">No Teams Found</Typography>}
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