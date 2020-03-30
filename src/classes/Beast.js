export default class Beast {
    constructor(name, domain1, domain2, ability, hp, pa, pd, ma, md, sc){
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
        this.item = "";
        this.moves = {
            move1: "",
            move2: "",
            move3: "",
            move4: ""
        };
        this.status = null;
        this.disabled_moves = [];
    }

    addMove(move, move_slot){

    }

    addItem(item){

    }

    addStatus(status){

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
}