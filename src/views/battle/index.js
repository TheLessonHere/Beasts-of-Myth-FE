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
// Functions
import { domainEffectivenessMap } from '../../utils/functions/domainEffectivenessMap';
import createMessage from './functions/createMessage';
import endOfTurn from './functions/endOfTurn';
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
  const [chatLog, setChatLog] = useState([]);
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
  const [actionsReceivedFromOpponent, setActionsReceivedFromOpponent] = useState([]);

  useEffect(() => {
    socket = io('localhost:8000');

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [])

  useEffect(() => {
    socket.on('player message', (message, callback) => {
      console.log("New message", message);
      setChatLog([...chatLog, message]);
    });
  }, [ chatLog ])

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
            setPlayerDidMove(!playerDidMove);
            break;
          case 'change-beast':
            setPlayerDidSwitch(!playerDidSwitch);
            break;
          default:
            break;
        }
      }

      if(lastOpponentAction){
        switch(lastOpponentAction.actionType){
          case 'select-move':
            setOpponentDidMove(!opponentDidMove);
            break;
          case 'change-beast':
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

    if(game){
      console.log(game);

      socket.on('player exit', ({ playerInfo, action }, callback) => {
        // Handle game loss for the player exiting.
        console.log(`${playerInfo.username} has forfeited.`);
        const gameCopy = game;
        if(playerInfo.player_id === gameCopy.player1.player_id){
          gameCopy.winner = gameCopy.player2;
          gameCopy.player2.hasWon();
          gameCopy.loser = gameCopy.player1;
          gameCopy.player1.hasLost();
          handleGameChange(gameCopy);
          if(player.player_id === playerInfo.player_id){
            setOpponentDidWin(true);
          } else {
            setPlayerDidWin(true);
          }
          updateGame();
        } else {
          gameCopy.winner = gameCopy.player1;
          gameCopy.player1.hasWon();
          gameCopy.loser = gameCopy.player2;
          gameCopy.player2.hasLost();
          handleGameChange(gameCopy);
          if(player.player_id === playerInfo.player_id){
            setOpponentDidWin(true);
          } else {
            setPlayerDidWin(true);
          }
          updateGame();
        }
      });

      socket.on('opponent action', (action, callback) => {
        console.log("Opponent action received", action);
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
          const gameLogResult = gameCopy.executeActions();
          const messageArr = createMessage(gameLogResult, gameCopy);
          const chatLogArr = messageArr.map(message => {
            return {message: message}
          });
          const endOfTurnMessages = endOfTurn(gameLogResult.eotEffects, game);
          setActionsReceivedFromOpponent([...chatLogArr, ...endOfTurnMessages]);
          updateGame();
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
        } else {
          game.setFirstToAct(opponent.player_num);
        }
        updateGame();
      });

      socket.on('opponent post ko', (action, callback) => {
        console.log(action);
        const gameCopy = game;
        gameCopy.postKOSwitch(action.playerNum, action.slot);
        setLastOpponentAction(action);
        setBeastDidGetKOd(false);
        console.log(gameCopy);
        handleGameChange(gameCopy);
        updateGame();
      })

      setChatLog([...chatLog,
      { message: `${game.player1.username} entered the room.`},
      { message: `${game.player2.username} entered the room.`}])
    }

    return () => {
      socket.off('room created');
      socket.off('player exit');
      socket.off('opponent action');
    }
  }, [ game ])

  useEffect(() => {
    if(actionsReceivedFromOpponent){
      setChatLog([...chatLog, ...actionsReceivedFromOpponent])
    }
  }, [ actionsReceivedFromOpponent ])

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
    console.log("Action sent", action);
    const gameCopy = game;
    let completeAction;
    if(action.actionType === "select-move"){
      const critRoll = gameCopy.critRoll(action.critRolls);
      completeAction = {
        actionType: action.actionType,
        moveSlot: action.moveSlot,
        superActivated: action.superActivated,
        critRolls: action.critRolls,
        critRoll: critRoll
      }
    } else {
      completeAction = action;
    }
    const playerCopy = player;
    playerCopy.selectAction(completeAction);
    setPlayer(playerCopy);
    socket.emit('player action', { room: room.room_id, action: completeAction });
    gameCopy.selectAction(completeAction, player.player_id);
    gameCopy.updateActions();
    const result = gameCopy.actionsExecutable();
    if(result){
      setLastPlayerAction(action);
      if(player.player_num === 'player1'){
        setLastOpponentAction(game.player2.selected_action);
      } else {
        setLastOpponentAction(game.player1.selected_action);
      }
      const gameLogResult = gameCopy.executeActions();
      const messageArr = createMessage(gameLogResult, gameCopy);
      const chatLogArr = messageArr.map(message => {
        return {message: message}
      });
      const endOfTurnMessages = endOfTurn(gameLogResult.eotEffects, game);
      setChatLog([...chatLog, ...chatLogArr, ...endOfTurnMessages]);
      updateGame();
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
    } else {
      game.setFirstToAct(player.player_num);
    }
    updateGame();
  }

  const sendMessage = (message) => {
    const messageObj = {
      room: room.room_id,
      message: message,
      username: props.username
    };

    socket.emit('chat message', messageObj);
    setChatLog([...chatLog, {message: message, username: props.username}]);
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
    updateGame();
  }

  const updateGame = () => {
    setGameDidUpdate(!gameDidUpdate);
  }

  const amuletCalculation = (item_name, moveDomain) => {
    switch(item_name){
        case 'Chaos Amulet':
            if(moveDomain === 'chaos'){
                return 1.2;
            }
            break;
        case 'Dark Amulet':
            if(moveDomain === 'dark'){
                return 1.2;
            }
            break;
        case 'Light Amulet':
            if(moveDomain === 'light'){
                return 1.2;
            }
            break;
        case 'Mind Amulet':
            if(moveDomain === 'mind'){
                return 1.2;
            }
            break;
        case 'Terra Amulet':
            if(moveDomain === 'terra'){
                return 1.2;
            }
            break;
        case 'Flame Amulet':
            if(moveDomain === 'flame'){
                return 1.2;
            }
            break;
        case 'Sea Amulet':
            if(moveDomain === 'sea'){
                return 1.2;
            }
            break;
        case 'Sky Amulet':
            if(moveDomain === 'sky'){
                return 1.2;
            }
            break;
        default:
            return 1;
    }
    return 1;
}

  const calcMoveDamage = (move) => {
    if(move && player.team.active_slot.beast && opponent.team.active_slot.beast){
      let domainModifier = 1;
      const moveType = move.type;
      const basePower = move.base_power;
      const moveDomain = move.domain;
      const attackingDomain1 = player.team.active_slot.beast.domain1;
      const attackingDomain2 = player.team.active_slot.beast.domain2;
      const defendingDomain = `${opponent.team.active_slot.beast.domain1}-${opponent.team.active_slot.beast.domain2}`;
      const effectiveness = domainEffectivenessMap.get(moveDomain)[defendingDomain];
      let amuletModifier = 1;
      if(player.team.active_slot.beast.item){
          amuletModifier = amuletCalculation(player.team.active_slot.beast.item.item_name, moveDomain);
      }
      let sameTypeBonus = 0;
      if(attackingDomain1 == moveDomain || attackingDomain2 == moveDomain){
          sameTypeBonus = Math.round(basePower / 2);
      }
      switch(game.curr_domain){
          case 'Lightfield':
              if(moveDomain == 'light'){
                  domainModifier = 1.5;
              }
              break;
          case 'Darkfield':
              if(moveDomain == 'dark'){
                  domainModifier = 1.5;
              }
              break;
          case 'Mindfield':
              if(moveDomain == 'mind'){
                  domainModifier = 1.5;
              }
              break;
          case 'Chaosfield':
              if(moveDomain == 'chaos'){
                  domainModifier = 1.5;
              }
              break;
          case 'Flamefield':
              if(moveDomain == 'flame'){
                  domainModifier = 1.5;
              }
              break;
          case 'Terrafield':
              if(moveDomain == 'terra'){
                  domainModifier = 1.5;
              }
              break;
          case 'Seafield':
              if(moveDomain == 'sea'){
                  domainModifier = 1.5;
              }
              break;
          case 'Skyfield':
              if(moveDomain == 'sky'){
                  domainModifier = 1.5;
              }
              break;
          case 'Neutral':
              break;
          default:
              console.log('Error calculating domain modifier.');
      }

      let rawDamage = 0;
      let damage;

        if(moveType == 'physical'){
          rawDamage = (((basePower + sameTypeBonus) * domainModifier) * (player.team.active_slot.beast.curr_pa / opponent.team.active_slot.beast.curr_pd)) * amuletModifier * effectiveness;
          damage = Math.round(rawDamage * 100) / 100;
      } else {
          rawDamage = (((basePower + sameTypeBonus) * domainModifier) * (player.team.active_slot.beast.curr_ma / opponent.team.active_slot.beast.curr_md)) * amuletModifier * effectiveness;
          damage = Math.round(rawDamage * 100) / 100;
      }

      return {damage: damage, damageWithCrit: damage * 2};
    } else {
      return null;
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
          playersHaveTied={playersHaveTied}
          calcMoveDamage={calcMoveDamage}
          sendMessage={sendMessage}
          chatLog={chatLog} />
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