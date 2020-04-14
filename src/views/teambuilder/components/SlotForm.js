import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    FormLabel,
    FormControlLabel,
    FormGroup,
    Switch
} from "@material-ui/core";
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
            move4 } = props;
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
                <FormGroup>
                    <Typography className={classes.text} variant="h6">Domain: {returnDomains(beast.domain1, beast.domain2)}</Typography>
                    <TextField className={classes.item} value={item} onClick={chooseItem} onChange={onItemSearch} label="Item"/>
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
                </FormGroup>
            </Box>
            <Box className={classes.formColumn}>
                <FormGroup>
                    <FormLabel>Moves</FormLabel>
                    <TextField  value={move1}
                                id="move1"
                                variant="outlined"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <TextField  value={move2}
                                id="move2"
                                variant="outlined"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <TextField  value={move3}
                                id="move3"
                                variant="outlined"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                    <TextField  value={move4}
                                id="move4"
                                variant="outlined"
                                onClick={fillInMove}
                                onChange={onMoveSearch}
                                className={classes.move} />
                </FormGroup>
            </Box>
        </Container>
    )
}