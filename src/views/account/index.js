import React from 'react';
import { connect } from 'react-redux';
import {
    Typography,
    Container,
    CssBaseline
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "lightgrey",
    height: "800px",
    padding: "20px",
    borderRadius: "5px"
  },
}));

function Account(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container} maxWidth="lg">
        <Typography align="center">
            {props.username}
            <br/>
            Record: {props.wins} - {props.losses}
        </Typography>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
      ...state
  }
}

export default connect(mapStateToProps, {})(Account)