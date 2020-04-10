import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    list: {
        maxHeight: "100%",
        overflow: 'auto'
    },
    listItem: {
        background: "lightgrey"
    }
}));

export default function LibrarySearchbar(props){
    const { allLibraries } = props;
    const classes = useStyles();
    const [suggestions, setSuggestions] = useState([]);
    const [defaultRender, setDefaultRender] = useState(true);

    useEffect(() => {
        if (suggestions.length > 0) {
            setDefaultRender(false)
        } else {
            setDefaultRender(true)
        }
    }, [ suggestions ])

    const onSearchChange = (event) => {
        const value = event.target.value;
        let currSuggestions = [];
        if (value.length > 0){
            const regex = new RegExp(`${value}`, 'i');
            currSuggestions = allLibraries.sort().filter(obj => {
                const searchId = obj.search_id;
                return regex.test(searchId);
            });
        }
        setSuggestions(currSuggestions);
    }

    const renderResult = () => {
        if (suggestions.length > 0){
            const matchingObjs = suggestions.map(obj => {
                if (obj.data_type === "Beast"){
                    return (<ListItem key={obj.search_id} className={classes.listItem}>
                                <ListItemText primary={obj.beast_name} />
                            </ListItem>
                    )}
                else if (obj.data_type === "Move"){
                    return (<ListItem key={obj.search_id} className={classes.listItem}>
                                <ListItemText primary={obj.move_name} />
                            </ListItem>
                    )}
                else if (obj.data_type === "Ability"){
                    return (<ListItem key={obj.search_id} className={classes.listItem}>
                                <ListItemText primary={obj.ability_name} />
                            </ListItem>
                    )} else {
                    return (<ListItem className={classes.listItem}>
                                <ListItemText primary={"No Matching Data"} />
                            </ListItem>
                    )}
            })
            return matchingObjs;
        } else {
            return (<ListItem className={classes.listItem}>
                        <ListItemText primary={"No Matching Data"} />
                    </ListItem>
            )}
    };

    if(defaultRender){
        return (
            <div>
                <TextField onChange={onSearchChange} />
                <List className={classes.list}>
                    {allLibraries.map(obj => {
                        if (obj.data_type === "Beast"){
                            return (<ListItem key={obj.search_id} className={classes.listItem}>
                                        <ListItemText primary={obj.beast_name} />
                                    </ListItem>
                            )}
                    })}
                </List>
            </div>
        )
    }

    return (
        <div>
            <TextField onChange={onSearchChange} />
            <List className={classes.list}>
                {renderResult()}
            </List>
        </div>
    )
}