import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Select,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
        display: "",
        maxWidth: "250px",
        width: "100%",
        height: "400px",
        backgroundColor: "lightgrey",
        border: "1px solid darkgrey",
        borderRadius: "5px"
    },
    topMoveBox: {
        width: "100%",
        height: "25%",
        padding: "5px",
        display: "flex",
        flexFlow: "column nowrap"
    },
    centerMoveBox: {
        display: "flex",
        flexFlow: "column nowrap",
        width: "100%",
        height: "50%",
        padding: "5px"
    },
    bottomMoveBox: {
        width: "100%",
        height: "25%",
        padding: "5px",
        display: "flex",
        flexFlow: "column nowrap"
    },
    moveName: {
        marginTop: "15px",
        marginBottom: "5px"
    },
    basePower: {
        marginTop: "5px",
        marginBottom: "5px"
    },
    moveType: {
        marginTop: "5px",
        marginBottom: "5px"
    },
    domain: {
        marginTop: "5px",
        marginBottom: "5px"
    },
    meLeft: {
        marginTop: "5px",
        marginBottom: "15px"
    }
}));

export default function PlayerHUD(props) {
    const classes = useStyles();
    const { hoverInfo } = props;
    const [hoverInfoType, setHoverInfoType] = useState(null);

    useEffect(() => {
        if(hoverInfo){
            setHoverInfoType(hoverInfo.infoType);
        } else {
            setHoverInfoType(null);
        }
    }, [ hoverInfo, hoverInfoType ])

    if(hoverInfoType === 'move' && hoverInfo){
        return (
            <Container className={classes.container}>
                <Box className={classes.topMoveBox}>
                    <Typography variant="h5">Move Info:</Typography>
                </Box>
                <Box className={classes.centerMoveBox}>
                    <Typography
                    className={classes.moveName}
                    variant="subtitle1">
                    {hoverInfo.moveInfo ?
                        hoverInfo.moveInfo.move_name :
                        "No Move"}
                    </Typography>
                    <Typography className={classes.basePower}>
                        Base Power: {hoverInfo.moveInfo ?
                        hoverInfo.moveInfo.base_power :
                        ""}
                    </Typography>
                    <Typography className={classes.moveType}>
                        Type: {hoverInfo.moveInfo ?
                        hoverInfo.moveInfo.type :
                        ""}
                    </Typography>
                    <Typography className={classes.domain}>
                        Domain: {hoverInfo.moveInfo ?
                        hoverInfo.moveInfo.domain :
                        ""}
                    </Typography>
                    <Typography className={classes.meLeft}>
                        ME: {hoverInfo.moveInfo ?
                        hoverInfo.moveInfo.curr_me :
                        ""}/{hoverInfo.moveInfo ?
                            hoverInfo.moveInfo.init_me :
                            ""}
                    </Typography>
                </Box>
                <Box className={classes.bottomMoveBox}>
                   <Typography variant="subtitle1">
                        Description: {hoverInfo.moveInfo ?
                        hoverInfo.moveInfo.short_description :
                        "No Description"}
                   </Typography>
                </Box>
            </Container>
        )
    }

    if(hoverInfoType === 'switch' && hoverInfo){
        return (
            <Container className={classes.container}>
               <Typography variant="h6">{hoverInfo.beastInfo.beast_name}</Typography>
            </Container>
        )
    }

    if(hoverInfoType === 'opponent' && hoverInfo){
        return (
            <Container className={classes.container}>
               <Typography variant="h6">{hoverInfo.beastInfo.beast_name}</Typography>
            </Container>
        )
    }

    if(hoverInfoType === 'player' && hoverInfo){
        return (
            <Container className={classes.container}>
               <Typography variant="h6">{hoverInfo.beastInfo.beast_name}</Typography>
            </Container>
        )
    }

    if(hoverInfoType === 'preview' && hoverInfo){
        return (
            <Container className={classes.container}>
               <Typography variant="h6">{hoverInfo.beastInfo.beast_name}</Typography>
            </Container>
        )
    }

    return (
        <Container className={classes.container} />
    )
}