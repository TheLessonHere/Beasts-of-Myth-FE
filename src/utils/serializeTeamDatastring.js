export default function serializeTeamDatastring(team){
    const { format, team_name, slot1, slot2, slot3, slot4, slot5 } = team;
    const teamDatastring = `${format}]f]
    ${team_name}/tn/
    ${slot1.beast.beast_name}>bn>
    ${slot1.beast.item})i)
    ${slot1.beast.moves.move1},
    ${slot1.beast.moves.move2},
    ${slot1.beast.moves.move3},
    ${slot1.beast.moves.move4}
    |s|
    ${slot2.beast.beast_name}>bn>
    ${slot2.beast.item})i)
    ${slot2.beast.moves.move1},
    ${slot2.beast.moves.move2},
    ${slot2.beast.moves.move3},
    ${slot2.beast.moves.move4}
    |s|
    ${slot3.beast.beast_name}>bn>
    ${slot3.beast.item})i)
    ${slot3.beast.moves.move1},
    ${slot3.beast.moves.move2},
    ${slot3.beast.moves.move3},
    ${slot3.beast.moves.move4}
    |s|
    ${slot4.beast.beast_name}>bn>
    ${slot4.beast.item})i)
    ${slot4.beast.moves.move1},
    ${slot4.beast.moves.move2},
    ${slot4.beast.moves.move3},
    ${slot4.beast.moves.move4}
    |s|
    ${slot5.beast.beast_name}>bn>
    ${slot5.beast.item})i)
    ${slot5.beast.moves.move1},
    ${slot5.beast.moves.move2},
    ${slot5.beast.moves.move3},
    ${slot5.beast.moves.move4}`

    return teamDatastring;
}