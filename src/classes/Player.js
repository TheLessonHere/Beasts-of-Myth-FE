export default class Player {
    constructor(playerId, username, profileImg, team){
        this.player_id = playerId;
        this.username = username;
        this.profile_img = profileImg;
        this.team = team;
        this.available_crit_rolls = 4;
        this.spent_crit_rolls = 0;
        this.activated_crit_rolls = 0;
        this.connection = null;
        this.selected_move = null;
        this.hasWon = false;
        this.hasLost = false;
    }

    connectToGame(gameId){
        this.connection = gameId;
    }

    selectMove(move){
        this.selected_move = move;
    }

    clearSelectedMove(){
        this.selected_move = null;
    }

    changeBeast(activeBeast, benchedBeast){
        activeBeast.makeInactive();
        benchedBeast.makeActive();
        this.team.makeActive(benchedBeast.slot)
    }

    activateCritRoll(){
        this.activated_crit_rolls = this.activated_crit_rolls + 1;
    }

    updateCritRolls(spentRolls){
        this.activated_crit_rolls = 0;
        this.available_crit_rolls = this.available_crit_rolls - spentRolls;
    }

    activateSuper(activeBeast){
        const superBeastInfo = this.team.getSuperBeastInfo();
        const superBeast = superBeastInfo.beast;
        this.changeBeast(activeBeast, superBeast);
    }

    forfeitGame(updateRecords){
        this.hasLost = true;
        updateRecords();
    }

    requestTimer(){
        console.log(`${this.username} has requested to start the timer.`)
    }
}