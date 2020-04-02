export default class Move {
    constructor(moveId, name, basePower, me, effect, description, shortDescription){
        this.move_id = moveId;
        this.name = name;
        this.base_power = basePower;
        this.init_me = me;
        this.curr_me = me;
        this.effect = effect;
        this.description = description;
        this.short_description = shortDescription;
    }
}