import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    CssBaseline
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
// Components
import ProfileInfo from './components/ProfileInfo';
import RankingInfo from './components/RankingInfo';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    backgroundColor: "lightgrey",
    height: "800px",
    width: "1200px",
    borderRadius: "5px",
    margin: 'auto',
    padding: '0px'
  },
}));

function Account(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <ProfileInfo
        username={props.username}
        profile_img={props.profile_img}
        wins={props.wins}
        losses={props.losses} />
        <RankingInfo />
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