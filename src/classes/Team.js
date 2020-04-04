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

    getSuperBeastInfo(){
        return this.super_beast;
    }

    getSlot(slot){
        switch(slot){
            case 'slot1':
                return this.slot1;
            case 'slot2':
                return this.slot2;
            case 'slot3':
                return this.slot3;
            case 'slot4':
                return this.slot4;
            case 'slot5':
                return this.slot5;
            default:
                return null;
        }
    }

    makeActive(slot){

    }

    validateTeam(){

    }
}