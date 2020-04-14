import React from 'react';
import ItemRow from './ItemRow';
import {
    Container
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
        height: "50%"
    }
}));

export default function ItemSearchSuggestions(props){
    const { suggestions, onItemClick } = props;
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            {suggestions.map(suggestion =>
                <ItemRow key={suggestion.item_id} item={suggestion} onItemClick={onItemClick} />
            )}
        </Container>
    )
}