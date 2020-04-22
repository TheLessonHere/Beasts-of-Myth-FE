import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
import Beast from '../../../classes/Beast';
import Move from '../../../classes/Move';
import Item from '../../../classes/Item';
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

    useEffect(() => {
        
    }, [])
}