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
        this.selected_action = null;
        this.hasWon = false;
        this.hasLost = false;
    }

    connectToGame(gameId){
        this.connection = gameId;
    }

    selectAction(action){
        this.selected_action = action;
    }

    clearAction(){
        this.selected_action = null;
    }

    selectMove(move, superActivated){
        const selectMoveAction = {
            actionType: 'select-move',
            move: move,
            superActivated: superActivated
        }

        return selectMoveAction;
    }

    selectBeastChange(benchedBeast){
        const changeBeastAction = {
            actionType: 'change-beast',
            activeBeast: this.team.active_slot.beast,
            benchedBeast: benchedBeast
        }

        return changeBeastAction;
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
        const superBeast = this.team.getSuperBeastInfo();
        this.team.changeToSuper(superBeast, superBeast.slot);
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