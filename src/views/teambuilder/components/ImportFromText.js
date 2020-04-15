import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { postTeam } from '../../../actions';
import { axiosWithAuth } from '../../../utils/functions/axiosWithAuth';
import {
    Container,
    Typography,
    FormControl,
    Box,
    TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Functions
import validateTeam from '../../../utils/functions/validateTeam';
// Components
import { SubmitButton } from '../../../utils/components/SubmitButton';
// Classes
import Team from '../../../classes/Team';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "auto",
        marginTop: "30px"
    },
    formBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "50%",
        margin: "0 auto"
    },
    form: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    textField: {
        width: "75%",
        height: "25%"
    },
    buttonBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "row nowrap",
        width: "75%",
        height: "15%",
        marginTop: "20px"
    }
}))

function ImportFromText(props){
    const { stopImporting, setIsEditing, isEditing, setTeamToEdit } = props;
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [currentTeam, setCurrentTeam] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    }

    const runImport = () => {
        const team = new Team("Unrestricted", "Team1");
        team.fillInTeamFromString(value);
        setCurrentTeam(team);
        validateTeam(team.format,
                    team.slot1.beast,
                    team.slot2.beast,
                    team.slot3.beast,
                    team.slot4.beast,
                    team.slot5.beast,
                    setIsValid);
        console.log(team);
    }

    const saveTeam = () => {
        const teamDatastring = currentTeam.convertToString();
        axiosWithAuth()
        .post(`http://localhost:5000/api/teams/${props.user_id}`, teamDatastring)
        .then(res => {
            console.log(res.data, "Team Saved.");
        })
        .catch(err => {
            console.log(err);
        })
    }

    // Add in a link to a page explaining the teamstring format at the bottom
    return (
        <Container className={classes.container}>
            <Box className={classes.formBox}>
                <FormControl className={classes.form} autoComplete="new-password">
                    <TextField
                    className={classes.textField}
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                    variant="filled"
                    multiline={true}
                    rows={15}
                    label="Paste your team string here:" />
                </FormControl>
            </Box>
            <Box className={classes.buttonBox}>
                <SubmitButton type="submit" onClick={runImport}>Import Team</SubmitButton>
                <SubmitButton onClick={saveTeam} disabled={!isValid}>Save Team</SubmitButton>
                <SubmitButton onClick={stopImporting}>Cancel</SubmitButton>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, { postTeam })(ImportFromText)