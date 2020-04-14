import React from 'react';
import {
    ListItem,
    ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    listItem: {
        background: "lightgrey",
        "&:hover": {
            cursor: "pointer"
        }
    },
    name: {
        width: "120px",
        textAlign: "left",
        marginLeft: "5px",
        marginRight: "30px"
    },
    domain: {
        textAlign: "left",
        width: "80px",
        marginLeft: "10px",
        marginRight: "40px"
    },
    type: {
        textAlign: "left",
        width: "80px",
        marginLeft: "10px",
        marginRight: "40px"
    },
    basePower: {
        textAlign: "left",
        width: "80px",
        marginLeft: "10px",
        marginRight: "40px"
    },
    me: {
        textAlign: "left",
        width: "80px",
        marginLeft: "10px",
        marginRight: "40px"
    },
    description: {
        textAlign: "left",
        width: "120px",
        marginLeft: "10px",
        marginRight: "55px"
    },
}))

export default function MoveRow(props){
    const { move, onMoveClick } = props;
    const classes = useStyles();

    return (
        <ListItem className={classes.listItem} divider={true} onClick={() => onMoveClick(move)}>
            <ListItemText className={classes.name} primary={`${move.move_name}`} />
            <ListItemText className={classes.domain} primary={`${move.domain}`} />
            <ListItemText className={classes.type} primary={`${move.type}`} />
            <ListItemText className={classes.basePower} primary={`${move.base_power}`} />
            <ListItemText className={classes.me} primary={`${move.me}`} />
            <ListItemText className={classes.description} primary={`${move.description}`} />
        </ListItem>
    )
};