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

    executePlayer1Move(){
        if(this.player1_action.move.type == 'status'){
            this.player1_action.move.effect(this.player1, this.player2);
        } else {
            this.damageCalculation(this.player1_action.move,
                                    this.player1.team.active_slot.beast,
                                    this.player2.team.active_slot.beast);
        }
    }

    executePlayer2Move(){
        if(this.player2_action.move.type == 'status'){
            this.player2_action.move.effect(this.player2, this.player1);
        } else {
            this.damageCalculation(this.player2_action.move,
                                    this.player2.team.active_slot.beast,
                                    this.player1.team.active_slot.beast);
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
                if(this.player1_action.move.priority > this.player2_action.move.priority){
                    if(this.player1_action.superActivated){
                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                    }
                    if(this.player2_action.superActivated){
                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                    }
                    this.executePlayer1Move();
                    player1ActionCompleted = true;
                    this.executePlayer2Move();
                    player2ActionCompleted = true;
                }
                else if(this.player1_action.move.priority < this.player2_action.move.priority){
                    if(this.player2_action.superActivated){
                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                    }
                    if(this.player1_action.superActivated){
                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                    }
                    this.executePlayer2Move();
                    player2ActionCompleted = true;
                    this.executePlayer1Move();
                    player1ActionCompleted = true;
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
                            this.executePlayer1Move();
                            player1ActionCompleted = true;
                            this.executePlayer2Move();
                            player2ActionCompleted = true;
                            break;
                        case 'player2':
                            if(this.player2_action.superActivated){
                                this.player2.activateSuper(this.player2.team.active_slot.beast);
                            }
                            if(this.player1_action.superActivated){
                                this.player1.activateSuper(this.player1.team.active_slot.beast);
                            }
                            this.executePlayer2Move();
                            player2ActionCompleted = true;
                            this.executePlayer1Move();
                            player1ActionCompleted = true;
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
                                    this.executePlayer1Move();
                                    player1ActionCompleted = true;
                                    this.executePlayer2Move();
                                    player2ActionCompleted = true;
                                    break;
                                case 'player2':
                                    if(this.player2_action.superActivated){
                                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                                    }
                                    if(this.player1_action.superActivated){
                                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                                    }
                                    this.executePlayer2Move();
                                    player2ActionCompleted = true;
                                    this.executePlayer1Move();
                                    player1ActionCompleted = true;
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
                                        this.executePlayer1Move();
                                        player1ActionCompleted = true;
                                        this.executePlayer2Move();
                                        player2ActionCompleted = true;
                                        break;
                                    }
                                    else if(player2Roll > player1Roll){
                                        if(this.player2_action.superActivated){
                                            this.player2.activateSuper(this.player2.team.active_slot.beast);
                                        }
                                        if(this.player1_action.superActivated){
                                            this.player1.activateSuper(this.player1.team.active_slot.beast);
                                        }
                                        this.executePlayer2Move();
                                        player2ActionCompleted = true;
                                        this.executePlayer1Move();
                                        player1ActionCompleted = true;
                                        break;
                                    } else {
                                        if(this.player1_action.superActivated){
                                            this.player1.activateSuper(this.player1.team.active_slot.beast);
                                        }
                                        if(this.player2_action.superActivated){
                                            this.player2.activateSuper(this.player2.team.active_slot.beast);
                                        }
                                        this.executePlayer1Move();
                                        player1ActionCompleted = true;
                                        this.executePlayer2Move();
                                        player2ActionCompleted = true;
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
                this.executePlayer1Move();
                player1ActionCompleted = true;
            }
            if(this.player2_action.actionType == 'select-move' && this.player1_action.actionType != 'select-move'){
                if(this.player2_action.superActivated){
                    this.player2.activateSuper(this.player2.team.active_slot.beast);
                }
                this.executePlayer2Move();
                player2ActionCompleted = true;
            }
        }
        this.player1.clearAction();
        this.player1_action = null;
        this.player2.clearAction();
        this.player2_action = null;
        return;
    }

    damageCalculation(move, attackingBeast, defendingBeast){
        let domainModifier = 1;
        const moveType = move.type;
        const basePower = move.basePower;
        const moveDomain = move.domain;
        const attackingDomain1 = attackingBeast.domain1;
        const attackingDomain2 = attackingBeast.domain2;
        const defendingDomain = `${defendingBeast.domain1}-${defendingBeast.domain2}`;
        const effectiveness = domainEffectivenessMap[moveType][defendingDomain];
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

        move.decrementME();

        let damage = 0;
        if(moveType == 'physical'){
            damage = ((((basePower + sameTypeBonus) * domainModifier) + attackingBeast.curr_pa) - defendingBeast.curr_pd) * effectiveness;
        } else {
            damage = ((((basePower + sameTypeBonus) * domainModifier) + attackingBeast.curr_ma) - defendingBeast.curr_md) * effectiveness;
        }

        defendingBeast.updateHP(damage);
        if(defendingBeast.curr_hp <= 0){
            defendingBeast.knockOutBeast();
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