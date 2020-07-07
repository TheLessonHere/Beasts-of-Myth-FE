export default function serializeTeamDatastring(format, team_name, slot1, slot2, slot3, slot4, slot5){
    const beastsArr = [slot1.beast, slot2.beast, slot3.beast, slot4.beast, slot5.beast];

    // Check for supers, split the string and save as the regular beast with the super crystal
    const beastArr = [];
    const addToBeastArray = (arr) => {
        arr.forEach(beast => {
            if(beast.beast_name.includes("Super")){
                const endIndex = beast.beast_name.indexOf("-Super");
                const nonSuperBeastName = beast.beast_name.slice(0, endIndex);
                beastArr.push(nonSuperBeastName);
            } else {
                beastArr.push(beast.beast_name);
            }
        })
    }

    const moveArr = [];
    const addToMoveArray = (arr) => {
        arr.forEach(beast => {
            let move1 = beast.moves.get('move1');
            let move2 = beast.moves.get('move2');
            let move3 = beast.moves.get('move3');
            let move4 = beast.moves.get('move4');
            const tempArr = [move1, move2, move3, move4];
            tempArr.forEach(move => {
                if(move === null){
                    moveArr.push("null");
                } else {
                    moveArr.push(move.move_name);
                }
            });
        });
    };

    const itemArr = [];
    const addToItemArray = (arr) => {
        arr.forEach(beast => {
            let item = beast.item;
            if(item === null){
                itemArr.push("null");
            } else {
                itemArr.push(item.item_name);
            }
        })
    }

    addToBeastArray(beastsArr);
    addToMoveArray(beastsArr);
    addToItemArray(beastsArr);

    const teamDatastring = `${format}]f]${team_name}/tn/${beastArr[0]}>bn>${itemArr[0]})i)${moveArr[0]},${moveArr[1]},${moveArr[2]},${moveArr[3]}|s|${beastArr[1]}>bn>${itemArr[1]})i)${moveArr[4]},${moveArr[5]},${moveArr[6]},${moveArr[7]}|s|${beastArr[2]}>bn>${itemArr[2]})i)${moveArr[8]},${moveArr[9]},${moveArr[10]},${moveArr[11]}|s|${beastArr[3]}>bn>${itemArr[3]})i)${moveArr[12]},${moveArr[13]},${moveArr[14]},${moveArr[15]}|s|${beastArr[4]}>bn>${itemArr[4]})i)${moveArr[16]},${moveArr[17]},${moveArr[18]},${moveArr[19]}`
    return teamDatastring;
}