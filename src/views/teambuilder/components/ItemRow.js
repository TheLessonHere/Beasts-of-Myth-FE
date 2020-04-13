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
    const { item, onItemClick } = props;
    const classes = useStyles();
    const { search_id,
            format,
            item_name,
            short_description } = item;

    return (
        <ListItem className={classes.listItem} divider={true} onClick={() => onItemClick(search_id)}>
            <ListItemText className={classes.format} primary={`${format}`} />
            <ListItemAvatar>
                <Avatar
                    alt={`${item_name}-image`}
                    variant="square"
                    className={classes.avi}
                    src={getItemImage(search_id)} />
            </ListItemAvatar>
            <ListItemText className={classes.name} primary={`${item_name}`} />
            <ListItemText className={classes.description} primary={`${short_description}`} />
        </ListItem>
    )
};