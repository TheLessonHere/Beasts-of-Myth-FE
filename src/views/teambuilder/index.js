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
import TeamMiniBox from "./components/TeamMiniBox";
import { SubmitButton } from '../../utils/components/SubmitButton';
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
        width: "40%"
    }
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
  const [userTeams, setUserTeams] = useState([]);

  useEffect(() => {
    props.fetchTeams(props.id);
    setTeamSelected(null);
  }, [ isReturning, props.id, props.last_created_team ])

  useEffect(() => {
    if(props.user_teams.length > 0){
      const teams = props.user_teams.map(team => {
        const teamClassObject = new Team('Unrestricted', 'Team');
        teamClassObject.fillInTeamFromString(team.team_datastring);
        return {
          team_id: team.team_id,
          team_object: teamClassObject
        };
      });
      console.log(teams);
      setUserTeams(teams);
    }
    setTeamSelected(null);
  }, [ props.user_teams ])

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

  const onMiniBoxClick = (teamObject) => {
    setTeamSelected(teamObject);
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
    <Container className={classes.defaultContainer}>
      <List className={classes.miniBoxList}>
        {userTeams.length > 0 ?
        userTeams.map(team => {
        return <ListItem component="div" key={`${team.team_id}`} onClick={() => {onMiniBoxClick(team.team_object)}}>
                  <TeamMiniBox team={team} />
               </ListItem>
        }) :
          <Typography align="center">No Teams Found</Typography>}
      </List>
      <Box className={classes.buttonBox}>
        <SubmitButton onClick={startBuilding}>Build New Team</SubmitButton>
        <SubmitButton onClick={startImporting}>Import From Text</SubmitButton>
        <SubmitButton disabled={!teamSelected} onClick={() => {startEditing(teamToEdit)}}>Edit Team</SubmitButton>
        <SubmitButton disabled={!teamSelected} onClick={() => {props.deleteTeam(teamSelected.team_id)}}>Delete Team</SubmitButton>
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