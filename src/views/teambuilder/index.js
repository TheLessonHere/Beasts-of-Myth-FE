import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTeams } from '../../actions';
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
    }
}))

const allLibraries = beasts.concat(moves, abilities);

function TeamBuilder(props) {
  const classes = useStyles();
  const [isBuilding, setIsBuilding] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    props.fetchTeams(props.id)
  }, [])

  useEffect(() => {
    return;
  }, [ isBuilding, isImporting ])

  const startBuilding = (event) => {
    event.preventDefault();
    setIsBuilding(true);
  }

  const stopBuilding = (event) => {
    event.preventDefault();
    setIsBuilding(false);
  }

  const startImporting = (event) => {
    event.preventDefault();
    setIsImporting(true);
  }

  const stopImporting = (event) => {
    event.preventDefault();
    setIsImporting(false);
  }

  if(isBuilding){
    return (
      <Container className={classes.container}>
        <TeamNav allLibraries={allLibraries} items={items} />
        <SubmitButton onClick={stopBuilding}>Stop Building</SubmitButton>
      </Container>
    )
  }

  if(isImporting){
    return (
      <Container className={classes.container}>
        <ImportFromText stopImporting={stopImporting} />
      </Container>
    )
  }

  return (
    <Container className={classes.container}>
      <SubmitButton onClick={startBuilding}>Build New Team</SubmitButton>
      <SubmitButton onClick={startImporting}>Import Team From Text</SubmitButton>
    </Container>
  );
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, { fetchTeams })(TeamBuilder)