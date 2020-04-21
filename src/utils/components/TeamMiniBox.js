import React from 'react';
import {
    Container,
    Box,
    Typography,
    Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getBeastImage } from '../functions/getBeastImage';

const useStyles = makeStyles(theme => ({
    miniBox: {
        background: "white",
        maxWidth: "600px",
        width: "100%",
        height: "150px",
        borderRadius: "10px",
        padding: "20px",
        border: "2px solid darkred",
        boxShadow: "2px 2px 5px black",
        "&:hover": {
            cursor: "pointer"
        },
        "&:active": {
            border: "2px solid darkblue"
        }
    },
    teamInfo: {
        display: "flex",
        flexFlow: "row nowrap",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    format: {
        width: "50%",
        textAlign: "left"
    },
    teamName: {
        width: "50%",
        textAlign: "left"
    },
    beastContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    beast: {
        display: "flex",
        flexFlow: "column nowrap",
        marginLeft: "10px",
        marginRight: "10px",
    },
    avi: {
        marginLeft: "10px",
        marginRight: "10px"
    },
}))

export default function TeamMiniBox(props){
    const { team } = props;
    const { team_id, team_object } = team;
    const classes = useStyles();

    const searchId1 = team_object.slot1.beast.beast_name.toLowerCase();
    const searchId2 = team_object.slot2.beast.beast_name.toLowerCase();
    const searchId3 = team_object.slot3.beast.beast_name.toLowerCase();
    const searchId4 = team_object.slot4.beast.beast_name.toLowerCase();
    const searchId5 = team_object.slot5.beast.beast_name.toLowerCase();

    return (
        <Container
        id={`${team_id}`}
        className={classes.miniBox}>
            <Box className={classes.teamInfo}>
                <Typography className={classes.format} variant="subtitle2">({team_object.format})</Typography>
                <Typography className={classes.teamName} variant="h6">{team_object.team_name}</Typography>
            </Box>
            <Box className={classes.beastContainer}>
                <Box className={classes.beast}>
                    <Typography variant="subtitle1">{team_object.slot1.beast.beast_name}</Typography>
                    <Avatar
                        alt={team_object.slot1.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId1)} />
                </Box>
                <Box className={classes.beast}>
                    <Typography variant="subtitle1">{team_object.slot2.beast.beast_name}</Typography>
                    <Avatar
                        alt={team_object.slot2.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId2)} />
                </Box>
                <Box className={classes.beast}>
                    <Typography variant="subtitle1">{team_object.slot3.beast.beast_name}</Typography>
                    <Avatar
                        alt={team_object.slot3.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId3)} />
                </Box>
                <Box className={classes.beast}>
                    <Typography variant="subtitle1">{team_object.slot4.beast.beast_name}</Typography>
                    <Avatar
                        alt={team_object.slot4.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId4)} />
                </Box>
                <Box className={classes.beast}>
                    <Typography variant="subtitle1">{team_object.slot5.beast.beast_name}</Typography>
                    <Avatar
                        alt={team_object.slot5.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId5)} />
                </Box>
            </Box>
        </Container>
    )
};