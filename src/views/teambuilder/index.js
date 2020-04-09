import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
    return;
  }, [ isBuilding, isImporting, props ])

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
        <button onClick={stopBuilding}>Stop Building</button>
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
      <button onClick={startBuilding}>Build New Team</button>
      <button onClick={startImporting}>Import Team From Text</button>
    </Container>
  );
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, {})(TeamBuilder)