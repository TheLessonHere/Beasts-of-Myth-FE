import React from 'react';
import MoveRow from './MoveRow';
import {
    Container
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
        height: "50%",
        overflow: 'auto'
    }
}));

export default function MoveSearchSuggestions(props){
    const { suggestions, onMoveClick } = props;
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            {suggestions.map(suggestion =>
                <MoveRow key={suggestion.move_id} move={suggestion} onMoveClick={onMoveClick} />
            )}
        </Container>
    )
}