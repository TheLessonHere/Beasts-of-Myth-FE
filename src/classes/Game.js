import { domainEffectivenessMap } from '../utils/functions/domainEffectivenessMap';

export default class Game {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.player1_id = this.player1.player_id;
        this.player2_id = this.player2.player_id;
        this.player1_active_beasts = 5;
        this.player2_active_beasts = 5;
        this.player1_action = this.player1.selected_action;
        this.player2_action = this.player2.selected_action;
        this.fresher_active_beast = null;
        this.faster_active_beast = null;
        this.first_to_act = null;
        this.turn_counter = 0;
        this.curr_domain = 'Neutral';
        this.player1_hazards = [];
        this.player2_hazards = [];
        this.winner = null;
        this.loser = null;
        this.draw = false;
    }

    updateTurnCounter(){
        // Updates turn counter, activates end of turn effects
        this.turn_counter = this.turn_counter + 1;
        this.incrementFreshness();
        this.compareFreshness();
        this.compareSC();
        let effects = {
            p1inflamed: false,
            p2inflamed: false,
            p1itemeffect: null,
            p2itemeffect: null,
            p1diedToBurn: false,
            p1diedToContract: false,
            p2diedToBurn: false,
            p2diedToContract: false
        };
        if(this.player1.team.active_slot.beast){
            if(this.player1.team.active_slot.beast.status === 'Inflamed'){
                const burnDamage = Math.round(this.player1.team.active_slot.beast.init_hp * 0.12);
                this.player1.team.active_slot.beast.updateHP(burnDamage);
                if(this.player1.team.active_slot.beast.curr_hp <= 0){
                    this.player1.team.knockOutBeast(this.player1.team.active_slot.slotNumber);
                    this.player1.team.active_slot.beast.knockOutBeast();
                    this.player1.team.active_slot.beast.makeInactive();
                    this.player1.team.clearActiveSlot();
                    effects.p1diedToBurn = true;
                }
                effects.p1inflamed = true;
            }
            if(this.player1.team.active_slot.beast.item){
                switch(this.player1.team.active_slot.beast.item.item_name){
                    case 'First Aid Kit':
                        this.player1.team.active_slot.beast.item.effect(this.player1.team.active_slot.beast);
                        effects.p1itemeffect = 'First Aid Kit';
                        break;
                    case 'Evil Contract':
                        this.player1.team.active_slot.beast.item.effect(this.player1.team.active_slot.beast);
                        effects.p1itemeffect = 'Evil Contract';
                        if(this.player1.team.active_slot.beast.curr_hp <= 0){
                            this.player1.team.knockOutBeast(this.player1.team.active_slot.slotNumber);
                            this.player1.team.active_slot.beast.knockOutBeast();
                            this.player1.team.active_slot.beast.makeInactive();
                            this.player1.team.clearActiveSlot();
                            effects.p1diedToContract = true;
                        }
                        break;
                    case 'Bright Stone':
                        if(this.player1.team.active_slot.beast.status === null){
                            this.player1.team.active_slot.beast.addStatus('Blinded');
                            this.player1.team.active_slot.beast.updateStatStage('pa', 0.5);
                            this.player1.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Bright Stone';
                        }
                        break;
                    case 'Concussive Turbine':
                        if(this.player1.team.active_slot.beast.status === null){
                            this.player1.team.active_slot.beast.addStatus('Windwhipped');
                            effects.p1itemeffect = 'Concussive Turbine';
                        }
                        break;
                    case 'Entrancing Orb':
                        if(this.player1.team.active_slot.beast.status === null){
                            this.player1.team.active_slot.beast.addStatus('Hypnotized');
                            this.player1.team.active_slot.beast.updateStatStage('md', 0.5);
                            this.player1.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Entrancing Orb';
                        }
                        break;
                    case 'Flame Barb':
                        if(this.player1.team.active_slot.beast.status === null){
                            this.player1.team.active_slot.beast.addStatus('Inflamed');
                            effects.p1itemeffect = 'Flame Barb';
                        }
                        break;
                    case 'Impossible Object':
                        if(this.player1.team.active_slot.beast.status === null){
                            this.player1.team.active_slot.beast.addStatus('Frenzied');
                            effects.p1itemeffect = 'Impossible Object';
                        }
                        break;
                    case 'Mysterious Box':
                        if(this.player1.team.active_slot.beast.status === null){
                            this.player1.team.active_slot.beast.addStatus('Tormented');
                            this.player1.team.active_slot.beast.updateStatStage('ma', 0.5);
                            this.player1.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Mysterious Box';
                        }
                        break;
                    case 'Sprouting Seed':
                        if(this.player1.team.active_slot.beast.status === null){
                            this.player1.team.active_slot.beast.addStatus('Vinebound');
                            this.player1.team.active_slot.beast.updateStatStage('pd', 0.5);
                            this.player1.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Sprouting Seed';
                        }
                        break;
                    case 'Wet Blanket':
                        if(this.player1.team.active_slot.beast.status === null){
                            this.player1.team.active_slot.beast.addStatus('Inundated');
                            this.player1.team.active_slot.beast.updateStatStage('sc', 0.5);
                            this.player1.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Wet Blanket';
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        if(this.player2.team.active_slot.beast){
            if(this.player2.team.active_slot.beast.status === 'Inflamed'){
                const burnDamage = Math.round(this.player2.team.active_slot.beast.init_hp * 0.12);
                this.player2.team.active_slot.beast.updateHP(burnDamage);
                if(this.player2.team.active_slot.beast.curr_hp <= 0){
                    this.player2.team.knockOutBeast(this.player2.team.active_slot.slotNumber);
                    this.player2.team.active_slot.beast.knockOutBeast();
                    this.player2.team.active_slot.beast.makeInactive();
                    this.player2.team.clearActiveSlot();
                    effects.p2diedToBurn = true;
                }
                effects.p2inflamed = true;
            }
            if(this.player2.team.active_slot.beast.item){
                switch(this.player2.team.active_slot.beast.item.item_name){
                    case 'First Aid Kit':
                        this.player2.team.active_slot.beast.item.effect(this.player2.team.active_slot.beast);
                        effects.p1itemeffect = 'First Aid Kit';
                        break;
                    case 'Evil Contract':
                        this.player2.team.active_slot.beast.item.effect(this.player2.team.active_slot.beast);
                        effects.p1itemeffect = 'Evil Contract';
                        if(this.player2.team.active_slot.beast.curr_hp <= 0){
                            this.player2.team.knockOutBeast(this.player2.team.active_slot.slotNumber);
                            this.player2.team.active_slot.beast.knockOutBeast();
                            this.player2.team.active_slot.beast.makeInactive();
                            this.player2.team.clearActiveSlot();
                            effects.p2diedToContract = true;
                        }
                        break;
                    case 'Bright Stone':
                        if(this.player2.team.active_slot.beast.status === null){
                            this.player2.team.active_slot.beast.addStatus('Blinded');
                            this.player2.team.active_slot.beast.updateStatStage('pa', 0.5);
                            this.player2.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Bright Stone';
                        }
                        break;
                    case 'Concussive Turbine':
                        if(this.player2.team.active_slot.beast.status === null){
                            this.player2.team.active_slot.beast.addStatus('Windwhipped');
                            effects.p1itemeffect = 'Concussive Turbine';
                        }
                        break;
                    case 'Entrancing Orb':
                        if(this.player2.team.active_slot.beast.status === null){
                            this.player2.team.active_slot.beast.addStatus('Hypnotized');
                            this.player2.team.active_slot.beast.updateStatStage('md', 0.5);
                            this.player2.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Entrancing Orb';
                        }
                        break;
                    case 'Flame Barb':
                        if(this.player2.team.active_slot.beast.status === null){
                            this.player2.team.active_slot.beast.addStatus('Inflamed');
                            effects.p1itemeffect = 'Flame Barb';
                        }
                        break;
                    case 'Impossible Object':
                        if(this.player2.team.active_slot.beast.status === null){
                            this.player2.team.active_slot.beast.addStatus('Frenzied');
                            effects.p1itemeffect = 'Impossible Object';
                        }
                        break;
                    case 'Mysterious Box':
                        if(this.player2.team.active_slot.beast.status === null){
                            this.player2.team.active_slot.beast.addStatus('Tormented');
                            this.player2.team.active_slot.beast.updateStatStage('ma', 0.5);
                            this.player2.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Mysterious Box';
                        }
                        break;
                    case 'Sprouting Seed':
                        if(this.player2.team.active_slot.beast.status === null){
                            this.player2.team.active_slot.beast.addStatus('Vinebound');
                            this.player2.team.active_slot.beast.updateStatStage('pd', 0.5);
                            this.player2.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Sprouting Seed';
                        }
                        break;
                    case 'Wet Blanket':
                        if(this.player2.team.active_slot.beast.status === null){
                            this.player2.team.active_slot.beast.addStatus('Inundated');
                            this.player2.team.active_slot.beast.updateStatStage('sc', 0.5);
                            this.player2.team.active_slot.beast.updateAllStats();
                            effects.p1itemeffect = 'Wet Blanket';
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return effects;
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

    setFirstToAct(playerNum){
        this.first_to_act = playerNum;
    }

    actionsExecutable(){
        // Checks if both players have selected an action
        if(this.player1_action != null && this.player2_action != null){
            return true;
        } else {
            return false;
        }
    }

    executePlayer1Move(moveSlot, critRolls, critRoll){
        let damage = 0;
        let actionStatement;
        const move = this.player1.team.active_slot.beast.moves.get(moveSlot);
        if(move.action_statement !== null){
            const statement = move.action_statement(this.player1, this.player2);
            console.log(statement);
            actionStatement = {
                moveName: this.player1.team.active_slot.beast.moves.get(moveSlot).move_name,
                statement: statement,
                damage: damage
            };
        } else {
            actionStatement = {
                moveName: this.player1.team.active_slot.beast.moves.get(moveSlot).move_name,
                statement: null,
                damage: damage
            };
        }
        if(this.player1.team.active_slot.beast.moves.get(moveSlot).type == 'status'){
            this.player1.team.active_slot.beast.moves.get(moveSlot).effect(this.player1, this.player2);
        } else {
            damage = this.damageCalculation(this.player1,
                                            this.player2,
                                            this.player1.team.active_slot.beast.moves.get(moveSlot),
                                            this.player1.team.active_slot.beast,
                                            this.player2.team.active_slot.beast,
                                            critRolls,
                                            critRoll);
        }
        actionStatement.damage = damage;
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
        return actionStatement;
    }

    executePlayer2Move(moveSlot, critRolls, critRoll){
        let damage = 0;
        let actionStatement;
        const move = this.player2.team.active_slot.beast.moves.get(moveSlot);
        if(move.action_statement !== null){
            const statement = move.action_statement(this.player2, this.player1);
            console.log(statement);
            actionStatement = {
                moveName: this.player2.team.active_slot.beast.moves.get(moveSlot).move_name,
                statement: statement,
                damage: damage
            };
        } else {
            actionStatement = {
                moveName: this.player2.team.active_slot.beast.moves.get(moveSlot).move_name,
                statement: null,
                damage: damage
            };
        }
        if(this.player2.team.active_slot.beast.moves.get(moveSlot).type == 'status'){
            this.player2.team.active_slot.beast.moves.get(moveSlot).effect(this.player2, this.player1);
        } else {
            damage = this.damageCalculation(this.player2,
                                            this.player1,
                                            this.player2.team.active_slot.beast.moves.get(moveSlot),
                                            this.player2.team.active_slot.beast,
                                            this.player1.team.active_slot.beast,
                                            critRolls,
                                            critRoll);
        }
        actionStatement.damage = damage;
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
        return actionStatement;
    }

    executeActions(){
        let player1ActionCompleted = false;
        let player2ActionCompleted = false;
        let p1ActionStatement;
        let p2ActionStatement;
        let p1Super = false;
        let p2Super = false;
        let firstAction;
        let p1Beast = this.player1.team.active_slot.beast;
        let p2Beast = this.player2.team.active_slot.beast;
        while(player1ActionCompleted == false || player2ActionCompleted == false){
            if(this.player1_action.actionType == 'starting-beast'){
                if(player2ActionCompleted === false){
                    firstAction = 'player1'
                }
                this.player1.startBeast(this.player1_action.startingBeast);
                p1ActionStatement = {
                    statement: `${this.player1.username} sent out ${this.player1_action.startingBeast.beast_name}.`
                }
                player1ActionCompleted = true;
            }
            if(this.player2_action.actionType == 'starting-beast'){
                if(player1ActionCompleted === false){
                    firstAction = 'player2'
                }
                this.player2.startBeast(this.player2_action.startingBeast);
                p2ActionStatement = {
                    statement: `${this.player2.username} sent out ${this.player2_action.startingBeast.beast_name}.`
                }
                player2ActionCompleted = true;
            }
            if(this.player1_action.actionType == 'change-beast'){
                if(player2ActionCompleted === false){
                    firstAction = 'player1'
                }
                const enteringBeast1 = this.player1.team.getSlot(this.player1_action.benchedBeastSlot);
                p1ActionStatement = {
                    statement: `${this.player1.username} withdrew ${this.player1.team.active_slot.beast.beast_name} and sent out ${enteringBeast1.beast.beast_name}.`
                }
                this.player1.changeBeast(this.player1_action.benchedBeastSlot);
                this.compareFreshness();
                this.compareSC();
                p1Beast = this.player1.team.active_slot.beast;
                player1ActionCompleted = true;
            }
            if(this.player2_action.actionType == 'change-beast'){
                if(player1ActionCompleted === false){
                    firstAction = 'player2'
                }
                const enteringBeast2 = this.player2.team.getSlot(this.player2_action.benchedBeastSlot);
                p2ActionStatement = {
                    statement: `${this.player2.username} withdrew ${this.player2.team.active_slot.beast.beast_name} and sent out ${enteringBeast2.beast.beast_name}.`
                }
                this.player2.changeBeast(this.player2_action.benchedBeastSlot);
                this.compareFreshness();
                this.compareSC();
                p2Beast = this.player2.team.active_slot.beast;
                player2ActionCompleted = true;
            }
            if(this.player1_action.actionType == 'select-move' && this.player2_action.actionType == 'select-move'){
                if(this.player1.team.active_slot.beast.moves.get(this.player1_action.moveSlot).priority >
                this.player2.team.active_slot.beast.moves.get(this.player2_action.moveSlot).priority){
                    if(player2ActionCompleted === false){
                        firstAction = 'player1'
                    }
                    if(this.player1_action.superActivated){
                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                        p1Super = true;
                    }
                    if(this.player2_action.superActivated){
                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                        p2Super = true;
                    }
                    p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                    player1ActionCompleted = true;
                    console.log(this.player2.team.active_slot.beast)
                    if(this.player2.team.active_slot.beast === null){
                        this.player2.updateCritRolls(this.player2_action.critRolls);
                        p2ActionStatement = {
                            beastKOd: true,
                            KOstatement: `${this.player2.username}'s beast was knocked out!`
                        };
                        player2ActionCompleted = true;
                    } else {
                        p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                        if(this.player1.team.active_slot.beast === null){
                            p1ActionStatement = {
                                beastKOd: true,
                                statement: p1ActionStatement.statement,
                                damage: p1ActionStatement.damage,
                                moveName: p1ActionStatement.moveName,
                                KOstatement: `${this.player1.username}'s beast was knocked out!`
                            };
                        }
                        player2ActionCompleted = true;
                    }
                }
                else if(this.player1.team.active_slot.beast.moves.get(this.player1_action.moveSlot).priority <
                this.player2.team.active_slot.beast.moves.get(this.player2_action.moveSlot).priority){
                    if(player1ActionCompleted === false){
                        firstAction = 'player2'
                    }
                    if(this.player2_action.superActivated){
                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                        p2Super = true;
                    }
                    if(this.player1_action.superActivated){
                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                        p1Super = true;
                    }
                    p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                    player2ActionCompleted = true;
                    console.log(this.player1.team.active_slot.beast)
                    if(this.player1.team.active_slot.beast === null){
                        this.player1.updateCritRolls(this.player1_action.critRolls);
                        p1ActionStatement = {
                            beastKOd: true,
                            KOstatement: `${this.player1.username}'s beast was knocked out!`
                        };
                        player1ActionCompleted = true;
                    } else {
                        p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                        if(this.player2.team.active_slot.beast === null){
                            p2ActionStatement = {
                                beastKOd: true,
                                statement: p2ActionStatement.statement,
                                damage: p2ActionStatement.damage,
                                moveName: p2ActionStatement.moveName,
                                KOstatement: `${this.player2.username}'s beast was knocked out!`
                            };
                        }
                        player1ActionCompleted = true;
                    }
                } else {
                    this.compareSC();
                    switch(this.faster_active_beast){
                        case 'player1':
                            if(player2ActionCompleted === false){
                                firstAction = 'player1'
                            }
                            if(this.player1_action.superActivated){
                                this.player1.activateSuper(this.player1.team.active_slot.beast);
                                p1Super = true;
                            }
                            if(this.player2_action.superActivated){
                                this.player2.activateSuper(this.player2.team.active_slot.beast);
                                p2Super = true;
                            }
                            p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                            player1ActionCompleted = true;
                            if(this.player2.team.active_slot.beast === null){
                                this.player2.updateCritRolls(this.player2_action.critRolls);
                                p2ActionStatement = {
                                    beastKOd: true,
                                    KOstatement: `${this.player2.username}'s beast was knocked out!`
                                };
                                player2ActionCompleted = true;
                            } else {
                                p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                                if(this.player1.team.active_slot.beast === null){
                                    p1ActionStatement = {
                                        beastKOd: true,
                                        statement: p1ActionStatement.statement,
                                        damage: p1ActionStatement.damage,
                                        moveName: p1ActionStatement.moveName,
                                        KOstatement: `${this.player1.username}'s beast was knocked out!`
                                    };
                                }
                                player2ActionCompleted = true;
                            }
                            break;
                        case 'player2':
                            if(player1ActionCompleted === false){
                                firstAction = 'player2'
                            }
                            if(this.player2_action.superActivated){
                                this.player2.activateSuper(this.player2.team.active_slot.beast);
                                p2Super = true;
                            }
                            if(this.player1_action.superActivated){
                                this.player1.activateSuper(this.player1.team.active_slot.beast);
                                p1Super = true;
                            }
                            p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                            player2ActionCompleted = true;
                            if(this.player1.team.active_slot.beast === null){
                                this.player1.updateCritRolls(this.player1_action.critRolls);
                                p1ActionStatement = {
                                    beastKOd: true,
                                    KOstatement: `${this.player1.username}'s beast was knocked out!`
                                };
                                player1ActionCompleted = true;
                            } else {
                                p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                                if(this.player2.team.active_slot.beast === null){
                                    p2ActionStatement = {
                                        beastKOd: true,
                                        statement: p2ActionStatement.statement,
                                        damage: p2ActionStatement.damage,
                                        moveName: p2ActionStatement.moveName,
                                        KOstatement: `${this.player2.username}'s beast was knocked out!`
                                    };
                                }
                                player1ActionCompleted = true;
                            }
                            break;
                        case 'tie':
                            this.compareFreshness();
                            switch(this.fresher_active_beast){
                                case 'player1':
                                    if(player2ActionCompleted === false){
                                        firstAction = 'player1'
                                    }
                                    if(this.player1_action.superActivated){
                                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                                        p1Super = true;
                                    }
                                    if(this.player2_action.superActivated){
                                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                                        p2Super = true;
                                    }
                                    p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                                    player1ActionCompleted = true;
                                    if(this.player2.team.active_slot.beast === null){
                                        this.player2.updateCritRolls(this.player2_action.critRolls);
                                        p2ActionStatement = {
                                            beastKOd: true,
                                            KOstatement: `${this.player2.username}'s beast was knocked out!`
                                        };
                                        player2ActionCompleted = true;
                                    } else {
                                        p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                                        if(this.player1.team.active_slot.beast === null){
                                            p1ActionStatement = {
                                                beastKOd: true,
                                                statement: p1ActionStatement.statement,
                                                damage: p1ActionStatement.damage,
                                                moveName: p1ActionStatement.moveName,
                                                KOstatement: `${this.player1.username}'s beast was knocked out!`
                                            };
                                        }
                                        player2ActionCompleted = true;
                                    }
                                    break;
                                case 'player2':
                                    if(player1ActionCompleted === false){
                                        firstAction = 'player2'
                                    }
                                    if(this.player2_action.superActivated){
                                        this.player2.activateSuper(this.player2.team.active_slot.beast);
                                        p2Super = true;
                                    }
                                    if(this.player1_action.superActivated){
                                        this.player1.activateSuper(this.player1.team.active_slot.beast);
                                        p1Super = true;
                                    }
                                    p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                                    player2ActionCompleted = true;
                                    if(this.player1.team.active_slot.beast === null){
                                        this.player1.updateCritRolls(this.player1_action.critRolls);
                                        p1ActionStatement = {
                                            beastKOd: true,
                                            KOstatement: `${this.player1.username}'s beast was knocked out!`
                                        };
                                        player1ActionCompleted = true;
                                    } else {
                                        p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                                        if(this.player2.team.active_slot.beast === null){
                                            p2ActionStatement = {
                                                beastKOd: true,
                                                statement: p2ActionStatement.statement,
                                                damage: p2ActionStatement.damage,
                                                moveName: p2ActionStatement.moveName,
                                                KOstatement: `${this.player2.username}'s beast was knocked out!`
                                            };
                                        }
                                        player1ActionCompleted = true;
                                    }
                                    break;
                                case 'tie':
                                    if(this.first_to_act === 'player1'){
                                        if(player2ActionCompleted === false){
                                            firstAction = 'player1'
                                        }
                                        if(this.player1_action.superActivated){
                                            this.player1.activateSuper(this.player1.team.active_slot.beast);
                                            p1Super = true;
                                        }
                                        if(this.player2_action.superActivated){
                                            this.player2.activateSuper(this.player2.team.active_slot.beast);
                                            p2Super = true;
                                        }
                                        p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                                        player1ActionCompleted = true;
                                        if(this.player2.team.active_slot.beast === null){
                                            this.player2.updateCritRolls(this.player2_action.critRolls);
                                            p2ActionStatement = {
                                                beastKOd: true,
                                                KOstatement: `${this.player2.username}'s beast was knocked out!`
                                            };
                                            player2ActionCompleted = true;
                                        } else {
                                            p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                                            if(this.player1.team.active_slot.beast === null){
                                                p1ActionStatement = {
                                                    beastKOd: true,
                                                    statement: p1ActionStatement.statement,
                                                    damage: p1ActionStatement.damage,
                                                    moveName: p1ActionStatement.moveName,
                                                    KOstatement: `${this.player1.username}'s beast was knocked out!`
                                                };
                                            }
                                            player2ActionCompleted = true;
                                        }
                                        break;
                                    }
                                    else if(this.first_to_act === 'player2'){
                                        if(player1ActionCompleted === false){
                                            firstAction = 'player2'
                                        }
                                        if(this.player2_action.superActivated){
                                            this.player2.activateSuper(this.player2.team.active_slot.beast);
                                            p2Super = true;
                                        }
                                        if(this.player1_action.superActivated){
                                            this.player1.activateSuper(this.player1.team.active_slot.beast);
                                            p1Super = true;
                                        }
                                        p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                                        player2ActionCompleted = true;
                                        if(this.player1.team.active_slot.beast === null){
                                            this.player1.updateCritRolls(this.player1_action.critRolls);
                                            p1ActionStatement = {
                                                beastKOd: true,
                                                KOstatement: `${this.player1.username}'s beast was knocked out!`
                                            };
                                            player1ActionCompleted = true;
                                        } else {
                                            p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                                            if(this.player2.team.active_slot.beast === null){
                                                p2ActionStatement = {
                                                    beastKOd: true,
                                                    statement: p2ActionStatement.statement,
                                                    damage: p2ActionStatement.damage,
                                                    moveName: p2ActionStatement.moveName,
                                                    KOstatement: `${this.player2.username}'s beast was knocked out!`
                                                }
                                            }
                                            player1ActionCompleted = true;
                                        }
                                        break;
                                    } else {
                                        if(player2ActionCompleted === false){
                                            firstAction = 'player1'
                                        }
                                        if(this.player1_action.superActivated){
                                            this.player1.activateSuper(this.player1.team.active_slot.beast);
                                            p1Super = true;
                                        }
                                        if(this.player2_action.superActivated){
                                            this.player2.activateSuper(this.player2.team.active_slot.beast);
                                            p2Super = true;
                                        }
                                        p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                                        player1ActionCompleted = true;
                                        if(this.player2.team.active_slot.beast === null){
                                            this.player2.updateCritRolls(this.player2_action.critRolls);
                                            p2ActionStatement = {
                                                beastKOd: true,
                                                KOstatement: `${this.player2.username}'s beast was knocked out!`
                                            };
                                            player2ActionCompleted = true;
                                        } else {
                                            p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                                            if(this.player1.team.active_slot.beast === null){
                                                p1ActionStatement = {
                                                    beastKOd: true,
                                                    statement: p1ActionStatement.statement,
                                                    damage: p1ActionStatement.damage,
                                                    moveName: p1ActionStatement.moveName,
                                                    KOstatement: `${this.player1.username}'s beast was knocked out!`
                                                };
                                            }
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
            if(this.player1_action.actionType == 'select-move' && this.player2_action.actionType !== 'select-move'){
                if(this.player1_action.superActivated){
                    this.player1.activateSuper(this.player1.team.active_slot.beast);
                    p1Super = true;
                }
                p1ActionStatement = this.executePlayer1Move(this.player1_action.moveSlot, this.player1_action.critRolls, this.player1_action.critRoll);
                if(this.player2.team.active_slot.beast === null){
                    p2ActionStatement = {
                        beastKOd: true,
                        statement: p2ActionStatement.statement,
                        KOstatement: `${this.player2.username}'s beast was knocked out!`
                    };
                }
                player1ActionCompleted = true;
            }
            if(this.player2_action.actionType == 'select-move' && this.player1_action.actionType !== 'select-move'){
                if(this.player2_action.superActivated){
                    this.player2.activateSuper(this.player2.team.active_slot.beast);
                    p2Super = true;
                }
                p2ActionStatement = this.executePlayer2Move(this.player2_action.moveSlot, this.player2_action.critRolls, this.player2_action.critRoll);
                if(this.player1.team.active_slot.beast === null){
                    p1ActionStatement = {
                        beastKOd: true,
                        statement: p1ActionStatement.statement,
                        KOstatement: `${this.player1.username}'s beast was knocked out!`
                    };
                }
                player2ActionCompleted = true;
            }
        }
        if(this.player1_action.actionType === 'starting-beast' &&
        this.player2_action.actionType === 'starting-beast'){
            let eotEffects = {
                p1inflamed: false,
                p2inflamed: false,
                p1itemeffect: null,
                p2itemeffect: null
            };
            this.player1.clearAction();
            this.player1_action = null;
            this.player2.clearAction();
            this.player2_action = null;
            this.first_to_act = null;
            return {
                firstAction: firstAction,
                p1ActionStatement: p1ActionStatement,
                p2ActionStatement: p2ActionStatement,
                p1Super: p1Super,
                p2Super: p2Super,
                p1Beast: p1Beast,
                p2Beast: p2Beast,
                hazardDeath: false,
                eotEffects: eotEffects
            };
        } else {
            const eotEffects = this.updateTurnCounter();
            this.player1.clearAction();
            this.player1_action = null;
            this.player2.clearAction();
            this.player2_action = null;
            this.first_to_act = null;
            return {
                firstAction: firstAction,
                p1ActionStatement: p1ActionStatement,
                p2ActionStatement: p2ActionStatement,
                p1Super: p1Super,
                p2Super: p2Super,
                p1Beast: p1Beast,
                p2Beast: p2Beast,
                hazardDeath: false,
                eotEffects: eotEffects
            };
        }
    }

    critRoll(critRolls){
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
                    let randomInt25 = getRandomInt(1, 4);
                    if(randomInt25 === 1){
                        randomInt25 = true;
                    } else {
                    randomInt25 = false;
                    };
                    return randomInt25;
                case 2:
                    let randomInt50 = getRandomInt(1, 2);
                    if(randomInt50 === 1){
                        randomInt50 = true;
                    } else {
                    randomInt50 = false;
                    };
                    return randomInt50;
                case 3:
                    let randomInt75 = getRandomInt(1, 4);
                    if(randomInt75 === 1){
                        randomInt75 = false;
                    } else {
                    randomInt75 = true;
                    };
                    return randomInt75;
                case 4:
                    return true;
            }
          }

          const critRoll = rollCrit(critRolls);
          return critRoll;
    }

    amuletCalculation(item_name, moveDomain){
        switch(item_name){
            case 'Chaos Amulet':
                if(moveDomain === 'chaos'){
                    return 1.2;
                }
                break;
            case 'Dark Amulet':
                if(moveDomain === 'dark'){
                    return 1.2;
                }
                break;
            case 'Light Amulet':
                if(moveDomain === 'light'){
                    return 1.2;
                }
                break;
            case 'Mind Amulet':
                if(moveDomain === 'mind'){
                    return 1.2;
                }
                break;
            case 'Terra Amulet':
                if(moveDomain === 'terra'){
                    return 1.2;
                }
                break;
            case 'Flame Amulet':
                if(moveDomain === 'flame'){
                    return 1.2;
                }
                break;
            case 'Sea Amulet':
                if(moveDomain === 'sea'){
                    return 1.2;
                }
                break;
            case 'Sky Amulet':
                if(moveDomain === 'sky'){
                    return 1.2;
                }
                break;
            default:
                return 1;
        }
        return 1;
    }

    damageCalculation(attackingPlayer, defendingPlayer, move, attackingBeast, defendingBeast, critRolls, critRoll){
        let domainModifier = 1;
        const moveType = move.type;
        const basePower = move.base_power;
        const moveDomain = move.domain;
        const attackingDomain1 = attackingBeast.domain1;
        const attackingDomain2 = attackingBeast.domain2;
        const defendingDomain = `${defendingBeast.domain1}-${defendingBeast.domain2}`;
        const effectiveness = domainEffectivenessMap.get(moveDomain)[defendingDomain];
        let amuletModifier;
        if(attackingBeast.item){
            amuletModifier = this.amuletCalculation(attackingBeast.item.item_name, moveDomain);
        }
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

        let rawDamage = 0;
        let damage;
        let assistBrace = false;
        let spikyCap = false;
        let spikyVest = false;
        let spikyDamage = 0;
        let diedToRecoil = false;

        if(moveType == 'physical'){
            rawDamage = (((basePower + sameTypeBonus) * domainModifier) * (attackingBeast.curr_pa / defendingBeast.curr_pd)) * amuletModifier * effectiveness;
            if(defendingBeast.item && defendingBeast.item.item_name === "Spiky Vest"){
                spikyVest = true;
                spikyDamage = Math.round(defendingBeast.init_hp / 8);
            }
            damage = Math.round(rawDamage * 100) / 100;
            if(critRoll){
                damage = damage * 2;
            }
        } else {
            rawDamage = (((basePower + sameTypeBonus) * domainModifier) * (attackingBeast.curr_ma / defendingBeast.curr_md)) * amuletModifier * effectiveness;
            if(defendingBeast.item && defendingBeast.item.item_name === "Spiky Cap"){
                spikyCap = true;
                spikyDamage = Math.round(defendingBeast.init_hp / 8);
            }
            damage = Math.round(rawDamage * 100) / 100;
            if(critRoll){
                damage = damage * 2;
            }
        }

        attackingPlayer.updateCritRolls(critRolls);

        if(defendingBeast.hp_percentage === 100 &&
            defendingBeast.item.item_name === "Assist Brace" &&
            damage >= defendingBeast.curr_hp){
                damage = defendingBeast.curr_hp - 1;
                assistBrace = true;
        }

        defendingBeast.updateHP(damage);
        if(spikyDamage > 0){
            attackingBeast.updateHP(spikyDamage);
        }
        if(defendingBeast.curr_hp <= 0){
            defendingPlayer.team.knockOutBeast(defendingPlayer.team.active_slot.slotNumber);
            defendingBeast.knockOutBeast();
            if(attackingBeast.curr_hp <= 0){
                attackingPlayer.team.knockOutBeast(attackingPlayer.team.active_slot.slotNumber);
                attackingBeast.knockOutBeast();
                diedToRecoil = true;
            }
            if(defendingPlayer.player_num === 'player1'){
                this.player1_active_beasts = this.player1_active_beasts - 1;
                if(diedToRecoil){
                    this.player2_active_beasts = this.player2_active_beasts - 1;
                }
                if(this.player1_active_beasts <= 0 && this.player2_active_beasts <= 0){
                    this.draw = true;
                    this.player1.hasTied();
                    this.player2.hasTied();
                }
                if(this.player1_active_beasts <= 0){
                    this.winner = this.player2;
                    this.player2.hasWon();
                    this.loser = this.player1;
                    this.player1.hasLost();
                }
            } else {
                this.player2_active_beasts = this.player2_active_beasts - 1;
                if(diedToRecoil){
                    this.player1_active_beasts = this.player1_active_beasts - 1;
                }
                if(this.player1_active_beasts <= 0 && this.player2_active_beasts <= 0){
                    this.draw = true;
                    this.player1.hasTied();
                    this.player2.hasTied();
                }
                if(this.player2_active_beasts <= 0){
                    this.winner = this.player1;
                    this.player1.hasWon();
                    this.loser = this.player2;
                    this.player2.hasLost();
                }
            }
            defendingPlayer.team.active_slot.beast.makeInactive();
            defendingPlayer.team.clearActiveSlot();
            if(diedToRecoil){
                attackingPlayer.team.active_slot.beast.makeInactive();
                attackingPlayer.team.clearActiveSlot();
            }
        }
        return {
            damage: damage,
            assistBrace: assistBrace,
            spikyVest: spikyVest,
            spikyCap: spikyCap,
            critRoll: critRoll,
            diedToRecoil: diedToRecoil
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
        this.compareFreshness();
        this.compareSC();
    }

    activateDomain(domain){
        this.curr_domain = domain;
    }

    clearDomain(){
        this.curr_domain = 'Neutral';
    }

    putUpHazards(hazard, defendingPlayer){
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
        if(this.player1.team.active_slot.beast && this.player2.team.active_slot.beast){
            if(this.player1.team.active_slot.beast.curr_sc > this.player2.team.active_slot.beast.curr_sc){
                this.faster_active_beast = 'player1';
            }
            else if(this.player2.team.active_slot.beast.curr_sc > this.player1.team.active_slot.beast.curr_sc){
                this.faster_active_beast = 'player2';
            } else {
                this.faster_active_beast = 'tie';
            }
        }
    }


    incrementFreshness(){
        if(this.player1.team.active_slot.beast){
            this.player1.team.active_slot.beast.incrementTurnsIn();
            this.player1.team.incrementTurnsActive();
        }
        if(this.player2.team.active_slot.beast){
            this.player2.team.active_slot.beast.incrementTurnsIn();
            this.player2.team.incrementTurnsActive();
        }
    }

    compareFreshness(){
        if(this.player1.team.active_slot.beast && this.player2.team.active_slot.beast){
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
}