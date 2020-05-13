import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Select,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Functions
import { capitalizeString } from '../../../utils/functions/capitalizeString';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexFlow: "column nowrap",
        maxWidth: "250px",
        width: "100%",
        height: "400px",
        backgroundColor: "white",
        border: "1px solid darkgrey",
        borderRadius: "5px",
        padding: "5px"
    },
    topMoveBox: {
        width: "100%",
        height: "10%",
        padding: "5px",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottom: "1px solid darkgrey"
    },
    centerMoveBox: {
        display: "flex",
        flexFlow: "column nowrap",
        width: "100%",
        height: "45%",
        paddingBottom: "5px",
        borderBottom: "1px solid darkgrey",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to right, white, lightgrey, white)"
    },
    bottomMoveBox: {
        width: "100%",
        height: "45%",
        paddingTop: "5px",
        borderBottom: "1px solid darkgrey",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to right, white, lightgrey, white)"
    },
    moveName: {
        marginTop: "10px",
        marginBottom: "5px",
        fontSize: "1rem"
    },
    basePower: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem"
    },
    moveType: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem"
    },
    domain: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem"
    },
    meRemaining: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem"
    },
    description: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem"
    },
    damage: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem"
    },
    critDamage: {
        marginTop: "5px",
        marginBottom: "10px",
        fontSize: "0.8rem"
    },
    topBeastBox: {
        width: "100%",
        height: "10%",
        padding: "5px",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottom: "1px solid darkgrey"
    },
    centerBeastBox: {
        width: "100%",
        height: "15%",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid darkgrey"
    },
    centerBeastLeft: {
        width: '50%',
        height: '100%',
        paddingLeft: "5px",
        paddingRight: "5px",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        borderRight: "1px solid darkgrey",
        backgroundImage: "linear-gradient(to right, white, lightgrey, white)"
    },
    beastName: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "1rem",
        textAlign: 'center'
    },
    centerBeastRight: {
        width: '50%',
        height: '100%',
        paddingLeft: "5px",
        paddingRight: "5px",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to right, white, lightgrey, white)"
    },
    ability: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem",
        textAlign: 'center'
    },
    bottomBeastBox: {
        width: "100%",
        height: "75%",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid darkgrey"
    },
    bottomBeastLeft: {
        width: '50%',
        height: '100%',
        paddingLeft: "5px",
        paddingRight: "5px",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        borderRight: "1px solid darkgrey",
        backgroundImage: "linear-gradient(to right, white, lightgrey, white)"
    },
    beastStat: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem",
        textAlign: 'center'
    },
    bottomBeastRight: {
        width: '50%',
        height: '100%',
        paddingLeft: "5px",
        paddingRight: "5px",
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to right, white, lightgrey, white)"
    },
    beastMove: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem",
        textAlign: 'center'
    },
    beastMoveME: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.8rem",
        textAlign: 'center'
    },
    oppBeastMove: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.7rem",
        textAlign: 'center'
    },
    oppBeastMoveME: {
        marginTop: "5px",
        marginBottom: "5px",
        fontSize: "0.7rem",
        textAlign: 'center'
    },
    actionText: {
        color: 'darkgrey',
        textAlign: 'center',
        marginTop: '10px'
    }
}));

