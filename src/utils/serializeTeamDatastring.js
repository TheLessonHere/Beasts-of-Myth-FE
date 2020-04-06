export default function serializeTeamDatastring(team){
    const teamObject = {
        format: team.format,
        team_name: team.team_name,
        slot1: team.slot1,
        slot2: team.slot2,
        slot3: team.slot3,
        slot4: team.slot4,
        slot5: team.slot5,
        super_beast: team.super_beast,
        active_slot: team.active_slot,
        total_beasts: team.total_beasts
    }

    const teamDatastring = JSON.serialize(teamObject);

    return teamDatastring;
}