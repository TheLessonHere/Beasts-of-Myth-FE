import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    FormControlLabel,
    FormGroup,
    Switch
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getBeastImage } from '../../../utils/getBeastImage';

export default function SlotForm(props){
    const { beast,
            returnDomains,
            chooseItem,
            onItemSearch,
            fillInMove,
            onMoveSearch } = props;

    const [lusterChecked, setLusterChecked] = useState(false);

    return (
        <Container>
            <Box>
                <Typography variant="h3">{currBeast.beast_name}</Typography>
                <img src={getBeastImage(beast.search_id)} alt={`${currBeast.beast_name}-image`}/>
                <Typography variant="h5">{currBeast.format}</Typography>
            </Box>
            <Box>
                <FormGroup>
                    <Typography variant="h4">{returnDomains(currBeast.domain1, currBeast.domain2)}</Typography>
                    <TextField onClick={chooseItem} onChange={onItemSearch} label="Item"/>
                    {/* Add info window on hover for the ability */}
                    <Typography variant="h4">{currBeast.ability}</Typography>
                    <FormControlLabel control={
                        <Switch size="small"
                        checked={lusterChecked}
                        onChange={setLusterChecked(!lusterChecked)}
                        disabled={true} />}
                        label="Luster" />
                    <Box>
                        <Typography variant="subtitle1">HP: {currBeast.init_hp}</Typography>
                        <Typography variant="subtitle1">PA: {currBeast.init_pa}</Typography>
                        <Typography variant="subtitle1">PD: {currBeast.init_pd}</Typography>
                        <Typography variant="subtitle1">MA: {currBeast.init_ma}</Typography>
                        <Typography variant="subtitle1">MD: {currBeast.init_md}</Typography>
                        <Typography variant="subtitle1">SC: {currBeast.init_sc}</Typography>
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