export default function PlayerHUD(props) {
    const classes = useStyles();
    const { hoverInfo, player } = props;
    const [hoverInfoType, setHoverInfoType] = useState(null);

    useEffect(() => {
        if(hoverInfo){
            setHoverInfoType(hoverInfo.infoType);
        } else {
            setHoverInfoType(null);
        }
    }, [ hoverInfo, hoverInfoType, player ])

    if(!hoverInfoType && player && player.selected_action){
        if(player.selected_action.actionType === 'starting-beast'){
            return (
                <Container className={classes.container}>
                    <Typography className={classes.actionText}>{player.username} will lead with {player.selected_action.startingBeast.beast_name}.</Typography>
                </Container>
            )
        }
        if(player.selected_action.actionType === 'select-move'){
            return (
                <Container className={classes.container}>
                    <Typography className={classes.actionText}>{player.team.active_slot.beast.beast_name} will use {player.team.active_slot.beast.moves.get(player.selected_action.moveSlot).move_name}.</Typography>
                </Container>
            )
        }
        if(player.selected_action.actionType === 'change-beast'){
            return (
                <Container className={classes.container}>
                    <Typography className={classes.actionText}>{player.username} will switch to {player.team.getSlot(player.selected_action.benchedBeastSlot).beast.beast_name}.</Typography>
                </Container>
            )
        }
        return (
            <Container className={classes.container}>
                <Typography>{" "}</Typography>
            </Container>
        )
    }

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
                        `${capitalizeString(hoverInfo.moveInfo.type)}` :
                        ""}
                    </Typography>
                    <Typography className={classes.domain}>
                        Domain: {hoverInfo.moveInfo ?
                        `${capitalizeString(hoverInfo.moveInfo.domain)}` :
                        ""}
                    </Typography>
                    <Typography className={classes.meRemaining}>
                        ME: {hoverInfo.moveInfo ?
                        hoverInfo.moveInfo.curr_me :
                        ""}/{hoverInfo.moveInfo ?
                        hoverInfo.moveInfo.init_me :
                        ""}
                    </Typography>
                </Box>
                <Box className={classes.bottomMoveBox}>
                   <Typography
                   className={classes.description}>
                        Description: {hoverInfo.moveInfo ?
                        hoverInfo.moveInfo.short_description :
                        "No Description"}
                   </Typography>
                   <Typography className={classes.damage}>
                       Calculated Move Damage: {hoverInfo.calcedDamage ?
                       hoverInfo.calcedDamage.damage :
                       ""}
                   </Typography>
                   <Typography className={classes.critDamage}>
                       Move Damage if Crit: {hoverInfo.calcedDamage ?
                       hoverInfo.calcedDamage.damageWithCrit :
                       ""}
                   </Typography>
                </Box>
            </Container>
        )
    }

    if(hoverInfoType === 'switch' || hoverInfoType === 'player' && hoverInfo){
        let beastMove1;
        let beastMove2;
        let beastMove3;
        let beastMove4;

        if(hoverInfo && hoverInfo.beastInfo){
            beastMove1 = hoverInfo.beastInfo.moves.get('move1');
            beastMove2 = hoverInfo.beastInfo.moves.get('move2');
            beastMove3 = hoverInfo.beastInfo.moves.get('move3');
            beastMove4 = hoverInfo.beastInfo.moves.get('move4');
        }

        return (
            <Container className={classes.container}>
                <Box className={classes.topBeastBox}>
                    <Typography variant="h5">Beast Info:</Typography>
                </Box>
                <Box className={classes.centerBeastBox}>
                    <Box className={classes.centerBeastLeft}>
                        <Typography
                        className={classes.beastName}
                        variant="subtitle1">
                        {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.beast_name :
                        ""}
                        </Typography>
                    </Box>
                    <Box className={classes.centerBeastRight}>
                        <Typography
                        className={classes.ability}
                        variant="subtitle1">
                        Ability: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.ability :
                        ""}
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.bottomBeastBox}>
                    <Box className={classes.bottomBeastLeft}>
                        <Typography className={classes.beastStat}>
                            Domain: {hoverInfo && hoverInfo.beastInfo ?
                        `${capitalizeString(hoverInfo.beastInfo.domain1)}${hoverInfo.beastInfo.domain2 ?
                        `/${capitalizeString(hoverInfo.beastInfo.domain2)}`:
                        ""}` :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            Status: {hoverInfo && hoverInfo.beastInfo &&
                        hoverInfo.beastInfo.status ?
                        hoverInfo.beastInfo.status :
                        "Healthy"}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            HP: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.curr_hp :
                        ""}/{hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.init_hp :
                        ""}{" "}({hoverInfo && hoverInfo.beastInfo ?
                        `${hoverInfo.beastInfo.hp_percentage}%` :
                        ""})
                        </Typography>
                        <Typography className={classes.beastStat}>
                            PA: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.curr_pa :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            PD: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.curr_pd :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            MA: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.curr_ma :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            MD: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.curr_md :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            SC: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.curr_sc :
                        ""}
                        </Typography>
                    </Box>
                    <Box className={classes.bottomBeastRight}>
                        <Typography className={classes.beastMove}>
                            Move 1: {beastMove1 ?
                        beastMove1.move_name :
                        "No Move"}
                        </Typography>
                        <Typography className={classes.beastMoveME}>
                            ME: {beastMove1 ?
                        beastMove1.curr_me :
                        ""}/{beastMove1 ?
                        beastMove1.init_me :
                        ""}
                        </Typography>
                        <Typography className={classes.beastMove}>
                            Move 2: {beastMove2 ?
                        beastMove2.move_name :
                        "No Move"}
                        </Typography>
                        <Typography className={classes.beastMoveME}>
                            ME: {beastMove2 ?
                        beastMove2.curr_me :
                        ""}/{beastMove2 ?
                        beastMove2.init_me :
                        ""}
                        </Typography>
                        <Typography className={classes.beastMove}>
                            Move 3: {beastMove3 ?
                        beastMove3.move_name :
                        "No Move"}
                        </Typography>
                        <Typography className={classes.beastMoveME}>
                            ME: {beastMove3 ?
                        beastMove3.curr_me :
                        ""}/{beastMove3 ?
                        beastMove3.init_me :
                        ""}
                        </Typography>
                        <Typography className={classes.beastMove}>
                            Move 4: {beastMove4 ?
                        beastMove4.move_name :
                        "No Move"}
                        </Typography>
                        <Typography className={classes.beastMoveME}>
                            ME: {beastMove4 ?
                        beastMove4.curr_me :
                        ""}/{beastMove4 ?
                        beastMove4.init_me :
                        ""}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        )
    }

    if(hoverInfoType === 'opponent' || hoverInfoType === 'preview' && hoverInfo){
        let beastMove1;
        let beastMove2;
        let beastMove3;
        let beastMove4;

        if(hoverInfo && hoverInfo.beastInfo){
            if(hoverInfo.beastInfo.moves.get('move1') && hoverInfo.beastInfo.moves.get('move1').curr_me < hoverInfo.beastInfo.moves.get('move1').init_me){
                beastMove1 = hoverInfo.beastInfo.moves.get('move1');
            } else {
                beastMove1 = null;
            }
            if(hoverInfo.beastInfo.moves.get('move2') && hoverInfo.beastInfo.moves.get('move2').curr_me < hoverInfo.beastInfo.moves.get('move2').init_me){
                beastMove2 = hoverInfo.beastInfo.moves.get('move2');
            } else {
                beastMove2 = null;
            }
            if(hoverInfo.beastInfo.moves.get('move3') && hoverInfo.beastInfo.moves.get('move3').curr_me < hoverInfo.beastInfo.moves.get('move3').init_me){
                beastMove3 = hoverInfo.beastInfo.moves.get('move3');
            } else {
                beastMove3 = null;
            }
            if(hoverInfo.beastInfo.moves.get('move4') && hoverInfo.beastInfo.moves.get('move4').curr_me < hoverInfo.beastInfo.moves.get('move4').init_me){
                beastMove4 = hoverInfo.beastInfo.moves.get('move4');
            } else {
                beastMove4 = null;
            }
        }
        return (
            <Container className={classes.container}>
                <Box className={classes.topBeastBox}>
                    <Typography variant="h5">Opponent Beast:</Typography>
                </Box>
                <Box className={classes.centerBeastBox}>
                    <Box className={classes.centerBeastLeft}>
                        <Typography
                        className={classes.beastName}
                        variant="subtitle1">
                        {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.beast_name :
                        ""}
                        </Typography>
                    </Box>
                    <Box className={classes.centerBeastRight}>
                        <Typography
                        className={classes.ability}
                        variant="subtitle1">
                        Ability: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.ability :
                        ""}
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.bottomBeastBox}>
                    <Box className={classes.bottomBeastLeft}>
                        <Typography className={classes.beastStat}>
                            Domain: {hoverInfo && hoverInfo.beastInfo ?
                        `${capitalizeString(hoverInfo.beastInfo.domain1)}${hoverInfo.beastInfo.domain2 ?
                        `/${capitalizeString(hoverInfo.beastInfo.domain2)}`:
                        ""}` :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            Status: {hoverInfo && hoverInfo.beastInfo &&
                        hoverInfo.beastInfo.status ?
                        hoverInfo.beastInfo.status :
                        "Healthy"}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            HP: {hoverInfo && hoverInfo.beastInfo ?
                        `${hoverInfo.beastInfo.hp_percentage}%` :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            PA: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.init_pa :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            PD: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.init_pd :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            MA: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.init_ma :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            MD: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.init_md :
                        ""}
                        </Typography>
                        <Typography className={classes.beastStat}>
                            SC: {hoverInfo && hoverInfo.beastInfo ?
                        hoverInfo.beastInfo.init_sc :
                        ""}
                        </Typography>
                    </Box>
                    <Box className={classes.bottomBeastRight}>
                        <Typography className={classes.beastName}>
                            Known Moves:
                        </Typography>
                        <Typography className={classes.oppBeastMove}>
                            Move 1: {beastMove1 ?
                        beastMove1.move_name :
                        "Unknown"}
                        </Typography>
                        <Typography className={classes.oppBeastMoveME}>
                            ME: {beastMove1 ?
                        beastMove1.curr_me :
                        ""}/{beastMove1 ?
                        beastMove1.init_me :
                        ""}
                        </Typography>
                        <Typography className={classes.oppBeastMove}>
                            Move 2: {beastMove2 ?
                        beastMove2.move_name :
                        "Unknown"}
                        </Typography>
                        <Typography className={classes.oppBeastMoveME}>
                            ME: {beastMove2 ?
                        beastMove2.curr_me :
                        ""}/{beastMove2 ?
                        beastMove2.init_me :
                        ""}
                        </Typography>
                        <Typography className={classes.oppBeastMove}>
                            Move 3: {beastMove3 ?
                        beastMove3.move_name :
                        "Unknown"}
                        </Typography>
                        <Typography className={classes.oppBeastMoveME}>
                            ME: {beastMove3 ?
                        beastMove3.curr_me :
                        ""}/{beastMove3 ?
                        beastMove3.init_me :
                        ""}
                        </Typography>
                        <Typography className={classes.oppBeastMove}>
                            Move 4: {beastMove4 ?
                        beastMove4.move_name :
                        "Unknown"}
                        </Typography>
                        <Typography className={classes.oppBeastMoveME}>
                            ME: {beastMove4 ?
                        beastMove4.curr_me :
                        ""}/{beastMove4 ?
                        beastMove4.init_me :
                        ""}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            <Typography>{" "}</Typography>
        </Container>
    )
}