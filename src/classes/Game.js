import { domainEffectivenessMap } from '../utils/functions/domainEffectivenessMap';

export default class Game {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.player1_id = this.player1.player_id;
        this.player2_id = this.player2.player_id;
        this.player1_active_beasts = this.player1.team.total_beasts;
        this.player2_active_beasts = this.player2.team.total_beasts;
        this.player1_action = this.player1.selected_action;
        this.player2_action = this.player2.selected_action;
        this.fresher_active_beast = null;
        this.faster_active_beast = null;
        this.turn_counter = 0;
        this.curr_domain = 'Neutral';
        this.player1_hazards = [];
        this.player2_hazards = [];
        this.winner = null;
        this.loser = null;
    }

    updateTurnCounter(){
        this.turn_counter = this.turn_counter + 1;
        this.incrementFreshness();
        this.compareFreshness();
        this.compareSC();
    }

    selectAction(action, player_id){
        if(player_id == this.player1_id){
            this.player1.selectAction(action);
        } else {
            this.player2.selectAction(action);
        }
    }

    updateActions(){
        this.player1_action = this.player1.selected_action;
        this.player2_action = this.player2.selected_action;
    }

    actionsExecutable(){
        if(this.player1_action != null && this.player2_action != null){
            return true;
        } else {
            return false;
        }
    }

    executePlayer1Move(moveSlot, critRolls){
        if(this.player1.team.active_slot.beast.moves.get(moveSlot).type == 'status'){
            this.player1.team.active_slot.beast.moves.get(moveSlot).effect(this.player1, this.player2);
        } else {
            this.damageCalculation(this.player1,
                                    this.player2,
                                    this.player1.team.active_slot.beast.moves.get(moveSlot),
                                    this.player1.team.active_slot.beast,
                                    this.player2.team.active_slot.beast,
                                    critRolls);
        }
        // If the all abled moves' MEs hit 0 replace with Struggle or something similar.
        switch(moveSlot){
            case 'move1':
                this.player1.team.active_slot.beast.moves.get('move1').decrementME();
                break;
            case 'move2':
                this.player1.team.active_slot.beast.moves.get('move2').decrementME();
                break;
            case 'move3':
                this.player1.team.active_slot.beast.moves.get('move3').decrementME();
                break;
            case 'move4':
                this.player1.team.active_slot.beast.moves.get('move4').decrementME();
                break;
            default:
                return;
        }
    }

    executePlayer2Move(moveSlot, critRolls){
        if(this.player2.team.active_slot.beast.moves.get(moveSlot).type == 'status'){
            this.player2.team.active_slot.beast.moves.get(moveSlot).effect(this.player2, this.player1);
        } else {
            this.damageCalculation(this.player2,
                                    this.player1,
                                    this.player2.team.active_slot.beast.moves.get(moveSlot),
                                    this.player2.team.active_slot.beast,
                                    this.player1.team.active_slot.beast,
                                    critRolls);
        }
        // If the all abled moves' MEs hit 0 replace with Struggle or something similar.
        switch(moveSlot){
            case 'move1':
                this.player2.team.active_slot.beast.moves.get('move1').decrementME();
                break;
            case 'move2':
                this.player2.team.active_slot.beast.moves.get('move2').decrementME();
                break;
            case 'move3':
                this.player2.team.active_slot.beast.moves.get('move3').decrementME();
                break;
            case 'move4':
                this.player2.team.active_slot.beast.moves.get('move4').decrementME();
                break;
            default:
                return;
        }
    }

    executeActions(){
        let player1ActionCompleted = false;
        let player2ActionCompleted = false;
        while(player1ActionCompleted == false || player2ActionCompleted == false){
            if(this.player1_action.actionType == 'starting-beast'){
                this.player1.startBeast(this.player1_action.startingBeast);
                player1ActionCompleted = true;
            }
            if(this.player2_action.actionType == 'starting-beast'){
                this.player2.startBeast(this.player2_action.startingBeast);
                player2ActionCompleted = true;
            }
            if(this.player1_action.actionType == 'change-beast'){
                this.player1.changeBeast(this.player1_action.benchedBeastSlot);
                this.compareFreshness();
                this.compareSC();
                player1ActionCompleted = true;
            }
            if(this.player2_action.actionType == 'change-beast'){
                this.player2.changeBeast(this.player2_action.benchedBeastSlot);
                this.compareFreshness();
                this.compareSC();
                player2ActionCompleted = true;
            }
            if(this.player1_action.actionType == 'select-move' && this.player2_action.actionType == 'select-move'){
                if(this.player1.team.active_slot.beast.moves.get(this.player1_action.moveSlot).priority >
                this.player2.team.active_slot.beast.moves.get(this.player2_action.moveSlot).priority){
                    if(this.player1_action.superActivated){
                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                    }
                    if(this.player2_action.superActivated){
                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                    }
                    this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                    player1ActionCompleted = true;
                    console.log(this.player2.team.active_slot.beast)
                    if(this.player2.team.active_slot.beast === null){
                        player2ActionCompleted = true;
                    } else {
                        this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                        player2ActionCompleted = true;
                    }
                }
                else if(this.player1.team.active_slot.beast.moves.get(this.player1_action.moveSlot).priority <
                this.player2.team.active_slot.beast.moves.get(this.player2_action.moveSlot).priority){
                    if(this.player2_action.superActivated){
                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                    }
                    if(this.player1_action.superActivated){
                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                    }
                    this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                    player2ActionCompleted = true;
                    console.log(this.player1.team.active_slot.beast)
                    if(this.player1.team.active_slot.beast === null){
                        player1ActionCompleted = true;
                    } else {
                        this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                        player1ActionCompleted = true;
                    }
                } else {
                    this.compareSC();
                    switch(this.faster_active_beast){
                        case 'player1':
                            if(this.player1_action.superActivated){
                                this.player1.activateSuper(this.player1.team.active_slot.beast);
                            }
                            if(this.player2_action.superActivated){
                                this.player2.activateSuper(this.player2.team.active_slot.beast);
                            }
                            this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                            player1ActionCompleted = true;
                            console.log(this.player2.team.active_slot.beast)
                            if(this.player2.team.active_slot.beast === null){
                                player2ActionCompleted = true;
                            } else {
                                this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                                player2ActionCompleted = true;
                            }
                            break;
                        case 'player2':
                            if(this.player2_action.superActivated){
                                this.player2.activateSuper(this.player2.team.active_slot.beast);
                            }
                            if(this.player1_action.superActivated){
                                this.player1.activateSuper(this.player1.team.active_slot.beast);
                            }
                            this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                            player2ActionCompleted = true;
                            console.log(this.player1.team.active_slot.beast)
                            if(this.player1.team.active_slot.beast === null){
                                player1ActionCompleted = true;
                            } else {
                                this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                                player1ActionCompleted = true;
                            }
                            break;
                        case 'tie':
                            this.compareFreshness();
                            switch(this.fresher_active_beast){
                                case 'player1':
                                    if(this.player1_action.superActivated){
                                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                                    }
                                    if(this.player2_action.superActivated){
                                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                                    }
                                    this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                                    player1ActionCompleted = true;
                                    console.log(this.player2.team.active_slot.beast)
                                    if(this.player2.team.active_slot.beast === null){
                                        player2ActionCompleted = true;
                                    } else {
                                        this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                                        player2ActionCompleted = true;
                                    }
                                    break;
                                case 'player2':
                                    if(this.player2_action.superActivated){
                                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                                    }
                                    if(this.player1_action.superActivated){
                                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                                    }
                                    this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                                    player2ActionCompleted = true;
                                    console.log(this.player1.team.active_slot.beast)
                                    if(this.player1.team.active_slot.beast === null){
                                        player1ActionCompleted = true;
                                    } else {
                                        this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                                        player1ActionCompleted = true;
                                    }
                                    break;
                                case 'tie':
                                    const player1Roll = Math.random();
                                    const player2Roll = Math.random();
                                    if(player1Roll > player2Roll){
                                        if(this.player1_action.superActivated){
                                            this.player1.activateSuper(this.player1.team.active_slot.beast);
                                        }
                                        if(this.player2_action.superActivated){
                                            this.player2.activateSuper(this.player2.team.active_slot.beast);
                                        }
                                        this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                                        player1ActionCompleted = true;
                                        console.log(this.player2.team.active_slot.beast)
                                        if(this.player2.team.active_slot.beast === null){
                                            player2ActionCompleted = true;
                                        } else {
                                            this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                                            player2ActionCompleted = true;
                                        }
                                        break;
                                    }
                                    else if(player2Roll > player1Roll){
                                        if(this.player2_action.superActivated){
                                            this.player2.activateSuper(this.player2.team.active_slot.beast);
                                        }
                                        if(this.player1_action.superActivated){
                                            this.player1.activateSuper(this.player1.team.active_slot.beast);
                                        }
                                        this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                                        player2ActionCompleted = true;
                                        console.log(this.player1.team.active_slot.beast)
                                        if(this.player1.team.active_slot.beast === null){
                                            player1ActionCompleted = true;
                                        } else {
                                            this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                                            player1ActionCompleted = true;
                                        }
                                        break;
                                    } else {
                                        if(this.player1_action.superActivated){
                                            this.player1.activateSuper(this.player1.team.active_slot.beast);
                                        }
                                        if(this.player2_action.superActivated){
                                            this.player2.activateSuper(this.player2.team.active_slot.beast);
                                        }
                                        this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                                        player1ActionCompleted = true;
                                        console.log(this.player2.team.active_slot.beast)
                                        if(this.player2.team.active_slot.beast === null){
                                            player2ActionCompleted = true;
                                        } else {
                                            this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                                            player2ActionCompleted = true;
                                        }
                                        break;
                                    }
                                default:
                                    console.log("Error processing freshness.");
                            }
                        default:
                            console.log("Error processing speed-classes.");
                    }
                }
            }
            if(this.player1_action.actionType == 'select-move' && this.player2_action.actionType != 'select-move'){
                if(this.player1_action.superActivated){
                    this.player1.activateSuper(this.player1.team.active_slot.beast);
                }
                this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls);
                player1ActionCompleted = true;
            }
            if(this.player2_action.actionType == 'select-move' && this.player1_action.actionType != 'select-move'){
                if(this.player2_action.superActivated){
                    this.player2.activateSuper(this.player2.team.active_slot.beast);
                }
                this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls);
                player2ActionCompleted = true;
            }
        }
        this.player1.clearAction();
        this.player1_action = null;
        this.player2.clearAction();
        this.player2_action = null;
        return;
    }

    damageCalculation(attackingPlayer, defendingPlayer, move, attackingBeast, defendingBeast, critRolls){
        console.log(move)
        let domainModifier = 1;
        const moveType = move.type;
        const basePower = move.base_power;
        const moveDomain = move.domain;
        const attackingDomain1 = attackingBeast.domain1;
        const attackingDomain2 = attackingBeast.domain2;
        const defendingDomain = `${defendingBeast.domain1}-${defendingBeast.domain2}`;
        const effectiveness = domainEffectivenessMap.get(moveDomain)[defendingDomain];
        let sameTypeBonus = 0;
        if(attackingDomain1 == moveDomain || attackingDomain2 == moveDomain){
            sameTypeBonus = Math.round(basePower / 2);
        }
        switch(this.curr_domain){
            case 'Lightfield':
                if(moveDomain == 'light'){
                    domainModifier = 1.5;
                }
                break;
            case 'Darkfield':
                if(moveDomain == 'dark'){
                    domainModifier = 1.5;
                }
                break;
            case 'Mindfield':
                if(moveDomain == 'mind'){
                    domainModifier = 1.5;
                }
                break;
            case 'Chaosfield':
                if(moveDomain == 'chaos'){
                    domainModifier = 1.5;
                }
                break;
            case 'Flamefield':
                if(moveDomain == 'flame'){
                    domainModifier = 1.5;
                }
                break;
            case 'Terrafield':
                if(moveDomain == 'terra'){
                    domainModifier = 1.5;
                }
                break;
            case 'Seafield':
                if(moveDomain == 'sea'){
                    domainModifier = 1.5;
                }
                break;
            case 'Skyfield':
                if(moveDomain == 'sky'){
                    domainModifier = 1.5;
                }
                break;
            case 'Neutral':
                break;
            default:
                console.log('Error calculating domain modifier.');
        }

        const rollCrit = (critRolls) => {
            const getRandomInt = (min, max) => {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            switch(critRolls){
                case 0:
                    return false;
                case 1:
                    attackingPlayer.updateCritRolls(1);
                    let randomInt25 = getRandomInt(1, 4);
                    if(randomInt25 === 1){
                        randomInt25 = true;
                    } else {
                    randomInt25 = false;
                    };
                    return randomInt25;
                case 2:
                    attackingPlayer.updateCritRolls(2);
                    let randomInt50 = getRandomInt(1, 2);
                    if(randomInt50 === 1){
                        randomInt50 = true;
                    } else {
                    randomInt50 = false;
                    };
                    return randomInt50;
                case 3:
                    attackingPlayer.updateCritRolls(3);
                    let randomInt75 = getRandomInt(1, 4);
                    if(randomInt75 === 1){
                        randomInt75 = false;
                    } else {
                    randomInt75 = true;
                    };
                    return randomInt75;
                case 4:
                    attackingPlayer.updateCritRolls(4);
                    return true;
            }
        }

        const critRoll = rollCrit(critRolls);

        move.decrementME();

        let damage = 0;

        if(moveType == 'physical'){
            console.log(basePower, sameTypeBonus, domainModifier, attackingBeast.curr_pa, defendingBeast.curr_pd, effectiveness, critRoll);
            damage = ((((basePower + sameTypeBonus) * domainModifier) + attackingBeast.curr_pa) - defendingBeast.curr_pd) * effectiveness;
            if(critRoll){
                damage = damage * 2;
            }
        } else {
            console.log(basePower, sameTypeBonus, domainModifier, attackingBeast.curr_ma, defendingBeast.curr_md, effectiveness, critRoll);
            damage = ((((basePower + sameTypeBonus) * domainModifier) + attackingBeast.curr_ma) - defendingBeast.curr_md) * effectiveness;
            if(critRoll){
                damage = damage * 2;
            }
        }

        console.log(damage);
        defendingBeast.updateHP(damage);
        if(defendingBeast.curr_hp <= 0){
            defendingBeast.knockOutBeast();
            defendingPlayer.team.active_slot.beast.makeInactive();
            defendingPlayer.team.clearActiveSlot();
        }
    }

    postKOSwitch(playerNum, slot){
        switch(slot){
            case 'slot1':
                if(playerNum === 'player1'){
                    this.player1.team.makeActive('slot1')
                } else {
                    this.player2.team.makeActive('slot1')
                }
                break;
            case 'slot2':
                if(playerNum === 'player1'){
                    this.player1.team.makeActive('slot2')
                } else {
                    this.player2.team.makeActive('slot2')
                }
                break;
            case 'slot3':
                if(playerNum === 'player1'){
                    this.player1.team.makeActive('slot3')
                } else {
                    this.player2.team.makeActive('slot3')
                }
                break;
            case 'slot4':
                if(playerNum === 'player1'){
                    this.player1.team.makeActive('slot4')
                } else {
                    this.player2.team.makeActive('slot4')
                }
                break;
            case 'slot5':
                if(playerNum === 'player1'){
                    this.player1.team.makeActive('slot5')
                } else {
                    this.player2.team.makeActive('slot5')
                }
                break;
            default:
                break;
        }
    }

    activateDomain(domain){
        this.curr_domain = domain;
    }

    clearDomain(){
        this.curr_domain = 'Neutral';
    }

    putUpHazards(hazard, defendingPlayer){
        // Leave room in if statement for hazard reflecting move or ability
        if(defendingPlayer == 'player1'){
            this.player1_hazards.push(hazard);
        } else {
            this.player2_hazards.push(hazard);
        }
    }

    clearHazards(clearedSides){
        if(clearedSides.includes('player1')){
            this.player1_hazards = [];
        }
        else if(clearedSides.includes('player2')){
            this.player2_hazards = [];
        }
    }

    compareSC(){
        if(this.player1.team.active_slot.beast.curr_sc > this.player2.team.active_slot.beast.curr_sc){
            this.faster_active_beast = 'player1';
        }
        else if(this.player2.team.active_slot.beast.curr_sc < this.player1.team.active_slot.beast.curr_sc){
            this.faster_active_beast = 'player2';
        } else {
            this.faster_active_beast = 'tie';
        }
    }


    incrementFreshness(){
        this.player1.team.active_slot.beast.incrementTurnsIn();
        this.player2.team.active_slot.beast.incrementTurnsIn();
        this.player1.team.incrementTurnsActive();
        this.player2.team.incrementTurnsActive();
    }

    compareFreshness(){
        if(this.player1.team.active_slot.beast.turnsIn < this.player2.team.active_slot.beast.turnsIn){
            this.fresher_active_beast = 'player1';
        }
        else if(this.player2.team.active_slot.beast.turnsIn < this.player1.team.active_slot.beast.turnsIn){
            this.fresher_active_beast = 'player2';
        } else {
            this.fresher_active_beast = 'tie';
        }
    }
}