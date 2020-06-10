import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTeams, deleteTeam } from '../../actions';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    CircularProgress
    } from "@material-ui/core";

// Components
import TeamNav from './components/TeamNav';
import ImportFromText from './components/ImportFromText';
import EditingTeamNav from './components/EditingTeamNav';
import TeamMiniBox from "../../utils/components/TeamMiniBox";
import { SubmitButton } from '../../utils/components/SubmitButton';
// Functions
import copyToClipboard from '../../utils/functions/copyToClipboard';
// Libraries
import { beasts } from '../../data/libraries/BeastLibrary';
import { moves } from '../../data/libraries/MoveLibrary';
import { items } from '../../data/libraries/ItemLibrary';
import { abilities } from '../../data/libraries/AbilityLibrary';
// Classes
import Team from '../../classes/Team';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "lightgrey",
        height: "800px",
        padding: "20px",
        borderRadius: "5px"
    },
    defaultContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        backgroundColor: "lightgrey",
        height: "800px",
        padding: "20px",
        borderRadius: "5px"
    },
    miniBoxList: {
        width: "60%",
        height: "100%",
        backgroundColor: "darkgrey",
        overflow: "scroll"
    },
    buttonBox: {
        display: "flex",
        flexFlow: "column nowrap",
        width: "40%",
        height: "50%"
    },
    button: {
      display: "flex",
      marginTop: "20px"
    }
}))

function TeamBuilder(props) {
  const classes = useStyles();
  const allLibraries = beasts.concat(moves, abilities);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [teamToEditId, setTeamToEditId] = useState(null);
  const [teamSelected, setTeamSelected] = useState(null);
  const [teamSelectedId, setTeamSelectedId] = useState(null);

  useEffect(() => {
    props.fetchTeams(props.id);
    setTeamSelected(null);
    setTeamSelectedId(null);
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
      setTeamToEditId(teamSelectedId);
    } else {
      setTeamToEdit(team);
    }
    setIsEditing(true);
  }

  const stopEditing = () => {
    setTeamToEdit(null);
    setIsEditing(false);
  }

  const onMiniBoxClick = (team) => {
    setTeamSelected(team.team_object);
    setTeamSelectedId(team.team_id);
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
        items={items}
        stopEditing={stopEditing}
        isReturning={isReturning}
        setIsReturning={setIsReturning}
        team={teamToEdit}
        teamId={teamToEditId} />
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
    <Container className={classes.defaultContainer}>
      <List className={classes.miniBoxList}>
        {props.team_objects.length > 0 ?
        props.team_objects.map(team => {
        return <ListItem component="div" key={`${team.team_id}`} onClick={() => {onMiniBoxClick(team)}}>
                  <TeamMiniBox team={team} />
               </ListItem>
        }) :
          <Typography align="center">No Teams Found</Typography>}
      </List>
      <Box className={classes.buttonBox}>
        <SubmitButton className={classes.button} onClick={startBuilding}>Build New Team</SubmitButton>
        <SubmitButton className={classes.button} onClick={startImporting}>Import From Text</SubmitButton>
        <SubmitButton className={classes.button} disabled={!teamSelected} onClick={() => {copyToClipboard(teamSelected)}}>Copy Team</SubmitButton>
        <SubmitButton className={classes.button} disabled={!teamSelected} onClick={() => {startEditing(teamToEdit)}}>Edit Team</SubmitButton>
        <SubmitButton className={classes.button} disabled={!teamSelected} onClick={() => {props.deleteTeam(teamSelectedId)}}>Delete Team</SubmitButton>
      </Box>
    </Container>
  );
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, { fetchTeams, deleteTeam })(TeamBuilder)