// Libraries
import { beasts } from '../data/libraries/BeastLibrary';
import { moves } from '../data/libraries/MoveLibrary';
import { items } from '../data/libraries/ItemLibrary';
// Classes
import Beast from './Beast';
import Item from './Item';
import Move from './Move';
// Functions
import parseTeamDatastring from '../utils/functions/parseTeamDatastring';
import serializeTeamDatastring from '../utils/functions/serializeTeamDatastring';

export default class Team {
    constructor(format, name){
        this.format = format;
        this.team_name = name;
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
        this.super_beast = null;
        this.active_slot = {
            beast: null,
            adjacentSlots: [],
            turnsActive: 0,
            slotNumber: null,
        }
        this.knocked_out_beasts = [];
        this.isValid = false;
    }

    addBeast(beast, slot){
        switch(slot){
            case 'slot1':
                this.slot1.beast = beast;
                this.slot1.beast.updateSlot('slot1');
                this.updateAdjacentSlots();
                break;
            case 'slot2':
                this.slot2.beast = beast;
                this.slot1.beast.updateSlot('slot2');
                this.updateAdjacentSlots();
                break;
            case 'slot3':
                this.slot3.beast = beast;
                this.slot1.beast.updateSlot('slot3');
                this.updateAdjacentSlots();
                break;
            case 'slot4':
                this.slot4.beast = beast;
                this.slot1.beast.updateSlot('slot4');
                this.updateAdjacentSlots();
                break;
            case 'slot5':
                this.slot5.beast = beast;
                this.slot1.beast.updateSlot('slot5');
                this.updateAdjacentSlots();
                break;
            default:
                if(this.slot1.beast == null){
                    this.slot1.beast = beast;
                    this.slot1.beast.updateSlot('slot1');
                    this.updateAdjacentSlots();
                    return;
                }
                else if(this.slot2.beast == null){
                    this.slot2.beast = beast;
                    this.slot1.beast.updateSlot('slot2');
                    this.updateAdjacentSlots();
                    return;
                }
                else if(this.slot3.beast == null){
                    this.slot3.beast = beast;
                    this.slot1.beast.updateSlot('slot3');
                    this.updateAdjacentSlots();
                    return;
                }
                else if(this.slot4.beast == null){
                    this.slot4.beast = beast;
                    this.slot1.beast.updateSlot('slot4');
                    this.updateAdjacentSlots();
                    return;
                }
                else if(this.slot5.beast == null){
                    this.slot5.beast = beast;
                    this.slot1.beast.updateSlot('slot5');
                    this.updateAdjacentSlots();
                    return;
                } else {
                    this.slot1.beast = beast;
                    this.slot1.beast.updateSlot('slot1');
                    this.updateAdjacentSlots();
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

    changeToSuper(superBeast, slot){
        let nonSuper;
        let nonSuperHPPercentage;
        let prevStatStages;
        switch(slot){
            case 'slot1':
                const makeSlot1Super = () => {
                nonSuper = this.slot1.beast;
                nonSuper.moves.forEach((value, key, map) => {
                    superBeast.moves.set(key, value);
                });
                superBeast.addStatus(nonSuper.status);
                prevStatStages = nonSuper.getStatStages();
                superBeast.matchStatStages(prevStatStages);
                superBeast.updateAllStats();
                nonSuperHPPercentage = nonSuper.getHPPercentage();
                superBeast.matchHPPercentage(nonSuperHPPercentage);
                this.slot1.beast = superBeast;}
                makeSlot1Super();
                break;
            case 'slot2':
                const makeSlot2Super = () => {
                nonSuper = this.slot2.beast;
                nonSuper.moves.forEach((value, key, map) => {
                    superBeast.moves.set(key, value);
                });
                superBeast.addStatus(nonSuper.status);
                prevStatStages = nonSuper.getStatStages();
                superBeast.matchStatStages(prevStatStages);
                superBeast.updateAllStats();
                nonSuperHPPercentage = nonSuper.getHPPercentage();
                superBeast.matchHPPercentage(nonSuperHPPercentage);
                this.slot2.beast = superBeast;}
                makeSlot2Super();
                break;
            case 'slot3':
                const makeSlot3Super = () => {
                nonSuper = this.slot3.beast;
                nonSuper.moves.forEach((value, key, map) => {
                    superBeast.moves.set(key, value);
                });
                superBeast.addStatus(nonSuper.status);
                prevStatStages = nonSuper.getStatStages();
                superBeast.matchStatStages(prevStatStages);
                superBeast.updateAllStats();
                nonSuperHPPercentage = nonSuper.getHPPercentage();
                superBeast.matchHPPercentage(nonSuperHPPercentage);
                this.slot3.beast = superBeast;}
                makeSlot3Super();
                break;
            case 'slot4':
                const makeSlot4Super = () => {
                nonSuper = this.slot4.beast;
                nonSuper.moves.forEach((value, key, map) => {
                    superBeast.moves.set(key, value);
                });
                superBeast.addStatus(nonSuper.status);
                prevStatStages = nonSuper.getStatStages();
                superBeast.matchStatStages(prevStatStages);
                superBeast.updateAllStats();
                nonSuperHPPercentage = nonSuper.getHPPercentage();
                superBeast.matchHPPercentage(nonSuperHPPercentage);
                this.slot4.beast = superBeast;}
                makeSlot4Super();
                break;
            case 'slot5':
                const makeSlot5Super = () => {
                nonSuper = this.slot5.beast;
                nonSuper.moves.forEach((value, key, map) => {
                    superBeast.moves.set(key, value);
                });
                superBeast.addStatus(nonSuper.status);
                prevStatStages = nonSuper.getStatStages();
                superBeast.matchStatStages(prevStatStages);
                superBeast.updateAllStats();
                nonSuperHPPercentage = nonSuper.getHPPercentage();
                superBeast.matchHPPercentage(nonSuperHPPercentage);
                this.slot5.beast = superBeast;}
                makeSlot5Super();
                break;
            default:
                console.log("Error activating Super.");
        }
    }

    updateAdjacentSlots(){
        this.slot1.adjacentSlots = [this.slot2];
        this.slot2.adjacentSlots = [this.slot1, this.slot3];
        this.slot3.adjacentSlots = [this.slot2, this.slot4];
        this.slot4.adjacentSlots = [this.slot3, this.slot5];
        this.slot5.adjacentSlots = [this.slot4];
    }

    fillInTeamFromString(team_datastring){
        try{
            const teamData = parseTeamDatastring(team_datastring);
            this.format = teamData.format;
            this.team_name = teamData.team_name;

            teamData.beasts.forEach(beast => {
                const beastStringData = beast;
                const beastLibraryData = beasts.find(beast =>
                    beast.beast_name === beastStringData.beast_name
                );
                let currSlot = {};
                if(beastLibraryData){
                    const newBeast = new Beast(beastLibraryData.format,
                        beastLibraryData.beast_id,
                        beastLibraryData.beast_name,
                        beastLibraryData.domain1,
                        beastLibraryData.domain2,
                        beastLibraryData.ability,
                        beastLibraryData.hp,
                        beastLibraryData.pa,
                        beastLibraryData.pd,
                        beastLibraryData.ma,
                        beastLibraryData.md,
                        beastLibraryData.sc,
                        beastLibraryData.move_list);
                    this.addBeast(newBeast, beastStringData.slot);
                    currSlot = this.getSlot(beastStringData.slot);
                } else {
                    this.addBeast(null, beastStringData.slot);
                    currSlot = this.getSlot(beastStringData.slot);
                }

                let itemData = {};
                if(beastStringData.item !== "null"){
                    const matchingItem = items.find(item =>
                        item.item_name === beastStringData.item
                    );
                    if(matchingItem){
                        itemData = matchingItem;
                    } else {
                        itemData = null;
                    }
                } else {
                    itemData = null;
                }
                let equippedItem = null;
                if(itemData !== null){
                    equippedItem = new Item(itemData.format,
                        itemData.item_id,
                        itemData.item_name,
                        itemData.type,
                        itemData.effect,
                        itemData.description,
                        itemData.short_description,
                        itemData.removable);
                    currSlot.beast.addItem(equippedItem);
                } else {
                    currSlot.beast.addItem(equippedItem);
                }

                const beastMoves = beastStringData.moves.map(move => {
                    if(move !== "null"){
                        let moveData = {};
                        const matchingMove = moves.find(data =>
                            data.move_name === move
                        );
                        if(matchingMove){
                            moveData = matchingMove;
                        } else {
                            moveData = null;
                        }
                        return moveData;
                    } else {
                        return null;
                    }
                });
                let slotCounter = 1;
                beastMoves.forEach(move => {
                    if(move !== null){
                        const newMove = new Move(
                            move.move_id,
                            move.move_name,
                            move.domain,
                            move.type,
                            move.base_power,
                            move.me,
                            move.priority,
                            move.effect,
                            move.description,
                            move.short_description,
                            move.action_statement);
                        newMove.addMoveSlot(`move${slotCounter}`);
                        currSlot.beast.moves.set(`move${slotCounter}`, newMove);
                        if(slotCounter === 4){
                            slotCounter = 1;
                        } else {
                            slotCounter += 1;
                        }
                    } else {
                        currSlot.beast.moves.set(`move${slotCounter}`, null);
                        if(slotCounter === 4){
                            slotCounter = 1;
                        } else {
                            slotCounter += 1;
                        }
                    }
                });
            });
            this.updateAdjacentSlots();
            this.updateSuperSlot();
            console.log("Team successfully imported.")
        }
        catch(err){
            console.log(err, "Team Datastring Formatted Incorrectly.")
            alert("TeamDatastring improperly formatted.")
        }
        if(this.slot1.beast !== null &&
            this.slot2.beast !== null &&
            this.slot3.beast !== null &&
            this.slot4.beast !== null &&
            this.slot5.beast !== null){
                this.slot1.beast.updateSlot('slot1');
                this.slot2.beast.updateSlot('slot2');
                this.slot3.beast.updateSlot('slot3');
                this.slot4.beast.updateSlot('slot4');
                this.slot5.beast.updateSlot('slot5');
            }
    }

    convertToString(){
        const teamDatastring = serializeTeamDatastring(this.format,
                                                    this.team_name,
                                                    this.slot1,
                                                    this.slot2,
                                                    this.slot3,
                                                    this.slot4,
                                                    this.slot5);
        return teamDatastring;
    }

    generateRandomSlot(){
        const currentSlotNumber = this.active_slot.slotNumber;
        let nextSlotNumber = Math.floor(Math.random() * 6)
        while(nextSlotNumber === currentSlotNumber){
            nextSlotNumber = Math.floor(Math.random() * 6)
        }
        return nextSlotNumber;
    }

    forceChange(){
        // Forces active slot change into a random slot
        const nextSlotNumber = this.generateRandomSlot();
        switch(nextSlotNumber){
            case 1:
                if(!this.slot1.beast.knocked_out){
                    this.clearActiveSlot();
                    this.makeActive('slot1');
                }
                break;
            case 2:
                if(!this.slot2.beast.knocked_out){
                    this.clearActiveSlot();
                    this.makeActive('slot2');
                }
                break;
            case 3:
                if(!this.slot3.beast.knocked_out){
                    this.clearActiveSlot();
                    this.makeActive('slot3');
                }
                break;
            case 4:
                if(!this.slot4.beast.knocked_out){
                    this.clearActiveSlot();
                    this.makeActive('slot4');
                }
                break;
            case 5:
                if(!this.slot5.beast.knocked_out){
                    this.clearActiveSlot();
                    this.makeActive('slot5');
                }
                break;
            default:
                return;
        }
        return;
    }

    updateSuperSlot(){
        if(this.slot1.beast.item !== null &&
            this.slot1.beast.item.item_name === 'Super Crystal'){
            const superBeastData = beasts.find(beast =>
                beast.beast_name === `${this.slot1.beast.beast_name}-Super`
            );
            const superBeast = new Beast(superBeastData.format,
                                        superBeastData.beast_id,
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
            superBeast.updateSlot('slot1');
            this.super_beast = superBeast;
        }
        else if(this.slot2.beast.item !== null &&
            this.slot2.beast.item.item_name === 'Super Crystal'){
            const superBeastData = beasts.find(beast =>
                beast.beast_name === `${this.slot1.beast.beast_name}-Super`
            );
            const superBeast = new Beast(superBeastData.format,
                                        superBeastData.beast_id,
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
            superBeast.updateSlot('slot2');
            this.super_beast = superBeast;
        }
        else if(this.slot3.beast.item !== null &&
            this.slot3.beast.item.item_name === 'Super Crystal'){
            const superBeastData = beasts.find(beast =>
                beast.beast_name === `${this.slot1.beast.beast_name}-Super`
            );
            const superBeast = new Beast(superBeastData.format,
                                        superBeastData.beast_id,
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
            superBeast.updateSlot('slot3');
            this.super_beast = superBeast;
        }
        else if(this.slot4.beast.item !== null &&
            this.slot4.beast.item.item_name === 'Super Crystal'){
            const superBeastData = beasts.find(beast =>
                beast.beast_name === `${this.slot1.beast.beast_name}-Super`
            );
            const superBeast = new Beast(superBeastData.format,
                                        superBeastData.beast_id,
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
            superBeast.updateSlot('slot4');
            this.super_beast = superBeast;
        }
        else if(this.slot5.beast.item !== null &&
            this.slot5.beast.item.item_name === 'Super Crystal'){
            const superBeastData = beasts.find(beast =>
                beast.beast_name === `${this.slot1.beast.beast_name}-Super`
            );
            const superBeast = new Beast(superBeastData.format,
                                        superBeastData.beast_id,
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
            superBeast.updateSlot('slot5');
            this.super_beast = superBeast;
        } else {
            this.super_beast = null;
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

    switchItemEffect(){
        if(this.active_slot.beast.item){
            if(this.active_slot.beast.item.item_name === 'Focus Vest' ||
            this.active_slot.beast.item.item_name === 'Focus Cap' ||
            this.active_slot.beast.item.item_name === 'Focus Brace' ||
            this.active_slot.beast.item.item_name === 'Bulky Vest' ||
            this.active_slot.beast.item.item_name === 'Bulky Cap' ||
            this.active_slot.beast.item.item_name === 'Lead Boots'){
                this.active_slot.beast.item.effect(this.active_slot.beast);
            }
        }
    }

    makeActive(slot){
        switch(slot){
            case 'slot1':
                this.active_slot.beast = this.slot1.beast;
                this.active_slot.adjacentSlots = this.slot1.adjacentSlots;
                this.active_slot.slotNumber = 'slot1';
                this.switchItemEffect();
                this.active_slot.turnsActive = 0;
                break;
            case 'slot2':
                this.active_slot.beast = this.slot2.beast;
                this.active_slot.adjacentSlots = this.slot2.adjacentSlots;
                this.active_slot.slotNumber = 'slot2';
                this.switchItemEffect();
                this.active_slot.turnsActive = 0;
                break;
            case 'slot3':
                this.active_slot.beast = this.slot3.beast;
                this.active_slot.adjacentSlots = this.slot3.adjacentSlots;
                this.active_slot.slotNumber = 'slot3';
                this.switchItemEffect();
                this.active_slot.turnsActive = 0;
                break;
            case 'slot4':
                this.active_slot.beast = this.slot4.beast;
                this.active_slot.adjacentSlots = this.slot4.adjacentSlots;
                this.active_slot.slotNumber = 'slot4';
                this.switchItemEffect();
                this.active_slot.turnsActive = 0;
                break;
            case 'slot5':
                this.active_slot.beast = this.slot5.beast;
                this.active_slot.adjacentSlots = this.slot5.adjacentSlots;
                this.active_slot.slotNumber = 'slot5';
                this.switchItemEffect();
                this.active_slot.turnsActive = 0;
                break;
            default:
                console.log("Invalid slot number.")
        }
    }

    clearActiveSlot(){
        this.active_slot = {
            beast: null,
            adjacentSlots: [],
            turnsActive: 0,
            slotNumber: null,
        }
    }

    incrementTurnsActive(){
        this.active_slot.turnsActive += 1;
    }

    changeTeamName(newTeamName){
        this.team_name = newTeamName;
    }

    changeFormat(newFormat){
        this.format = newFormat;
    }

    knockOutBeast(slot){
        const kodSlot = this.getSlot(slot);
        this.knocked_out_beasts = [...this.knocked_out_beasts, kodSlot.beast];
    }

    getLastKnockedOutBeast(){
        const knockedOutBeastIdx = this.knocked_out_beasts.length - 1;
        const lastKnockedOutBeast = this.knocked_out_beasts[knockedOutBeastIdx];
        return lastKnockedOutBeast;
    }

    // This might end up being unnecessary
    validateTeam(){
        if(this.slot1.beast == null &&
            this.slot2.beast == null &&
            this.slot3.beast == null &&
            this.slot4.beast == null &&
            this.slot5.beast == null){
                this.isValid = false;
            } else {
                // Add validation so that two supers can't be added
                this.isValid = true;
            };
        return this.isValid;
    }
}