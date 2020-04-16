export default class Move {
    constructor(moveId, name, domain, type, basePower, me, priority, effect, description, shortDescription){
        this.move_id = moveId;
        this.move_name = name;
        this.domain = domain;
        this.type = type;
        this.base_power = basePower;
        this.init_me = me;
        this.curr_me = me;
        this.priority = priority;
        this.effect = effect;
        this.description = description;
        this.short_description = shortDescription;
        this.move_slot = null;
    }

    decrementME(){
        this.curr_me -= 1;
    }

    addMoveSlot(slot){
        this.move_slot = slot;
    }
}