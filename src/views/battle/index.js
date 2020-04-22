import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import { createTeamObjects } from '../../actions';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    List,
    ListItem,
    Box,
    Typography,
    CircularProgress
    } from "@material-ui/core";
// Components
import TeamMiniBox from '../../utils/components/TeamMiniBox';
import QueueForm from './components/QueueForm';
// Socket
import io from 'socket.io-client';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexFlow: "row nowrap",
        backgroundColor: "lightgrey",
        height: "800px",
        padding: "20px",
        borderRadius: "5px",
    },
    miniBoxList: {
        width: "55%",
        height: "100%",
        backgroundColor: "darkgrey",
        overflow: "scroll"
    }
}))

function Battle(props) {
  const classes = useStyles();
  const [isSearching, setIsSearching] = useState(false);
  const [isBattling, setIsBattling] = useState(false);
  const [format, setFormat] = useState('Unrestricted');
  const [teamSelected, setTeamSelected] = useState(null);
  const [teamSelectedId, setTeamSelectedId] = useState(null);

  useEffect(() => {
    props.createTeamObjects(props.user_teams);
    setTeamSelected(null);
    setTeamSelectedId(null);
  }, [ props.user_teams ])

  useEffect(() => {
    setTeamSelected(null);
    setTeamSelectedId(null);
  }, [ format ])

  const onMiniBoxClick = (team) => {
    setTeamSelected(team.team_object);
    setTeamSelectedId(team.team_id);
  }

  const handleFormatChange = (event) => {
      setFormat(event.target.value);
  }

  if(isSearching){
      return (
          // Loading component here
          null
      )
  }

  if(isBattling){
      return (
          // Load BattleRoom
          null
      )
  }

  return (
    <Container className={classes.container}>
      <QueueForm
        format={format}
        handleFormatChange={handleFormatChange}
        team={teamSelected}
        teamId={teamSelectedId} />
      <List className={classes.miniBoxList}>
        {props.team_objects.length > 0 ?
        props.team_objects.map(team => {
        if(team.team_object.format === format){
            return <ListItem component="div" key={`${team.team_id}`} onClick={() => {onMiniBoxClick(team)}}>
                        <TeamMiniBox team={team} />
                    </ListItem>
        }}) :
          <Typography align="center">No Teams Found</Typography>}
      </List>
    </Container>
  );
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, { createTeamObjects })(Battle)