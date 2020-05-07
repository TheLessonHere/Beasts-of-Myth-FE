export default class Player {
    constructor(playerId, username, playerNum, profileImg, team){
        this.player_id = playerId;
        this.username = username;
        this.player_num = playerNum;
        this.profile_img = profileImg;
        this.team = team;
        this.available_crit_rolls = 4;
        this.spent_crit_rolls = 0;
        this.connection = null;
        this.selected_action = null;
        this.has_won = false;
        this.has_lost = false;
        this.has_tied = false;
    }

    connectToGame(gameId){
        this.connection = gameId;
    }

    hasWon(){
        this.has_won = true;
    }

    hasLost(){
        this.has_lost = true;
    }

    hasTied(){
        this.has_tied = true;
    }

    selectAction(action){
        this.selected_action = action;
    }

    clearAction(){
        this.selected_action = null;
    }

    selectStartingBeast(beast){
        const startingBeastAction = {
            actionType: 'starting-beast',
            startingBeast: beast
        }

        return startingBeastAction;
    }

    selectMove(move, moveSlot, superActivated, critRolls){
        const selectMoveAction = {
            actionType: 'select-move',
            move: move,
            moveSlot: moveSlot,
            superActivated: superActivated,
            critRolls: critRolls
        }

        return selectMoveAction;
    }

    selectBeastChange(benchedBeastSlot){
        const changeBeastAction = {
            actionType: 'change-beast',
            benchedBeastSlot: benchedBeastSlot
        }

        return changeBeastAction;
    }

    startBeast(beast){
        this.team.makeActive(beast.slot);
    }

    changeBeast(benchedBeastSlot){
        this.team.active_slot.beast.makeInactive();
        this.team.makeActive(benchedBeastSlot);
    }

    updateCritRolls(spentRolls){
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