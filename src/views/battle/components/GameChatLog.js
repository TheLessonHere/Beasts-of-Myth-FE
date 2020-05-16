import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Form,
    TextField,
    Button
} from "@material-ui/core";
import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        height: "100%",
        padding: '0px',
        backgroundColor: "white",
        border: '1px solid darkgrey',
        display: 'flex',
        flexFlow: 'column nowrap'
    },
    chatMessages: {
        maxHeight: "90%",
        height: "100%",
        width: "100%",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "flex-end",
        alignItems: "left",
        background: 'whitesmoke'
    },
    chatInput: {
        height: "10%",
        width: "100%",
        display: "flex",
        flexFlow: "row nowrap"
    },
    form: {
        height: '100%',
        width: '100%',
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: 'flex-end'
    },
    textField: {
        height: '30px',
        width: '90%',
        paddingBottom: '0px',
        borderBottom: '0px',
        borderLeft: '0px',
        borderTop: '1px solid darkgrey'
    },
    button: {
        height: '30px',
        width: '10%',
        backgroundColor: 'lightgrey',
        borderRadius: '0px',
        fontSize: '0.7rem'
    },
    scrollBox: {
        padding: '5% 0',
        overflow: 'auto',
        flex: 'auto'
    },
    messageText: {
        width: '98%',
        letterSpacing: '0',
        float: 'left',
        fontSize: '0.8rem',
        wordWrap: 'break-word',
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: '0px',
        marginTop: '0px'
    },
    gameMessage: {
        width: '98%',
        letterSpacing: '0',
        float: 'left',
        fontSize: '0.8rem',
        color: 'darkgrey',
        wordWrap: 'break-word',
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: '0px',
        marginTop: '0px'
    },
    turnEnd: {
        borderBottom: '1px solid darkgrey',
        paddingBottom: '5px'
    }
}));

