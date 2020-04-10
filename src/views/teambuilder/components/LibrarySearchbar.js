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
// Components
import SortRow from './SortRow';
import BeastRow from './BeastRow';

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

    const fakeFunction = (event) => {
        console.log(event.target);
    }

    const renderResult = () => {
        if (suggestions.length > 0){
            const matchingObjs = suggestions.map(obj => {
                if (obj.data_type === "Beast"){
                    return (<BeastRow
                            key={obj.search_id}
                            listItemClass={classes.listItem}
                            searchId={obj.search_id}
                            format={obj.format}
                            name={obj.beast_name}
                            domain1={obj.domain1}
                            domain2={obj.domain2}
                            ability={obj.ability}
                            hp={obj.hp}
                            pa={obj.pa}
                            pd={obj.pd}
                            ma={obj.ma}
                            md={obj.md}
                            sc={obj.sc} />
                    )}
                else if (obj.data_type === "Move"){
                    return (<ListItem key={obj.search_id} className={classes.listItem} divider={true}>
                                <ListItemText primary={obj.move_name} />
                            </ListItem>
                    )}
                else if (obj.data_type === "Ability"){
                    return (<ListItem key={obj.search_id} className={classes.listItem} divider={true}>
                                <ListItemText primary={obj.ability_name} />
                            </ListItem>
                    )} else {
                    return (<ListItem className={classes.listItem} divider={true}>
                                <ListItemText primary={"No Matching Data"} />
                            </ListItem>
                    )}
            })
            return matchingObjs;
        } else {
            return (<ListItem className={classes.listItem} divider={true}>
                        <ListItemText primary={"No Matching Data"} />
                    </ListItem>
            )}
    };

    if(defaultRender){
        return (
            <Container>
                <TextField onChange={onSearchChange} label="Beast/Move/Ability" />
                <SortRow sortDomain={fakeFunction}
                    sortHP={fakeFunction}
                    sortPA={fakeFunction}
                    sortPD={fakeFunction}
                    sortMA={fakeFunction}
                    sortMD={fakeFunction}
                    sortSC={fakeFunction} />
                <List className={classes.list}>
                    {allLibraries.map(obj => {
                        if (obj.data_type === "Beast"){
                            return (<BeastRow
                                key={obj.search_id}
                                listItemClass={classes.listItem}
                                searchId={obj.search_id}
                                format={obj.format}
                                name={obj.beast_name}
                                domain1={obj.domain1}
                                domain2={obj.domain2}
                                ability={obj.ability}
                                hp={obj.hp}
                                pa={obj.pa}
                                pd={obj.pd}
                                ma={obj.ma}
                                md={obj.md}
                                sc={obj.sc} />
                            )}
                    })}
                </List>
            </Container>
        )
    }

    return (
        <Container>
            <TextField onChange={onSearchChange} label="Beast/Move/Ability" />
            <List className={classes.list}>
                {renderResult()}
            </List>
        </Container>
    )
}