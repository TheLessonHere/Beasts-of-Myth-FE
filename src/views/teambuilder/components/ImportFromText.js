import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import {
    Container,
    Typography,
    Box,
    TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Classes
import Team from '../../../classes/Team';

function ImportFromText(props){
    const { stopImporting } = props;
    const [value, setValue] = useState("");
    const [currentTeam, setCurrentTeam] = useState({});

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    }

    const runImport = () => {
        const team = new Team("Standard", "Team1");
        team.fillInTeamFromString(value);
        setCurrentTeam(team);
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

    return (
        <div className="container">
            <form>
                <TextField value={value} onChange={handleChange} multiline={true} rows={25}/>
                <button type="submit" onClick={runImport}>Import Team</button>
                <button onClick={saveTeam}>Save Team</button>
                <button onClick={stopImporting}>Cancel</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, {})(ImportFromText)