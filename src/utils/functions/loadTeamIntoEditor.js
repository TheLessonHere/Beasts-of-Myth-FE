export default function loadTeamIntoEditor(team,
                                        setFormat,
                                        setTeamName,
                                        setSlot1,
                                        setSlot2,
                                        setSlot3,
                                        setSlot4,
                                        setSlot5,
                                        setItemSlot1,
                                        setItemSlot2,
                                        setItemSlot3,
                                        setItemSlot4,
                                        setItemSlot5,
                                        setSlot1Move1,
                                        setSlot1Move2,
                                        setSlot1Move3,
                                        setSlot1Move4,
                                        setSlot2Move1,
                                        setSlot2Move2,
                                        setSlot2Move3,
                                        setSlot2Move4,
                                        setSlot3Move1,
                                        setSlot3Move2,
                                        setSlot3Move3,
                                        setSlot3Move4,
                                        setSlot4Move1,
                                        setSlot4Move2,
                                        setSlot4Move3,
                                        setSlot4Move4,
                                        setSlot5Move1,
                                        setSlot5Move2,
                                        setSlot5Move3,
                                        setSlot5Move4){

    setFormat(team.format);
    console.log(team.format);

    setTeamName(team.team_name);

    const beast1 = team.slot1.beast;
    setSlot1(beast1);
    const beast2 = team.slot2.beast;
    setSlot2(beast2);
    const beast3 = team.slot3.beast;
    setSlot3(beast3);
    const beast4 = team.slot4.beast;
    setSlot4(beast4);
    const beast5 = team.slot5.beast;
    setSlot5(beast5);

    if(beast1.item !== null){
        setItemSlot1(beast1.item.item_name);
    }
    if(beast2.item !== null){
        setItemSlot2(beast2.item.item_name);
    }
    if(beast3.item !== null){
        setItemSlot3(beast3.item.item_name);
    }
    if(beast4.item !== null){
        setItemSlot4(beast4.item.item_name);
    }
    if(beast5.item !== null){
        setItemSlot5(beast5.item.item_name);
    }

    beast1.moves.forEach((value, key, map) => {
        console.log(value);
        if(value !== null){
            switch(key){
                case 'move1':
                    setSlot1Move1(value.move_name);
                case 'move2':
                    setSlot1Move2(value.move_name);
                case 'move3':
                    setSlot1Move3(value.move_name);
                case 'move4':
                    setSlot1Move4(value.move_name);
                default:
                    console.log("Error loading moves for slot 1.")
            }
        } else {
            switch(key){
                case 'move1':
                    setSlot1Move1("");
                case 'move2':
                    setSlot1Move2("");
                case 'move3':
                    setSlot1Move3("");
                case 'move4':
                    setSlot1Move4("");
                default:
                    console.log("Error loading null for slot 1.")
            }
        }
    });

    beast2.moves.forEach((value, key, map) => {
        if(value !== null){
            switch(key){
                case 'move1':
                    setSlot2Move1(value.move_name);
                case 'move2':
                    setSlot2Move2(value.move_name);
                case 'move3':
                    setSlot2Move3(value.move_name);
                case 'move4':
                    setSlot2Move4(value.move_name);
                default:
                    console.log("Error loading moves for slot 2.")
            }
        } else {
            switch(key){
                case 'move1':
                    setSlot2Move1("");
                case 'move2':
                    setSlot2Move2("");
                case 'move3':
                    setSlot2Move3("");
                case 'move4':
                    setSlot2Move4("");
                default:
                    console.log("Error loading null for slot 2.")
            }
        }
    });

    beast3.moves.forEach((value, key, map) => {
        if(value !== null){
            switch(key){
                case 'move1':
                    setSlot3Move1(value.move_name);
                case 'move2':
                    setSlot3Move2(value.move_name);
                case 'move3':
                    setSlot3Move3(value.move_name);
                case 'move4':
                    setSlot3Move4(value.move_name);
                default:
                    console.log("Error loading moves for slot 3.")
            }
        } else {
            switch(key){
                case 'move1':
                    setSlot3Move1("");
                case 'move2':
                    setSlot3Move2("");
                case 'move3':
                    setSlot3Move3("");
                case 'move4':
                    setSlot3Move4("");
                default:
                    console.log("Error loading null for slot 3.")
            }
        }
    });

    beast4.moves.forEach((value, key, map) => {
        if(value !== null){
            switch(key){
                case 'move1':
                    setSlot4Move1(value.move_name);
                case 'move2':
                    setSlot4Move2(value.move_name);
                case 'move3':
                    setSlot4Move3(value.move_name);
                case 'move4':
                    setSlot4Move4(value.move_name);
                default:
                    console.log("Error loading moves for slot 4.")
            }
        } else {
            switch(key){
                case 'move1':
                    setSlot4Move1("");
                case 'move2':
                    setSlot4Move2("");
                case 'move3':
                    setSlot4Move3("");
                case 'move4':
                    setSlot4Move4("");
                default:
                    console.log("Error loading null for slot 4.")
            }
        }
    });

    beast5.moves.forEach((value, key, map) => {
        if(value !== null){
            switch(key){
                case 'move1':
                    setSlot5Move1(value.move_name);
                case 'move2':
                    setSlot5Move2(value.move_name);
                case 'move3':
                    setSlot5Move3(value.move_name);
                case 'move4':
                    setSlot5Move4(value.move_name);
                default:
                    console.log("Error loading moves for slot 5.")
            }
        } else {
            switch(key){
                case 'move1':
                    setSlot5Move1("");
                case 'move2':
                    setSlot5Move2("");
                case 'move3':
                    setSlot5Move3("");
                case 'move4':
                    setSlot5Move4("");
                default:
                    console.log("Error loading null for slot 5.")
            }
        }
    });
}