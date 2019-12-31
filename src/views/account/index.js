import React from 'react';
import {
    Typography,
    Container,
    CssBaseline
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    background: "lightgrey",
    borderRadius: "5px"
  },
}));

function Account(props) {
  const classes = useStyles();
  const { accountData } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container} maxWidth="lg">
        <Typography align="center">
            {accountData.username}
            <br/>
            Record: {accountData.wins} - {accountData.losses}
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default Account;