export default class Team {
    constructor(){
        this.slot1 = {
            beast: null,
            adjacentSlots: [this.slot2]
        };
        this.slot2 = {
            beast: null,
            adjacentSlots: [this.slot1, this.slot3]
        };
        this.slot3 = {
            beast: null,
            adjacentSlots: [this.slot2, this.slot4]
        };
        this.slot4 = {
            beast: null,
            adjacentSlots: [this.slot3, this.slot5]
        };
        this.slot5 = {
            beast: null,
            adjacentSlots: [this.slot4]
        };
    }

    addMove(move, move_slot){

    }

    addItem(item){

    }

    addStatus(status){

    }

    increaseStat(stat, multiplier){

    }

    decreaseStat(stat, divisor){

    }

    resetStats(){

    }

    disableMove(move){

    }

    resetMoves(){

    }
}