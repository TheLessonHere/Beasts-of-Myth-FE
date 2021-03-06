import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    FormLabel,
    FormControl,
    FormControlLabel,
    Switch
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from "@material-ui/core/styles";
import { getBeastImage } from '../../../utils/functions/getBeastImage';

const useStyles = makeStyles(theme => ({
    container: {
        height: "50%",
        width: "100%",
        margin: "auto",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
    },
    formColumn: {
        width: "32%",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "10px",
        border: "1px solid darkgrey",
        background: "lightgrey"
    },
    item: {
        marginTop: "10px",
        marginBottom: "10px",
        background: "whitesmoke"
    },
    disabledItem: {
        marginTop: "10px",
        marginBottom: "10px",
        background: "grey"
    },
    statBox: {
        display: "flex",
        flexFlow: "column nowrap"
    },
    stats: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignItems: "center"
    },
    move: {
        background: "whitesmoke",
        border: "1px solid darkgrey",
        borderRadius: "5px"
    },
    text: {
        textAlign: "center"
    },
    image: {
        height: "170px",
        width: "170px"
    },
    switch: {
        alignSelf: "center"
    },
    clearButton: {
        color: "darkred",
        border: "1px solid darkred",
        borderRadius: "5px",
        marginLeft: "5px",
        "&:hover": {
            color: "lightgrey",
            border: "1px solid lightgrey",
            background: "darkred",
            cursor: "pointer"
        }
    },
    disabledClearButton: {
        color: "grey",
        border: "1px solid grey",
        borderRadius: "5px",
        marginLeft: "5px"
    }
}))

export default function SlotForm(props){
    const { beast,
            returnDomains,
            chooseItem,
            onItemSearch,
            fillInMove,
            onMoveSearch,
            item,
            move1,
            move2,
            move3,
            move4,
            clearItem,
            clearMove } = props;
    const classes = useStyles();
    const [lusterChecked, setLusterChecked] = useState(false);

    const searchId = beast.beast_name.toLowerCase();

    const beastImage = getBeastImage(searchId);

    let disableItemRemove = false;
    let disableItemSearch = false;

    if(beast.item && beast.item.item_name === "Super Crystal"){
        disableItemRemove = true;
        disableItemSearch = true;
    }

    return (
        <Container className={classes.container}>
            <Box className={classes.formColumn}>
                <Typography variant="h4">{beast.beast_name}</Typography>
                <img className={classes.image} src={beastImage} alt={beast.beast_name}/>
                <Typography variant="h6">{beast.format}</Typography>
            </Box>
            <Box className={classes.formColumn}>
                    <Typography className={classes.text} variant="h6">Domain: {returnDomains(beast.domain1, beast.domain2)}</Typography>
                    <Box className={classes.stats}>
                        <FormControl autoComplete="new-password">
                        <TextField
                        className={disableItemSearch ? classes.disabledItem : classes.item}
                        value={beast.item ? beast.item.item_name : item}
                        autoComplete="off"
                        disabled={disableItemSearch}
                        onClick={chooseItem}
                        onChange={onItemSearch}
                        label="Item"/>
                        </FormControl>
                        <ClearIcon
                        className={disableItemRemove ? classes.disabledClearButton : classes.clearButton}
                        disabled={disableItemRemove} onClick={clearItem} />
                    </Box>
                    {/* Add info window on hover for the ability */}
                    <Typography className={classes.text} variant="h6">Ability: {beast.ability}</Typography>
                    <FormControlLabel control={
                        <Switch size="small"
                        checked={lusterChecked}
                        onChange={() => setLusterChecked(!lusterChecked)}
                        disabled={true} />}
                        className={classes.switch}
                        label="Luster" />
                    <Box className={classes.statBox}>
                        <div>
                        <Typography variant="subtitle1">Stats:</Typography>
                        </div>
                        <div className={classes.stats}>
                        <Typography variant="subtitle2">| HP: {beast.init_hp} |</Typography>
                        <Typography variant="subtitle2">| PA: {beast.init_pa} |</Typography>
                        <Typography variant="subtitle2">| PD: {beast.init_pd} |</Typography>
                        <Typography variant="subtitle2">| MA: {beast.init_ma} |</Typography>
                        <Typography variant="subtitle2">| MD: {beast.init_md} |</Typography>
                        <Typography variant="subtitle2">| SC: {beast.init_sc} |</Typography>
                        </div>
                    </Box>
            </Box>
            <Box className={classes.formColumn}>
                <FormControl autoComplete="new-password">
                    <FormLabel>Moves</FormLabel>
                    <Box className={classes.stats}>
                    <TextField  value={move1}
                                id="move1"
                                variant="outlined"
                                autoComplete="off"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <ClearIcon className={classes.clearButton} onClick={() => clearMove('move1')} />
                    </Box>
                    <Box className={classes.stats}>
                    <TextField  value={move2}
                                id="move2"
                                variant="outlined"
                                autoComplete="off"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <ClearIcon className={classes.clearButton} onClick={() => clearMove('move2')} />
                    </Box>
                    <Box className={classes.stats}>
                    <TextField  value={move3}
                                id="move3"
                                variant="outlined"
                                autoComplete="off"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <ClearIcon className={classes.clearButton} onClick={() => clearMove('move3')} />
                    </Box>
                    <Box className={classes.stats}>
                    <TextField  value={move4}
                                id="move4"
                                variant="outlined"
                                autoComplete="off"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <ClearIcon className={classes.clearButton} onClick={() => clearMove('move4')} />
                    </Box>
                </FormControl>
            </Box>
        </Container>
    )
}