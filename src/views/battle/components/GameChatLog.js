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
        borderLeft: "1px solid darkgrey",
        borderRight: "1px solid darkgrey",
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
        width: '90%'
    },
    button: {
        height: '30px',
        width: '10%'
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
        fontSize: '1rem',
        wordWrap: 'break-word',
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: '0px',
        marginTop: '5px'
    }
}));

export default function GameChatLog(props) {
    const classes = useStyles();
    const {
    sendMessage,
    chatLog
    } = props;
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log(chatLog);
    }, [ chatLog ])

    const onMessageChange = (event) => {
        setMessage(event.target.value);
    }

    return (
        <Container className={classes.container}>
            <Box className={classes.chatMessages}>
                <ScrollToBottom className={classes.scrollBox}>
                    {chatLog.length > 0 ?
                    chatLog.map((message, index) => {
                        return (
                        <div key={index}>
                            <p className={classes.messageText}>{message.username}: {message.message}</p>
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
                    color="default"
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