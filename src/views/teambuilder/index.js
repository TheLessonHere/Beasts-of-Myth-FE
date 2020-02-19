import React from 'react';
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

function TeamBuilder(props) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
        <Typography align="center">
            Build your teams here!
        </Typography>
    </Container>
  );
}

const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps, {})(TeamBuilder)