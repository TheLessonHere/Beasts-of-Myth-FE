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
    container: {
        height: "450px"
    },
    list: {
        maxHeight: "100%",
        overflow: 'scroll'
    },
    listItem: {
        background: "lightgrey"
    },
    listItemHeader: {
        background: "darkgrey"
    }
}));

export default function LibrarySearchbar(props){
    const { allLibraries, returnDomains, onBeastClick } = props;
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
            let beastCounter = 0;
            let moveCounter = 0;
            let abilityCounter = 0;
            const matchingObjs = suggestions.map(obj => {
                if (obj.data_type === "Beast"){
                    if(beastCounter === 0){
                        beastCounter++;
                        return(
                            <>
                                <ListItem key="beast-header" className={classes.listItemHeader} divider={true}>
                                    <ListItemText primary="Beasts" />
                                </ListItem>
                                <BeastRow
                                key={obj.search_id}
                                listItemClass={classes.listItem}
                                returnDomains={returnDomains}
                                beast={obj}
                                onBeastClick={onBeastClick} />
                            </>
                        )} else {
                            return (<BeastRow
                                key={obj.search_id}
                                listItemClass={classes.listItem}
                                returnDomains={returnDomains}
                                beast={obj}
                                onBeastClick={onBeastClick} />
                        )}}
                else if (obj.data_type === "Move"){
                    if(moveCounter === 0){
                        moveCounter++;
                        return (
                        <>
                            <ListItem key="move-header" className={classes.listItemHeader} divider={true}>
                                <ListItemText primary="Moves" />
                            </ListItem>
                            <ListItem key={obj.search_id} className={classes.listItem} divider={true}>
                                <ListItemText primary={obj.move_name} />
                            </ListItem>
                        </>
                        )} else {
                        return (
                        <ListItem key={obj.search_id} className={classes.listItem} divider={true}>
                            <ListItemText primary={obj.move_name} />
                        </ListItem>
                        )}}
                else if (obj.data_type === "Ability"){
                    if(abilityCounter === 0){
                        abilityCounter++;
                        return (
                        <>
                            <ListItem key="ability-header" className={classes.listItemHeader} divider={true}>
                                <ListItemText primary="Abilities" />
                            </ListItem>
                            <ListItem key={obj.search_id} className={classes.listItem} divider={true}>
                                <ListItemText primary={obj.ability_name} />
                            </ListItem>
                        </>
                        )} else {
                        return (
                        <ListItem key={obj.search_id} className={classes.listItem} divider={true}>
                            <ListItemText primary={obj.ability_name} />
                        </ListItem>
                        )}}
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
            <Container className={classes.container}>
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
                                returnDomains={returnDomains}
                                beast={obj}
                                onBeastClick={onBeastClick} />
                            )}
                    })}
                </List>
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            <TextField onChange={onSearchChange} label="Beast/Move/Ability" />
            <SortRow sortDomain={fakeFunction}
                    sortHP={fakeFunction}
                    sortPA={fakeFunction}
                    sortPD={fakeFunction}
                    sortMA={fakeFunction}
                    sortMD={fakeFunction}
                    sortSC={fakeFunction} />
            <List className={classes.list}>
                {renderResult()}
            </List>
        </Container>
    )
}