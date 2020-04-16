import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTeams, deleteTeam } from '../../actions';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Button
    } from "@material-ui/core";

// Components
import TeamNav from './components/TeamNav';
import ImportFromText from './components/ImportFromText';
import EditingTeamNav from './components/EditingTeamNav';
import { SubmitButton } from '../../utils/components/SubmitButton';
// Libraries
import { beasts } from '../../data/libraries/BeastLibrary';
import { moves } from '../../data/libraries/MoveLibrary';
import { items } from '../../data/libraries/ItemLibrary';
import { abilities } from '../../data/libraries/AbilityLibrary';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "lightgrey",
        height: "800px",
        padding: "20px",
        borderRadius: "5px"
    },
}))

const allLibraries = beasts.concat(moves, abilities);

function TeamBuilder(props) {
  const classes = useStyles();
  const [isBuilding, setIsBuilding] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [teamSelected, setTeamSelected] = useState(null);

  useEffect(() => {
    props.fetchTeams(props.id);
    setTeamSelected(null);
  }, [ isReturning, props.id, props.last_created_team ])

  useEffect(() => {
    return;
  }, [ isBuilding, isImporting, isEditing ])

  const startBuilding = () => {
    setIsBuilding(true);
  }

  const stopBuilding = () => {
    setIsBuilding(false);
  }

  const startImporting = () => {
    setIsImporting(true);
  }

  const stopImporting = () => {
    setIsImporting(false);
  }

  const startEditing = (team) => {
    if(team === null){
      setTeamToEdit(teamSelected);
    } else {
      setTeamToEdit(team);
    }
    setIsEditing(true);
  }

  const stopEditing = () => {
    setTeamToEdit(null);
    setIsEditing(false);
  }

  if(isBuilding){
    return (
      <Container className={classes.container}>
        <TeamNav
        allLibraries={allLibraries}
        items={items}
        stopBuilding={stopBuilding}
        isReturning={isReturning}
        setIsReturning={setIsReturning} />
      </Container>
    )
  }

  if(isEditing){
    return (
      <Container className={classes.container}>
        <EditingTeamNav
        allLibraries={allLibraries}
        item={items}
        stopEditing={stopEditing}
        isReturning={isReturning}
        setIsReturning={setIsReturning}
        team={teamToEdit} />
      </Container>
    )
  }

  if(isImporting){
    return (
      <Container className={classes.container}>
        <ImportFromText
        stopImporting={stopImporting}
        startEditing={startEditing} />
      </Container>
    )
  }

  return (
    <Container className={classes.container}>
      <SubmitButton onClick={startBuilding}>Build New Team</SubmitButton>
      <SubmitButton onClick={startImporting}>Import From Text</SubmitButton>
      <SubmitButton disabled={!teamSelected} onClick={() => {startEditing(teamToEdit)}}>Edit Team</SubmitButton>
      <SubmitButton disabled={!teamSelected} onClick={() => {props.deleteTeam(teamSelected)}}>Delete Team</SubmitButton>
    </Container>
  );
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, { fetchTeams, deleteTeam })(TeamBuilder)