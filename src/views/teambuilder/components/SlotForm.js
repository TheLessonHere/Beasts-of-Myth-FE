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
    image: {
        height: "120px",
        width: "120px"
    }
}))

export default function SlotForm(props){
    const { beast,
            returnDomains,
            chooseItem,
            onItemSearch,
            fillInMove,
            onMoveSearch } = props;
    const classes = useStyles();
    const [lusterChecked, setLusterChecked] = useState(false);

    const searchId = beast.beast_name.toLowerCase();

    const beastImage = getBeastImage(searchId);

    return (
        <Container>
            <Box>
                <Typography variant="h3">{beast.beast_name}</Typography>
                <img className={classes.image} src={beastImage} alt={`${beast.beast_name}-image`}/>
                <Typography variant="h5">{beast.format}</Typography>
            </Box>
            <Box>
                <FormGroup>
                    <Typography variant="h4">{returnDomains(beast.domain1, beast.domain2)}</Typography>
                    <TextField onClick={chooseItem} onChange={onItemSearch} label="Item"/>
                    {/* Add info window on hover for the ability */}
                    <Typography variant="h4">{beast.ability}</Typography>
                    <FormControlLabel control={
                        <Switch size="small"
                        checked={lusterChecked}
                        onChange={() => setLusterChecked(!lusterChecked)}
                        disabled={true} />}
                        label="Luster" />
                    <Box>
                        <Typography variant="subtitle1">HP: {beast.init_hp}</Typography>
                        <Typography variant="subtitle1">PA: {beast.init_pa}</Typography>
                        <Typography variant="subtitle1">PD: {beast.init_pd}</Typography>
                        <Typography variant="subtitle1">MA: {beast.init_ma}</Typography>
                        <Typography variant="subtitle1">MD: {beast.init_md}</Typography>
                        <Typography variant="subtitle1">SC: {beast.init_sc}</Typography>
                    </Box>
                </FormGroup>
            </Box>
            <Box>
                <FormGroup>
                    <FormLabel>Moves</FormLabel>
                    <TextField id="move1" onClick={fillInMove} onChange={onMoveSearch} label="Move 1" />
                    <TextField id="move2" onClick={fillInMove} onChange={onMoveSearch} label="Move 2" />
                    <TextField id="move3" onClick={fillInMove} onChange={onMoveSearch} label="Move 3" />
                    <TextField id="move4" onClick={fillInMove} onChange={onMoveSearch} label="Move 4" />
                </FormGroup>
            </Box>
        </Container>
    )
}