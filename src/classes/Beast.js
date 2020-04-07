export default class Beast {
    constructor(beastId, name, domain1, domain2, ability, hp, pa, pd, ma, md, sc, moveList){
        this.beast_id = beastId;
        this.beast_name = name;
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
        this.moves = new Map().set('move1', null)
                        .set('move2', null)
                        .set('move3', null)
                        .set('move4', null);
        this.status = null;
        this.turnsInflamed = 0;
        this.isActive = false;
        this.disabled_moves = [];
        this.moveList = moveList;
        this.slot = null;
    }

    addMove(move, move_slot){
        this.moves.set(move_slot, move);
    }

    removeMove(move_slot){
        this.moves.set(move_slot, null)
    }

    addItem(item){
        this.item = item;
    }

    removeItem(){
        this.item = null;
    }

    consumeItem(){
        this.item.useItem();
        this.removeItem();
    }

    addStatus(status){
        this.status = status;
    }

    removeStatus(){
        this.status = null;
    }

    increaseStat(stat, multiplier){
        switch(stat){
            case 'pa':
                this.curr_pa = this.curr_pa * multiplier;
                break;
            case 'pd':
                this.curr_pd = this.curr_pd * multiplier;
                break;
            case 'ma':
                this.curr_ma = this.curr_ma * multiplier;
                break;
            case 'md':
                this.curr_md = this.curr_md * multiplier;
                break;
            case 'sc':
                this.curr_sc = this.curr_sc * multiplier;
                break;
            default:
                return;
        }
    }

    decreaseStat(stat, divisor){
        switch(stat){
            case 'pa':
                const decreasedStat = this.curr_pa / divisor;
                this.curr_pa = Math.round(decreasedStat);
                break;
            case 'pd':
                const decreasedStat = this.curr_pd / divisor;
                this.curr_pd = Math.round(decreasedStat);
                break;
            case 'ma':
                const decreasedStat = this.curr_ma / divisor;
                this.curr_ma = Math.round(decreasedStat);
                break;
            case 'md':
                const decreasedStat = this.curr_md / divisor;
                this.curr_md = Math.round(decreasedStat);
                break;
            case 'sc':
                const decreasedStat = this.curr_sc / divisor;
                this.curr_sc = Math.round(decreasedStat);
                break;
            default:
                return;
        }
    }

    resetStats(){
        if(this.status != 'Blinded'){
            this.curr_pa = this.init_pa;
        }
        else if(this.status != 'Vinebound'){
            this.curr_pd = this.init_pd;
        }
        else if(this.status != 'Tormented'){
            this.curr_ma = this.init_ma;
        }
        else if(this.status != 'Hypnotized'){
            this.curr_md = this.init_md;
        }
        else if(this.status != 'Inundated'){
            this.curr_sc = this.init_sc;
        };
    }

    disableMove(move){
        const disabledMove = this.moves.get(move);
        this.disabled_moves.push(disabledMove);
    }

    resetMoves(){
        this.disabled_moves = [];
    }

    makeActive(){
        this.isActive = true;
    }

    makeInactive(){
        this.isActive = false;
    }

    incrementTurnsIn(){
        this.turnsIn = this.turnsIn + 1;
    }

    resetTurnsIn(){
        this.turnsIn = 0;
    }

    isSuper(){
        if(this.item == 'Super Crystal'){
            return true;
        } else {
            return false;
        }
    }
}