export default class Move {
    constructor(moveId, name, basePower, effect, description, shortDescription){
        this.move_id = moveId;
        this.name = name;
        this.base_power = basePower;
        this.effect = effect;
        this.description = description;
        this.short_description = shortDescription;
    }
}