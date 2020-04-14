import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getItemImage } from '../../../utils/getItemImage';

const useStyles = makeStyles(theme => ({
    listItem: {
        background: "lightgrey",
        "&:hover": {
            cursor: "pointer"
        }
    },
    avi: {
        marginLeft: "10px",
        marginRight: "10px"
    },
    name: {
        width: "120px",
        textAlign: "left",
        marginLeft: "5px",
        marginRight: "30px"
    },
    description: {
        textAlign: "left",
        width: "120px",
        marginLeft: "10px",
        marginRight: "55px"
    },
}))

export default function ItemRow(props){
    const { move, onMoveClick } = props;
    const classes = useStyles();
    const { search_id,
            format,
            item_name,
            short_description } = move;

    return (
        <ListItem className={classes.listItem} divider={true} onClick={() => onMoveClick(search_id)}>
            <ListItemText className={classes.name} primary={`${item_name}`} />
            <ListItemText className={classes.description} primary={`${short_description}`} />
        </ListItem>
    )
};