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
    microBox: {
        background: "white",
        maxWidth: "400px",
        width: "100%",
        height: "130px",
        borderRadius: "10px",
        padding: "20px",
        border: "2px solid darkred",
        boxShadow: "2px 2px 5px black"
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
        marginLeft: "5px",
        marginRight: "5px",
    },
    avi: {
        marginLeft: "5px",
        marginRight: "5px"
    },
}))

export default function TeamMicroBox(props){
    const { team, teamId } = props;
    const classes = useStyles();

    const searchId1 = team.slot1.beast.beast_name.toLowerCase();
    const searchId2 = team.slot2.beast.beast_name.toLowerCase();
    const searchId3 = team.slot3.beast.beast_name.toLowerCase();
    const searchId4 = team.slot4.beast.beast_name.toLowerCase();
    const searchId5 = team.slot5.beast.beast_name.toLowerCase();

    return (
        <Container id={teamId} className={classes.microBox}>
            <Box className={classes.teamInfo}>
                <Typography className={classes.format} variant="subtitle2">({team.format})</Typography>
                <Typography className={classes.teamName} variant="h6">{team.team_name}</Typography>
            </Box>
            <Box className={classes.beastContainer}>
                <Box className={classes.beast}>
                    <Typography variant="subtitle2">{team.slot1.beast.beast_name}</Typography>
                    <Avatar
                        alt={team.slot1.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId1)} />
                </Box>
                <Box className={classes.beast}>
                    <Typography variant="subtitle2">{team.slot2.beast.beast_name}</Typography>
                    <Avatar
                        alt={team.slot2.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId2)} />
                </Box>
                <Box className={classes.beast}>
                    <Typography variant="subtitle2">{team.slot3.beast.beast_name}</Typography>
                    <Avatar
                        alt={team.slot3.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId3)} />
                </Box>
                <Box className={classes.beast}>
                    <Typography variant="subtitle2">{team.slot4.beast.beast_name}</Typography>
                    <Avatar
                        alt={team.slot4.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId4)} />
                </Box>
                <Box className={classes.beast}>
                    <Typography variant="subtitle2">{team.slot5.beast.beast_name}</Typography>
                    <Avatar
                        alt={team.slot5.beast.beast_name}
                        variant="square"
                        className={classes.avi}
                        src={getBeastImage(searchId5)} />
                </Box>
            </Box>
        </Container>
    )
};