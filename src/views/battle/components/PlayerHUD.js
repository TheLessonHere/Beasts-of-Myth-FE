import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Select,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: "250px",
        width: "100%",
        height: "400px",
        backgroundColor: "lightgrey",
        border: "1px solid darkgrey",
        borderRadius: "5px"
    }
}));

export default function PlayerHUD(props) {
    const classes = useStyles();
    const { hoverInfo } = props;
    const [infoType, setInfoType] = useState(null);

    useEffect(() => {
        if(hoverInfo){
            setInfoType(hoverInfo.infoType);
        } else {
            setInfoType(null);
        }
    }, [ hoverInfo, infoType ])

    if(infoType === 'move'){
        return (
            <Container className={classes.container}>
               <Typography variant="h6">Move</Typography>
            </Container>
        )
    }

    if(infoType === 'switch'){
        return (
            <Container className={classes.container}>
               <Typography variant="h6">Swtich</Typography>
            </Container>
        )
    }

    if(infoType === 'opponent'){
        return (
            <Container className={classes.container}>
               <Typography variant="h6">Opponent</Typography>
            </Container>
        )
    }

    if(infoType === 'player'){
        return (
            <Container className={classes.container}>
               <Typography variant="h6">Player</Typography>
            </Container>
        )
    }

    if(infoType === 'preview'){
        return (
            <Container className={classes.container}>
               <Typography variant="h6">Preview</Typography>
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            <Typography variant="h6">No info</Typography>
        </Container>
    )
}