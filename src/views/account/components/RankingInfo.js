import React from 'react';
import {
    Container,
    Typography,
    Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
      backgroundColor: "white",
      border: "1px solid darkgrey",
      height: "720px",
      width: '40%',
      margin: '5%',
      padding: "20px",
      borderRadius: "5px"
    },
    header: {
        marginBottom: '30px'
    }
  }));

export default function RankingInfo(props){
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography align='center' variant='h4' className={classes.header}>
                Current Rankings:
            </Typography>
            <Typography  align='left' variant='h6'>
                Unrestricted:
            </Typography>
        </Container>
    )
}