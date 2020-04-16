import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getItemImage } from '../../../utils/functions/getItemImage';

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
    const { item, onItemClick } = props;
    const classes = useStyles();

    return (
        <ListItem className={classes.listItem} divider={true} onClick={() => onItemClick(item)}>
            <ListItemText className={classes.format} primary={`${item.format}`} />
            <ListItemAvatar>
                <Avatar
                    alt={`${item.item_name}-image`}
                    variant="square"
                    className={classes.avi}
                    src={getItemImage(item.search_id)} />
            </ListItemAvatar>
            <ListItemText className={classes.name} primary={`${item.item_name}`} />
            <ListItemText className={classes.description} primary={`${item.short_description}`} />
        </ListItem>
    )
};