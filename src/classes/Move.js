export default class Move {
    constructor(moveId, name, domain, basePower, me, effect, status, description, shortDescription){
        this.move_id = moveId;
        this.name = name;
        this.domain = domain;
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