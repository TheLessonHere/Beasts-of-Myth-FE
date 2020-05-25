export default class Item {
    constructor(format, itemId, name, type, effect, description, shortDescription, isRemovable){
        this.format = format;
        this.item_id = itemId;
        this.item_name = name;
        this.type = type;
        this.effect = effect;
        this.description = description;
        this.short_description = shortDescription;
        this.isRemovable = isRemovable;
    }

    useItem(beast){
        this.effect(beast);
    }
}