export default function GameChatLog(props) {
    const classes = useStyles();
    const {
    sendMessage,
    chatLog,
    game
    } = props;
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log(chatLog);
    }, [ chatLog, game ])

    const onMessageChange = (event) => {
        setMessage(event.target.value);
    }

    return (
        <Container className={classes.container}>
            <Box className={classes.chatMessages}>
                <ScrollToBottom className={classes.scrollBox}>
                    {chatLog.length > 0 ?
                    chatLog.map((message, index) => {
                        if(message.actions){
                            if(message.firstAction === 'player1'){
                                if(message.p2Super && message.p1Super){
                                    return (
                                        <div key={index}>
                                            <div>
                                                <p className={classes.messageText}>{game.player1.username} activated their Super-Crystal!</p>
                                            </div>
                                            <div>
                                                <p className={classes.messageText}>{game.player2.username} activated their Super-Crystal!</p>
                                            </div>
                                            {message.p1ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p1ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>
                                            }
                                            {message.p2ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p1ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p2ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>}
                                        </div>
                                    )
                                }
                                else if(message.p2Super && !message.p1Super){
                                    return (
                                        <div key={index}>
                                            <div>
                                                <p className={classes.messageText}>{game.player1.username} activated their Super-Crystal!</p>
                                            </div>
                                            {message.p1ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p1ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>
                                            }
                                            {message.p2ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p1ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p2ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>}
                                        </div>
                                    )
                                }
                                else if(!message.p2Super && message.p1Super){
                                    return (
                                        <div key={index}>
                                            <div>
                                                <p className={classes.messageText}>{game.player1.username} activated their Super-Crystal!</p>
                                            </div>
                                            {message.p1ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p1ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>
                                            }
                                            {message.p2ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p1ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p2ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>}
                                        </div>
                                    )
                                }
                                else if(!message.p2Super && !message.p1Super){
                                    console.log(message)
                                    return (
                                        <div key={index}>
                                            {message.p1ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p1ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>
                                            }
                                            {message.p2ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p1ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p2ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>}
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index}>
                                            <p className={classes.messageText}>Error reading last action based on Super Activation. Player 1 went first.</p>
                                        </div>
                                    )
                                }
                            }
                            else if(message.firstAction === 'player2'){
                                if(message.p1Super && message.p2Super){
                                    return (
                                        <div key={index}>
                                            <div>
                                                <p className={classes.messageText}>{game.player2.username} activated their Super-Crystal!</p>
                                            </div>
                                            <div>
                                                <p className={classes.messageText}>{game.player1.username} activated their Super-Crystal!</p>
                                            </div>
                                            {message.p2ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p1ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p2ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>}
                                            {message.p1ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p1ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>
                                            }
                                        </div>
                                    )
                                }
                                else if(!message.p1Super && message.p2Super){
                                    return (
                                        <div key={index}>
                                            <div>
                                                <p className={classes.messageText}>{game.player2.username} activated their Super-Crystal!</p>
                                            </div>
                                            {message.p2ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p1ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p2ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>}
                                            {message.p1ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p1ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>
                                            }
                                        </div>
                                    )
                                }
                                else if(message.p1Super && !message.p2Super){
                                    return (
                                        <div key={index}>
                                            <div>
                                                <p className={classes.messageText}>{game.player1.username} activated their Super-Crystal!</p>
                                            </div>
                                            {message.p2ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p1ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p2ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>}
                                            {message.p1ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p1ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>
                                            }
                                        </div>
                                    )
                                }
                                else if(!message.p1Super && !message.p2Super){
                                    console.log(message)
                                    return (
                                        <div key={index}>
                                            {message.p2ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p1ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p2ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p2ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player2.team.active_slot.beast.beast_name} used {message.p2ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p2ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p2ActionStatement.damage / game.player1.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>}
                                            {message.p1ActionStatement.statement ?
                                            // The action had a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move and it had a print statement
                                                <p className={classes.messageText}>
                                                    {game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.
                                                </p> :
                                                // A move wasn't used
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move used dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                                <p className={classes.messageText}>{
                                                // Prints the statement associated with the action
                                                message.p1ActionStatement.statement}
                                                </p>
                                            </div> :
                                            // The action didn't have a print statement
                                            <div>
                                                {message.p1ActionStatement.moveName ?
                                                // The action was a move with no secondary effect
                                                <p className={classes.messageText}>{game.player1.team.active_slot.beast.beast_name} used {message.p1ActionStatement.moveName}.</p> :
                                                // The action was not a move
                                                null}
                                                {message.p1ActionStatement.damage ?
                                                // The move dealt damage
                                                <p className={classes.messageText}>It dealt {
                                                    message.p2ActionStatement.beastKOd ?
                                                    // The opposing beast was KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.getLastKnockedOutBeast().init_hp)) * 100}%` :
                                                    // The opposing beast was not KOd
                                                    `${Math.round((message.p1ActionStatement.damage / game.player2.team.active_slot.beast.init_hp)) * 100}%`
                                                    }
                                                </p> :
                                                // The move was non-damaging
                                                null}
                                            </div>
                                            }
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index}>
                                            <p className={classes.messageText}>Error reading last action based on Super Activation. Player 2 went first.</p>
                                        </div>
                                    )
                                }
                            } else {
                                return (
                                    <div key={index}>
                                        <p className={classes.messageText}>Error reading first action.</p>
                                    </div>
                                )
                            }
                        }
                        if(message.username){
                            return (
                                <div key={index}>
                                    <p className={classes.messageText}>{message.username}: {message.message}</p>
                                </div>
                            )
                        }
                        if(message.turnDidEnd){
                            return (
                                <div key={index} className={classes.turnEnd}>
                                    <p className={classes.messageText}>{message.username}: {message.message}</p>
                                </div>
                            )
                        }
                        return (
                            <div key={index}>
                                <p className={classes.gameMessage}>{message.message}</p>
                            </div>
                        )
                    }) :
                    null}
                </ScrollToBottom>
            </Box>
            <Box className={classes.chatInput}>
                <form autoComplete="new-password" className={classes.form}>
                    <input value={message}
                               autoComplete="off"
                               className={classes.textField}
                               onChange={onMessageChange} />
                    <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    onClick={(e) => {
                        e.preventDefault();
                        sendMessage(message);
                        setMessage('');}}>
                        Send
                    </Button>
                </form>
            </Box>
        </Container>
    )
}