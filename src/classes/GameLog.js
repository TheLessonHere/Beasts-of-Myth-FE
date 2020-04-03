export default class GameLog {
    constructor(game){
        this.game = game;
        this.game_log = new Map();
        this.turn_counter = this.game.turn_counter
    }

    updateTurnCounter(){
        this.turn_counter = this.turn_counter + 1;
    }

    updateGameLog(player1Action, player2Action){
        const turnIndex = this.turn_counter;
        this.game_log.set(turnIndex, `p1:${player1Action}, p2:${player2Action}`)
    }
}