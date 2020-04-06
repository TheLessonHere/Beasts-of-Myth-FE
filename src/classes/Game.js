export default class Game {
    constructor(player1, player2){
        this.player1_id = player1.player_id;
        this.player2_id = player2.player_id;
        this.player1_username = player1.username;
        this.player2_username = player2.username;
        this.player1_team = player1.team;
        this.player2_team = player2.team;
        this.player1_active_beasts = this.player1_team.total_beasts;
        this.player2_active_beasts = this.player2_team.total_beasts;
        this.player1_curr_active_beast = this.player1_team.active_slot.beast;
        this.player2_curr_active_beast = this.player2_team.active_slot.beast;
        this.player1_active_moves = this.player1_curr_active_beast.moves;
        this.player2_active_moves = this.player2_curr_active_beast.moves;
        this.player1_action = player1.action;
        this.player2_action = player2.action;
        this.fresher_active_beast = null;
        this.turn_counter = 0;
        this.curr_domain = null;
        this.player1_hazards = [];
        this.player2_hazards = [];
        this.winner = null;
        this.loser = null;
    }

    updateTurnCounter(){
        this.turn_counter = this.turn_counter + 1;
    }

    executeActions(){

    }

    statusApplication(move){

    }

    damageCalculation(move, attackingBeast, defendingBeast){

    }

    activateDomain(domain){

    }

    clearDomain(){

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

    updateFreshness(){

    }

    compareFreshness(){

    }
}