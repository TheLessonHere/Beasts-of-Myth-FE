export default class Game {
    constructor(player1, player2){
        this.player1_id = player1.player_id;
        this.player2_id = player2.player_id;
        this.player1_team = player1.team;
        this.player2_team = player2.team;
        this.player1_active_beasts = this.player1_team.total_beasts;
        this.player2_active_beasts = this.player2_team.total_beasts;
        this.player1_curr_active_beast = this.player1_team.active_slot.beast;
        this.player2_curr_active_beast = this.player2_team.active_slot.beast;
        this.player1_active_moves = this.player1_curr_active_beast.moves;
        this.player2_active_moves = this.player2_curr_active_beast.moves;
        this.fresher_active_beast = null;
        this.turn_counter = 0;
        this.curr_domain = null;
        this.winner = null;
        this.loser = null;
    }

    updateTurnCounter(){
        this.turn_counter = this.turn_counter + 1;
    }

    executeActions(p1action, p2action){

    }

    statusApplication(move){

    }

    damageCalculation(move, attackingBeast, defendingBeast){

    }

    activateDomain(domain){

    }

    clearDomain(){

    }

    updateFreshness(){

    }

    compareFreshness(){

    }
}