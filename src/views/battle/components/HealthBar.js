import React, { useState, useEffect} from 'react';
import {
    Container,
    Box,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Components
import {
    BlindedToken,
    TormentedToken,
    HypnotizedToken,
    FrenziedToken,
    InflamedToken,
    VineboundToken,
    InundatedToken,
    WindwhippedToken,
    FreshnessToken
} from '../../../utils/components/StatusTokens';

const useStyles = makeStyles({
        container: {
            height: "75px",
            maxWidth: "225px",
            width: '100%',
            display: 'flex',
            flexFlow: "column nowrap",
            paddingLeft: "5px",
            paddingRight: "5px",
            paddingTop: '5px',
            paddingBottom: '5px',
            borderRadius: "5px",
            border: '1px solid darkgrey',
            backgroundColor: 'lightgrey',
            marginLeft: '0px',
            marginRight: '0px',
            marginBottom: '5px'
        },
        nameBox: {
            height: '45%',
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap'
        },
        name: {
            height: '100%',
            width: '50%',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'left'
        },
        status: {
            height: '100%',
            width: '50%',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'flex-end'
        },
        healthBarBox: {
            height: '25%',
            width: '100%',
        },
        healthBar: {
            height: '15px',
            width: '98%',
            marginLeft: '1%',
            marginRight: '1%',
            borderRadius: '5px',
            border: '1px solid darkgrey'
        },
        health: props => ({
            height: '100%',
            backgroundColor: props.amount,
            width: `${props.percentage}%`,
            borderRadius: '5px',
        }),
        statStageBox: {
            height: '30%',
            width: '100%'
        }
    })

export default function HealthBar(props){
    const {
        gameDidUpdate,
        game,
        player,
        opponent,
        isPlayer,
        isOpponent,
        onPlayerBeastHover,
        onOpponentBeastHover,
        onHoverLeave } = props;
    const [healthPercentage, setHealthPercentage] = useState(1);
    const [differingStatsPlayer, setDifferingStatsPlayer] = useState([]);
    const [differingStatsOpponent, setDifferingStatsOpponent] = useState([]);
    const [styleProps, setStyleProps] = useState({ amount: 'green', percentage: 100 })
    const classes = useStyles(styleProps);

    useEffect(() => {
        if(isPlayer){
            if(player.team.active_slot.beast){
                console.log('Player');
                const percentage = player.team.active_slot.beast.hp_percentage / 100;
                setHealthPercentage(1 * percentage);
                const differingStats = [];
                if(player.team.active_slot.beast.stat_stages.pa < 1){
                    differingStats.push({
                        positive: false,
                        statStage: player.team.active_slot.beast.stat_stages.pa.toString(),
                        stat: 'PA'
                    })
                }
                else if(player.team.active_slot.beast.stat_stages.pa > 1){
                    differingStats.push({
                        positive: true,
                        statStage: player.team.active_slot.beast.stat_stages.pa.toString(),
                        stat: 'PA'
                    })
                }
                if(player.team.active_slot.beast.stat_stages.pd < 1){
                    differingStats.push({
                        positive: false,
                        statStage: player.team.active_slot.beast.stat_stages.pd.toString(),
                        stat: 'PD'
                    })
                }
                else if(player.team.active_slot.beast.stat_stages.pd > 1){
                    differingStats.push({
                        positive: true,
                        statStage: player.team.active_slot.beast.stat_stages.pd.toString(),
                        stat: 'PD'
                    })
                }
                if(player.team.active_slot.beast.stat_stages.ma < 1){
                    differingStats.push({
                        positive: false,
                        statStage: player.team.active_slot.beast.stat_stages.ma.toString(),
                        stat: 'MA'
                    })
                }
                else if(player.team.active_slot.beast.stat_stages.ma > 1){
                    differingStats.push({
                        positive: true,
                        statStage: player.team.active_slot.beast.stat_stages.ma.toString(),
                        stat: 'MA'
                    })
                }
                if(player.team.active_slot.beast.stat_stages.md < 1){
                    differingStats.push({
                        positive: false,
                        statStage: player.team.active_slot.beast.stat_stages.md.toString(),
                        stat: 'MD'
                    })
                }
                else if(player.team.active_slot.beast.stat_stages.md > 1){
                    differingStats.push({
                        positive: true,
                        statStage: player.team.active_slot.beast.stat_stages.md.toString(),
                        stat: 'MD'
                    })
                }
                if(player.team.active_slot.beast.stat_stages.sc < 1){
                    differingStats.push({
                        positive: false,
                        statStage: player.team.active_slot.beast.stat_stages.sc.toString(),
                        stat: 'SC'
                    })
                }
                else if(player.team.active_slot.beast.stat_stages.sc > 1){
                    differingStats.push({
                        positive: true,
                        statStage: player.team.active_slot.beast.stat_stages.sc.toString(),
                        stat: 'SC'
                    })
                }
                setDifferingStatsPlayer(differingStats);
            }
        }
        if(isOpponent){
            if(opponent.team.active_slot.beast){
                console.log('Opponent');
                const percentage = opponent.team.active_slot.beast.hp_percentage / 100;
                setHealthPercentage(1 * percentage);
                const differingStats = [];
                if(opponent.team.active_slot.beast.stat_stages.pa < 1){
                    differingStats.push({
                        positive: false,
                        statStage: opponent.team.active_slot.beast.stat_stages.pa.toString(),
                        stat: 'PA'
                    })
                }
                else if(opponent.team.active_slot.beast.stat_stages.pa > 1){
                    differingStats.push({
                        positive: true,
                        statStage: opponent.team.active_slot.beast.stat_stages.pa.toString(),
                        stat: 'PA'
                    })
                }
                if(opponent.team.active_slot.beast.stat_stages.pd < 1){
                    differingStats.push({
                        positive: false,
                        statStage: opponent.team.active_slot.beast.stat_stages.pd.toString(),
                        stat: 'PD'
                    })
                }
                else if(opponent.team.active_slot.beast.stat_stages.pd > 1){
                    differingStats.push({
                        positive: true,
                        statStage: opponent.team.active_slot.beast.stat_stages.pd.toString(),
                        stat: 'PD'
                    })
                }
                if(opponent.team.active_slot.beast.stat_stages.ma < 1){
                    differingStats.push({
                        positive: false,
                        statStage: opponent.team.active_slot.beast.stat_stages.ma.toString(),
                        stat: 'MA'
                    })
                }
                else if(opponent.team.active_slot.beast.stat_stages.ma > 1){
                    differingStats.push({
                        positive: true,
                        statStage: opponent.team.active_slot.beast.stat_stages.ma.toString(),
                        stat: 'MA'
                    })
                }
                if(opponent.team.active_slot.beast.stat_stages.md < 1){
                    differingStats.push({
                        positive: false,
                        statStage: opponent.team.active_slot.beast.stat_stages.md.toString(),
                        stat: 'MD'
                    })
                }
                else if(opponent.team.active_slot.beast.stat_stages.md > 1){
                    differingStats.push({
                        positive: true,
                        statStage: opponent.team.active_slot.beast.stat_stages.md.toString(),
                        stat: 'MD'
                    })
                }
                if(opponent.team.active_slot.beast.stat_stages.sc < 1){
                    differingStats.push({
                        positive: false,
                        statStage: opponent.team.active_slot.beast.stat_stages.sc.toString(),
                        stat: 'SC'
                    })
                }
                else if(opponent.team.active_slot.beast.stat_stages.sc > 1){
                    differingStats.push({
                        positive: true,
                        statStage: opponent.team.active_slot.beast.stat_stages.sc.toString(),
                        stat: 'SC'
                    })
                }
                setDifferingStatsOpponent(differingStats);
            }
        }
        if(healthPercentage < 0.5){
            setStyleProps({...styleProps, amount: 'yellow'})
            if(healthPercentage < 0.25){
                setStyleProps({...styleProps, amount: 'red'})
            }
        }
    }, [ gameDidUpdate ])

    useEffect(() => {
        let amount = 'green';
        if(healthPercentage < 0.5){
            amount = 'yellow';
            if(healthPercentage < 0.25){
                amount = 'red';
            }
        }
        setStyleProps({...styleProps, amount: amount, percentage: healthPercentage * 100})
    }, [ healthPercentage ])

    const determineStatus = (status) => {
        switch(status){
            case 'Blinded':
                return [<BlindedToken>BLN</BlindedToken>];
            case 'Tormented':
                return [<TormentedToken>TRM</TormentedToken>];
            case 'Hypnotized':
                return [<HypnotizedToken>HPN</HypnotizedToken>];
            case 'Frenzied':
                return [<FrenziedToken>FRN</FrenziedToken>];
            case 'Inflamed':
                return [<InflamedToken>INF</InflamedToken>]
            case 'Vinebound':
                return [<VineboundToken>VNB</VineboundToken>];
            case 'Inundated':
                return [<InundatedToken>IND</InundatedToken>];
            case 'Windwhipped':
                return [<WindwhippedToken>WND</WindwhippedToken>];
            default:
                return null;
        }
    };

    if(isPlayer){
        if(player.team.active_slot.beast){
            return (
                <Container
                className={classes.container}
                onMouseOver={onPlayerBeastHover}
                onMouseOut={onHoverLeave}>
                    <Box className={classes.nameBox}>
                        <div className={classes.name}>
                            <Typography>
                                {player.team.active_slot.beast.beast_name}
                            </Typography>
                        </div>
                        <div className={classes.status}>
                            {game.fresher_active_beast === player.player_num ?
                            <FreshnessToken>FRESH</FreshnessToken> :
                            null}
                            {player.team.active_slot.beast.status !== null ?
                            determineStatus(player.team.active_slot.beast.status) :
                            null}
                        </div>
                    </Box>
                    <Box className={classes.healthBarBox}>
                        <div className={classes.healthBar}>
                            <div className={classes.health} style={{
                                backgroundColor: styleProps.amount,
                                width: `${styleProps.percentage}%`
                                }}/>
                        </div>
                    </Box>
                    <Box className={classes.statStageBox}>
                        {differingStatsPlayer.length > 0 ?
                        differingStatsPlayer.map(stat => {
                            if(stat.positive){
                                return (
                                    <div className={classes.statStagePositive}>
                                        <Typography>x{stat.statStage} {stat.stat}</Typography>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={classes.statStageNegative}>
                                        <Typography>x{stat.statStage} {stat.stat}</Typography>
                                    </div>
                                )
                            }
                        }) :
                        null}
                    </Box>
                </Container>
            )
        }

        return (
            <Container className={classes.container}>
                <Typography>Selecting next beast...</Typography>
            </Container>
        )
    }

    if(isOpponent){
        if(opponent.team.active_slot.beast){
            return (
                <Container
                className={classes.container}
                onMouseOver={onOpponentBeastHover}
                onMouseOut={onHoverLeave}>
                    <Box className={classes.nameBox}>
                        <div className={classes.name}>
                            <Typography>
                                {opponent.team.active_slot.beast.beast_name}
                            </Typography>
                        </div>
                        <div className={classes.status}>
                            {game.fresher_active_beast === opponent.player_num ?
                            <FreshnessToken>FRESH</FreshnessToken> :
                            null}
                            {opponent.team.active_slot.beast.status !== null ?
                            determineStatus(opponent.team.active_slot.beast.status) :
                            null}
                        </div>
                    </Box>
                    <Box className={classes.healthBarBox}>
                        <div className={classes.healthBar}>
                            <div className={classes.health}/>
                        </div>
                    </Box>
                    <Box className={classes.statStageBox}>
                        {differingStatsOpponent.length > 0 ?
                        differingStatsOpponent.map(stat => {
                            if(stat.positive){
                                return (
                                    <div className={classes.statStagePositive}>
                                        <Typography>x{stat.statStage} {stat.stat}</Typography>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={classes.statStageNegative}>
                                        <Typography>x{stat.statStage} {stat.stat}</Typography>
                                    </div>
                                )
                            }
                        }) :
                        null}
                    </Box>
                </Container>
            )
        }

        return (
            <Container className={classes.container}>
                <Typography>Selecting next beast...</Typography>
            </Container>
        )
    }

    return (
        <Container className={classes.container}>
            <div>Error picking render type.</div>
        </Container>
    )
};