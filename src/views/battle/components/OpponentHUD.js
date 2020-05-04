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

    return (
        <Container className={classes.container}>
            OpponentHUD
        </Container>
    )
}