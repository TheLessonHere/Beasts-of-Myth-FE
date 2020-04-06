import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Typography,
    Box,
    CircularProgress
    } from "@material-ui/core";

// Components
import LibrarySearchbar from './components/LibrarySearchbar';

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

  return (
    <Container className={classes.container}>
        <LibrarySearchbar allLibraries={allLibraries} items={items}/>
    </Container>
  );
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, {})(TeamBuilder)