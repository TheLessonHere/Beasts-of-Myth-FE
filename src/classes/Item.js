export default class Item {
    constructor(itemId, name, type, effect, description, shortDescription, isRemovable){
        this.item_id = itemId;
        this.item_name = name;
        this.type = type;
        this.effect = effect;
        this.description = description;
        this.short_description = shortDescription;
        this.isRemovable = isRemovable;
    }
}