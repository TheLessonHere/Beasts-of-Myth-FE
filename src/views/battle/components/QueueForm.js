import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Typography,
    Box,
    FormLabel,
    FormControl,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel,
    CircularProgress
} from "@material-ui/core";
// Components
import TeamMicroBox from '../../../utils/components/TeamMicroBox';
import { SubmitButton } from '../../../utils/components/SubmitButton';

const useStyles = makeStyles(theme => ({
    container: {
        width: "45%",
        height: "100%",
    },
    formBox: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        width: "96%",
        height: "50%",
        marginRight: "4%",
        padding: "20px",
        background: "white",
        boxShadow: "2px 2px 5px black",
        borderRadius: "10px",
        border: "1px solid black"
    },
    formControl: {
        maxWidth: "90%",
        width: "100%",
        marginTop: "20px"
    },
    teamHeader: {
        alignSelf: "flex-start",
        marginLeft: "2%",
        marginTop: "10px"
    },
    microBox: {
        maxWidth: "96%",
        width: "100%",
        height: "150px",
        marginLeft: "2%",
        marginRight: "2%",
        marginBottom: "15px",
        background: "darkgrey",
        padding: "10px",
        borderRadius: "5px",
    },
    noTeamText: {
        marginTop: "55px"
    }
  }));

export default function QueueForm(props) {
    const { format, handleFormatChange, team } = props;
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Box className={classes.formBox}>
                <Typography variant="h5">Find a battle here!</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel id="queue-format-select-label">Format</InputLabel>
                    <Select
                        labelId="queue-format-select-label"
                        id="queue-format-select"
                        value={format}
                        autoWidth={true}
                        onChange={handleFormatChange}>
                        <MenuItem value={'Unrestricted'}>Unrestricted</MenuItem>
                    </Select>
                </FormControl>
                <Typography className={classes.teamHeader} variant="subtitle1">Team Selected:</Typography>
                <Box className={classes.microBox}>
                    {team ?
                    <TeamMicroBox team={team} /> :
                    <Typography variant="subtitle2" className={classes.noTeamText} align="center">No Team Selected</Typography>}
                </Box>
                <SubmitButton>Search</SubmitButton>
            </Box>
        </Container>
    )
}