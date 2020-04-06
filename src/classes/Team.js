import { beasts } from '../data/libraries/BeastLibrary';
import Beast from './Beast';
import parseTeamDatastring from '../utils/parseTeamDatastring';
import serializeTeamDatastring from '../utils/serializeTeamDatastring';

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

    addBeast(beast, slot){
        switch(slot){
            case 'slot1':
                this.slot1.beast = beast;
                break;
            case 'slot2':
                this.slot2.beast = beast;
                break;
            case 'slot3':
                this.slot3.beast = beast;
                break;
            case 'slot4':
                this.slot4.beast = beast;
                break;
            case 'slot5':
                this.slot5.beast = beast;
                break;
            default:
                if(this.slot1.beast == null){
                    this.slot1.beast = beast;
                    return;
                }
                else if(this.slot2.beast == null){
                    this.slot2.beast = beast;
                    return;
                }
                else if(this.slot3.beast == null){
                    this.slot3.beast = beast;
                    return;
                }
                else if(this.slot4.beast == null){
                    this.slot4.beast = beast;
                    return;
                }
                else if(this.slot5.beast == null){
                    this.slot5.beast = beast;
                    return;
                } else {
                    this.slot1.beast = beast;
                    return;
                }
        }
    }

    removeBeast(slot){
        switch(slot){
            case 'slot1':
                this.slot1.beast = null;
                break;
            case 'slot2':
                this.slot2.beast = null;
                break;
            case 'slot3':
                this.slot3.beast = null;
                break;
            case 'slot4':
                this.slot4.beast = null;
                break;
            case 'slot5':
                this.slot5.beast = null;
                break;
            default:
                console.log("Invalid slot number.")
        }
    }

    fillInTeamFromString(team_datastring){

    }

    convertToString(){

    }

    updateSuperSlot(){
        if(this.slot1.beast.item == 'Super Crystal'){
            const superBeastData = beasts.find(beast => {
                beast.beast_name == `${this.slot1.beast.beast_name}-Super`;
            });
            const superBeast = new Beast(superBeastData.beast_id,
                                        superBeastData.beast_name,
                                        superBeastData.domain1,
                                        superBeastData.domain2,
                                        superBeastData.ability,
                                        superBeastData.hp,
                                        superBeastData.pa,
                                        superBeastData.pd,
                                        superBeastData.ma,
                                        superBeastData.md,
                                        superBeastData.sc,
                                        superBeastData.move_list);
            this.super_beast.beast = superBeast;
            this.super_beast.adjacentSlots = this.slot1.adjacentSlots;
        }
        else if(this.slot2.beast.item == 'Super Crystal'){
            const superBeastData = beasts.find(beast => {
                beast.beast_name == `${this.slot1.beast.beast_name}-Super`;
            });
            const superBeast = new Beast(superBeastData.beast_id,
                                        superBeastData.beast_name,
                                        superBeastData.domain1,
                                        superBeastData.domain2,
                                        superBeastData.ability,
                                        superBeastData.hp,
                                        superBeastData.pa,
                                        superBeastData.pd,
                                        superBeastData.ma,
                                        superBeastData.md,
                                        superBeastData.sc,
                                        superBeastData.move_list);
            this.super_beast.beast = superBeast;
            this.super_beast.adjacentSlots = this.slot2.adjacentSlots;
        }
        else if(this.slot3.beast.item == 'Super Crystal'){
            const superBeastData = beasts.find(beast => {
                beast.beast_name == `${this.slot1.beast.beast_name}-Super`;
            });
            const superBeast = new Beast(superBeastData.beast_id,
                                        superBeastData.beast_name,
                                        superBeastData.domain1,
                                        superBeastData.domain2,
                                        superBeastData.ability,
                                        superBeastData.hp,
                                        superBeastData.pa,
                                        superBeastData.pd,
                                        superBeastData.ma,
                                        superBeastData.md,
                                        superBeastData.sc,
                                        superBeastData.move_list);
            this.super_beast.beast = superBeast;
            this.super_beast.adjacentSlots = this.slot3.adjacentSlots;
        }
        else if(this.slot4.beast.item == 'Super Crystal'){
            const superBeastData = beasts.find(beast => {
                beast.beast_name == `${this.slot1.beast.beast_name}-Super`;
            });
            const superBeast = new Beast(superBeastData.beast_id,
                                        superBeastData.beast_name,
                                        superBeastData.domain1,
                                        superBeastData.domain2,
                                        superBeastData.ability,
                                        superBeastData.hp,
                                        superBeastData.pa,
                                        superBeastData.pd,
                                        superBeastData.ma,
                                        superBeastData.md,
                                        superBeastData.sc,
                                        superBeastData.move_list);
            this.super_beast.beast = superBeast;
            this.super_beast.adjacentSlots = this.slot4.adjacentSlots;
        }
        else if(this.slot5.beast.item == 'Super Crystal'){
            const superBeastData = beasts.find(beast => {
                beast.beast_name == `${this.slot1.beast.beast_name}-Super`;
            });
            const superBeast = new Beast(superBeastData.beast_id,
                                        superBeastData.beast_name,
                                        superBeastData.domain1,
                                        superBeastData.domain2,
                                        superBeastData.ability,
                                        superBeastData.hp,
                                        superBeastData.pa,
                                        superBeastData.pd,
                                        superBeastData.ma,
                                        superBeastData.md,
                                        superBeastData.sc,
                                        superBeastData.move_list);
            this.super_beast.beast = superBeast;
            this.super_beast.adjacentSlots = this.slot5.adjacentSlots;
        } else {
            this.super_beast.beast = null;
            this.super_beast.adjacentSlots = [];
        }
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
        switch(slot){
            case 'slot1':
                this.active_slot.beast = this.slot1.beast;
                this.active_slot.adjacentSlots = this.slot1.adjacentSlots;
                this.active_slot.turnsActive = 0;
                break;
            case 'slot2':
                this.active_slot.beast = this.slot2.beast;
                this.active_slot.adjacentSlots = this.slot2.adjacentSlots;
                this.active_slot.turnsActive = 0;
                break;
            case 'slot3':
                this.active_slot.beast = this.slot3.beast;
                this.active_slot.adjacentSlots = this.slot3.adjacentSlots;
                this.active_slot.turnsActive = 0;
                break;
            case 'slot4':
                this.active_slot.beast = this.slot4.beast;
                this.active_slot.adjacentSlots = this.slot4.adjacentSlots;
                this.active_slot.turnsActive = 0;
                break;
            case 'slot5':
                this.active_slot.beast = this.slot5.beast;
                this.active_slot.adjacentSlots = this.slot5.adjacentSlots;
                this.active_slot.turnsActive = 0;
                break;
            default:
                console.log("Invalid slot number.")
        }
    }

    validateTeam(){

    }
}