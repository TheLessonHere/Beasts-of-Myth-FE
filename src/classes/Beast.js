export default class Beast {
    constructor(beastId, name, domain1, domain2, ability, hp, pa, pd, ma, md, sc, moveList){
        this.beast_id = beastId;
        this.name = name;
        this.domain1 = domain1;
        this.domain2 = domain2;
        this.ability = ability;
        this.hp = hp;
        this.init_pa = pa;
        this.init_pd = pd;
        this.init_ma = ma;
        this.init_md = md;
        this.init_sc = sc;
        this.curr_pa = pa;
        this.curr_pd = pd;
        this.curr_ma = ma;
        this.curr_md = md;
        this.curr_sc = sc;
        this.turnsIn = 0;
        this.item = null;
        this.moves = {
            move1: null,
            move2: null,
            move3: null,
            move4: null
        };
        this.status = null;
        this.isActive = false;
        this.disabled_moves = [];
        this.moveList = moveList;
    }

    addMove(move, move_slot){

    }

    removeMove(move_slot){

    }

    addItem(item){

    }

    removeItem(){

    }

    consumeItem(){

    }

    addStatus(status){

    }

    removeStatus(){

    }

    increaseStat(stat, multiplier){

    }

    decreaseStat(stat, divisor){

    }

    resetStats(){

    }

    disableMove(move){

    }

    resetMoves(){

    }

    makeActive(){

    }

    makeInactive(){

    }
}