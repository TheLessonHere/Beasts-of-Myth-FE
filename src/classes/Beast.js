export default class Beast {
    constructor(format, beastId, name, domain1, domain2, ability, hp, pa, pd, ma, md, sc, moveList){
        this.format = format;
        this.beast_id = beastId;
        this.beast_name = name;
        this.domain1 = domain1;
        this.domain2 = domain2;
        this.ability = ability;
        this.init_hp = hp;
        this.curr_hp = hp;
        this.hp_percentage = Math.round((this.curr_hp / this.init_hp) * 100);
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
        this.stat_stages = {
            pa: 1,
            pd: 1,
            ma: 1,
            md: 1,
            sc: 1
        };
        this.turnsIn = 0;
        this.item = null;
        this.moves = new Map().set('move1', null)
                        .set('move2', null)
                        .set('move3', null)
                        .set('move4', null);
        this.status = null;
        this.disabled_moves = [];
        this.move_list = moveList;
        this.slot = null;
        this.knocked_out = false;
    }

    addMove(move_slot, move){
        move.addMoveSlot(move_slot);
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

    addStatus(status){
        this.status = status;
    }

    removeStatus(){
        const prevStatus = this.status;
        this.status = null;
        if(prevStatus != 'Blinded'){
            this.curr_pa *= 2;
            this.stat_stages.pa *= 2;
        }
        else if(prevStatus != 'Vinebound'){
            this.curr_pd *= 2;
            this.stat_stages.pd *= 2;
        }
        else if(prevStatus != 'Tormented'){
            this.curr_ma *= 2;
            this.stat_stages.ma *= 2;
        }
        else if(prevStatus != 'Hypnotized'){
            this.curr_md *= 2;
            this.stat_stages.md *= 2;
        }
        else if(prevStatus != 'Inundated'){
            this.curr_sc *= 2;
            this.stat_stages.sc *= 2;
        };
    }

    updateHP(damage){
        this.curr_hp -= damage;
        this.hp_percentage = Math.round((this.curr_hp / this.init_hp) * 100);
    }

    matchHPPercentage(hp_percentage){
        this.curr_hp = Math.round(this.init_hp * hp_percentage / 100);
        this.hp_percentage = hp_percentage;
    }

    getHPPercentage(){
        return this.hp_percentage;
    }

    updateAllStats(){
        const roundedPA = Math.round((this.curr_pa * this.stat_stages.pa) * 10) / 10;
        this.curr_pa = roundedPA;
        const roundedPD = Math.round((this.curr_pd * this.stat_stages.pd) * 10) / 10;
        this.curr_pd = roundedPD;
        const roundedMA = Math.round((this.curr_ma * this.stat_stages.ma) * 10) / 10;
        this.curr_ma = roundedMA;
        const roundedMD = Math.round((this.curr_md * this.stat_stages.md) * 10) / 10;
        this.curr_md = roundedMD;
        const roundedSC = Math.round((this.curr_sc * this.stat_stages.sc) * 10) / 10;
        this.curr_sc = roundedSC;
    }

    updateStat(stat){
        switch(stat){
            case 'pa':
                const computeStatPA = () => {
                    const roundedStat = Math.round((this.curr_pa * this.stat_stages.pa) * 10) / 10;
                    this.curr_pa = roundedStat;
                }
                computeStatPA();
                break;
            case 'pd':
                const computeStatPD = () => {
                const roundedStat = Math.round((this.curr_pd * this.stat_stages.pd) * 10) / 10;
                this.curr_pd = roundedStat;
                }
                computeStatPD();
                break;
            case 'ma':
                const computeStatMA = () => {
                const roundedStat = Math.round((this.curr_ma * this.stat_stages.ma) * 10) / 10;
                this.curr_ma = roundedStat;
                }
                computeStatMA();
                break;
            case 'md':
                const computeStatMD = () => {
                const roundedStat = Math.round((this.curr_md * this.stat_stages.md) * 10) / 10;
                this.curr_md = roundedStat;
                }
                computeStatMD();
                break;
            case 'sc':
                const computeStatSC = () => {
                const roundedStat = Math.round((this.curr_sc * this.stat_stages.sc) * 10) / 10;
                this.curr_sc = roundedStat;
                }
                computeStatSC();
                break;
            default:
                return;
        }
    }

    updateStatStage(stat, multiplier){
        // Applies stat stage multipliers
        switch(stat){
            case 'pa':
                this.stat_stages.pa = this.stat_stages.pa * multiplier;
                break;
            case 'pd':
                this.stat_stages.pd = this.stat_stages.pd * multiplier;
                break;
            case 'ma':
                this.stat_stages.ma = this.stat_stages.ma * multiplier;
                break;
            case 'md':
                this.stat_stages.md = this.stat_stages.md * multiplier;
                break;
            case 'sc':
                this.stat_stages.sc = this.stat_stages.sc * multiplier;
                break;
            default:
                return;
        }
    }

    modifyStat(stat, newStat, changeInit){
        // Modifies an individual stat to be a specific amount
        switch(stat){
            case 'hp':
                this.curr_hp = newStat;
                if(changeInit){
                    this.init_hp = newStat;
                }
                break;
            case 'pa':
                this.curr_pa = newStat;
                if(changeInit){
                    this.init_pa = newStat;
                }
                break;
            case 'pd':
                this.curr_pd = newStat;
                if(changeInit){
                    this.init_pd = newStat;
                }
                break;
            case 'ma':
                this.curr_ma = newStat;
                if(changeInit){
                    this.init_ma = newStat;
                }
                break;
            case 'md':
                this.curr_md = newStat;
                if(changeInit){
                    this.init_md = newStat;
                }
                break;
            case 'sc':
                this.curr_sc = newStat;
                if(changeInit){
                    this.init_sc = newStat;
                }
                break;
            default:
                return;
        }
    }

    resetStats(){
        if(this.status != 'Blinded'){
            this.curr_pa = this.init_pa;
            this.stat_stages.pa = 1;
        }
        else if(this.status != 'Vinebound'){
            this.curr_pd = this.init_pd;
            this.stat_stages.pd = 1;
        }
        else if(this.status != 'Tormented'){
            this.curr_ma = this.init_ma;
            this.stat_stages.ma = 1;
        }
        else if(this.status != 'Hypnotized'){
            this.curr_md = this.init_md;
            this.stat_stages.md = 1;
        }
        else if(this.status != 'Inundated'){
            this.curr_sc = this.init_sc;
            this.stat_stages.sc = 1;
        };
    }

    getStatStages(){
        return this.stat_stages;
    }

    matchStatStages(statStages){
        this.stat_stages = statStages;
    }

    disableMove(move){
        this.disabled_moves.push(move);
    }

    disableMoves(moveArr){
        moveArr.forEach(move => {
            this.disabled_moves.push(move);
        });
    }

    resetMoves(){
        this.disabled_moves = [];
    }

    makeInactive(){
        this.resetStats();
        this.resetTurnsIn();
        this.resetMoves();
    }

    incrementTurnsIn(){
        this.turnsIn = this.turnsIn + 1;
    }

    resetTurnsIn(){
        this.turnsIn = 0;
    }

    updateSlot(slot){
        this.slot = slot;
    }

    knockOutBeast(){
        this.knocked_out = true;
        this.status = 'Knocked-Out'
    }
}