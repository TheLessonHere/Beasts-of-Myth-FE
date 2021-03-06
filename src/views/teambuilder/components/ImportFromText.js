import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
    const { stopImporting, startEditing } = props;
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [team, setTeam] = useState({})
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(isValid){
            startEditing(team);
            stopImporting()
        }
    }, [ isValid ])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const runEditor = () => {
        const newTeam = new Team("Unrestricted", "Team1");
        newTeam.fillInTeamFromString(value);
        setTeam(newTeam);
        validateTeam(newTeam.format,
                    newTeam.slot1.beast,
                    newTeam.slot2.beast,
                    newTeam.slot3.beast,
                    newTeam.slot4.beast,
                    newTeam.slot5.beast,
                    setIsValid);
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
                <SubmitButton type="submit" onClick={runEditor}>Import Team</SubmitButton>
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

export default connect(mapStateToProps, { })(ImportFromText)