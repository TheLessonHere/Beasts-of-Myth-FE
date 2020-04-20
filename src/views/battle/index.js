import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Typography,
    Box,
    CircularProgress
    } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "lightgrey",
        height: "800px",
        padding: "20px",
        borderRadius: "5px"
    }
}))

function Battle(props) {
  const classes = useStyles();
  const [isSearching, setIsSearching] = useState(false);
  const [isBattling, setIsBattling] = useState(false);

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
        <Typography align="center">
            Find a battle here!
        </Typography>
    </Container>
  );
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, {})(Battle)