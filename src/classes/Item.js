export default class Item {
    constructor(itemId, name, effect, description, shortDescription){
        this.item_id = itemId;
        this.item_name = name;
        this.effect = effect;
        this.description = description;
        this.short_description = shortDescription;
    }

    useItem(){
        this.effect();
    }
}