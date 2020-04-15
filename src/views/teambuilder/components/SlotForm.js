import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    FormLabel,
    FormControlLabel,
    Switch
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from "@material-ui/core/styles";
import { getBeastImage } from '../../../utils/getBeastImage';

const useStyles = makeStyles(theme => ({
    container: {
        height: "50%",
        width: "100%",
        margin: "auto",
        paddingLeft: "2%",
        paddingRight: "2%",
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

    return (
        <Container className={classes.container}>
            <Box className={classes.formColumn}>
                <Typography variant="h4">{beast.beast_name}</Typography>
                <img className={classes.image} src={beastImage} alt={`${beast.beast_name}-image`}/>
                <Typography variant="h6">{beast.format}</Typography>
            </Box>
            <Box className={classes.formColumn}>
                    <Typography className={classes.text} variant="h6">Domain: {returnDomains(beast.domain1, beast.domain2)}</Typography>
                    <Box className={classes.stats}>
                        <TextField className={classes.item} value={item} onClick={chooseItem} onChange={onItemSearch} label="Item"/>
                        <ClearIcon className={classes.clearButton} onClick={clearItem} />
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
                    <FormLabel>Moves</FormLabel>
                    <Box className={classes.stats}>
                    <TextField  value={move1}
                                id="move1"
                                variant="outlined"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <ClearIcon className={classes.clearButton} onClick={() => clearMove('move1')} />
                    </Box>
                    <Box className={classes.stats}>
                    <TextField  value={move2}
                                id="move2"
                                variant="outlined"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <ClearIcon className={classes.clearButton} onClick={() => clearMove('move2')} />
                    </Box>
                    <Box className={classes.stats}>
                    <TextField  value={move3}
                                id="move3"
                                variant="outlined"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <ClearIcon className={classes.clearButton} onClick={() => clearMove('move3')} />
                    </Box>
                    <Box className={classes.stats}>
                    <TextField  value={move4}
                                id="move4"
                                variant="outlined"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <ClearIcon className={classes.clearButton} onClick={() => clearMove('move4')} />
                    </Box>
            </Box>
        </Container>
    )
}