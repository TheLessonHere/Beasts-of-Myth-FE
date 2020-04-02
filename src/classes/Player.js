export default class Player {
    constructor(playerId, username, profileImg, team){
        this.player_id = playerId;
        this.username = username;
        this.profile_img = profileImg;
        this.team = team;
        this.available_crit_rolls = 4;
        this.spent_crit_rolls = 0;
        this.activated_crit_rolls = 0;
        this.connection = "";
    }

    connectToGame(gameId){

    }

    selectMove(move){

    }

    changeBeast(activeBeast, benchedBeast){

    }

    activateCritRoll(){

    }

    updateCritRolls(spentRolls){

    }

    activateSuper(beast){

    }

    forfeitGame(){

    }

    requestTimer(){

    }
}