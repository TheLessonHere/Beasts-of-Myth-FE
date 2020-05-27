export default function endOfTurn(effects, game){
    let messagesArr = [];
    if(effects.p1inflamed){
        if(game.player1.team.active_slot.beast){
            messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was hurt by flames!`);
        } else {
            const lastKnockedOutBeast = game.player1.team.getLastKnockedOutBeast();
            messagesArr.push(`${lastKnockedOutBeast.beast_name} was hurt by flames!`);
        }
    }
    if(effects.p2inflamed){
        if(game.player2.team.active_slot.beast){
            messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was hurt by flames!`);
        } else {
            const lastKnockedOutBeast = game.player2.team.getLastKnockedOutBeast();
            messagesArr.push(`${lastKnockedOutBeast.beast_name} was hurt by flames!`);
        }
    }
    if(effects.p1itemeffect){
        switch(effects.p1itemeffect){
            case 'First Aid Kit':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was healed a bit by its First Aid Kit.`)
            case 'Evil Contract':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} paid the price for its Evil Contract.`)
            case 'Bright Stone':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was Blinded by its Bright Stone.`)
                break;
            case 'Concussive Turbine':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was Windwhipped by its Concussive Turbine.`)
            case 'Entrancing Orb':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was Hypnotized by its Entrancing Orb.`)
            case 'Flame Barb':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was Inflamed by its Flame Barb.`)
            case 'Impossible Object':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was Frenzied by its Impossible Object.`)
            case 'Mysterious Box':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was Tormented by its Mysterious Box.`)
            case 'Sprouting Seed':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was Vinebound by its Sprouting Seed.`)
            case 'Wet Blanket':
                messagesArr.push(`${game.player1.team.active_slot.beast.beast_name} was Inundated by its Wet Blanket.`)
            default:
                break;
        }
    }
    if(effects.p2itemeffect){
        switch(effects.p1itemeffect){
            case 'First Aid Kit':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was healed a bit by its First Aid Kit.`)
            case 'Evil Contract':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} paid the price for its Evil Contract.`)
            case 'Bright Stone':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was Blinded by its Bright Stone.`)
                break;
            case 'Concussive Turbine':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was Windwhipped by its Concussive Turbine.`)
            case 'Entrancing Orb':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was Hypnotized by its Entrancing Orb.`)
            case 'Flame Barb':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was Inflamed by its Flame Barb.`)
            case 'Impossible Object':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was Frenzied by its Impossible Object.`)
            case 'Mysterious Box':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was Tormented by its Mysterious Box.`)
            case 'Sprouting Seed':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was Vinebound by its Sprouting Seed.`)
            case 'Wet Blanket':
                messagesArr.push(`${game.player2.team.active_slot.beast.beast_name} was Inundated by its Wet Blanket.`)
            default:
                break;
        }
    }

    const allMessages = messagesArr.map((message, idx) => {
            if(idx === messagesArr.length - 1){
                return {
                    message: message,
                    turnDidEnd: true
                }
            } else {
                return {
                    message: message
                }
            }
        });
    return allMessages;
}