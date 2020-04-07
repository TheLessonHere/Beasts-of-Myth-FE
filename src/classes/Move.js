export default class Move {
    constructor(moveId, name, domain, type, basePower, me, effect, status, description, shortDescription){
        this.move_id = moveId;
        this.move_name = name;
        this.domain = domain;
        this.type = type;
        this.base_power = basePower;
        this.init_me = me;
        this.curr_me = me;
        this.effect = effect;
        this.status = status;
        this.description = description;
        this.short_description = shortDescription;
        this.move_slot = null;
    }
}