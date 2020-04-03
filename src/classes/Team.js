import Beast from './Beast';

export default class Team {
    constructor(format, teamName){
        this.format = format;
        this.team_name = teamName;
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
        this.super_beast = {
            beast: null,
            slot: null,
            adjacentSlots: []
        }
        this.active_slot = {
            beast: null,
            adjacentSlots: [],
            turnsActive: 0
        }
        this.total_beasts = 0;
    }

    addBeast(beast){

    }

    removeBeast(){

    }

    fillInTeamFromString(team_datastring){

    }

    updateSuperSlot(){

    }

    makeActive(slot){

    }

    validateTeam(){

    }
}