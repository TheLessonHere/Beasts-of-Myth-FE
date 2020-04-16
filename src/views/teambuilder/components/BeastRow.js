import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getBeastImage } from '../../../utils/functions/getBeastImage';

const useStyles = makeStyles(theme => ({
    format: {
        flex: "initial",
        width: "100px",
        marginLeft: "0",
        marginRight: "0"
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
    domains: {
        textAlign: "left",
        width: "80px",
        marginLeft: "10px",
        marginRight: "40px"
    },
    ability: {
        textAlign: "left",
        width: "120px",
        marginLeft: "10px",
        marginRight: "55px"
    },
    stat: {
        width: "10px",
        textAlign: "right",
        marginLeft: "5px",
        marginRight: "10px"
    },
}))

export default function BeastRow(props){
    const { listItemClass, returnDomains, beast, onBeastClick } = props;
    const classes = useStyles();
    const { search_id,
            format,
            beast_name,
            domain1,
            domain2,
            ability,
            hp,
            pa,
            pd,
            ma,
            md,
            sc } = beast;

    const searchId = beast.beast_name.toLowerCase();

    return (
        <ListItem className={listItemClass} divider={true} onClick={() => onBeastClick(searchId)}>
            <ListItemText className={classes.format} primary={`${format}`} />
            <ListItemAvatar>
                <Avatar
                    alt={`${beast_name}-image`}
                    variant="square"
                    className={classes.avi}
                    src={getBeastImage(search_id)} />
            </ListItemAvatar>
            <ListItemText className={classes.name} primary={`${beast_name}`} />
            <ListItemText className={classes.domains} primary={returnDomains(domain1, domain2)} />
            <ListItemText className={classes.ability} primary={`${ability}`} />
            <ListItemText className={classes.stat} primary={`${hp}`} />
            <ListItemText className={classes.stat} primary={`${pa}`} />
            <ListItemText className={classes.stat} primary={`${pd}`} />
            <ListItemText className={classes.stat} primary={`${ma}`} />
            <ListItemText className={classes.stat} primary={`${md}`} />
            <ListItemText className={classes.stat} primary={`${sc}`} />
        </ListItem>
    )
};