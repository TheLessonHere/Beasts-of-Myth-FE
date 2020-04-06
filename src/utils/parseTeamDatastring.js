export default function parseTeamDatastring(teamDatastring){
    const teamObject = JSON.parse(teamDatastring);

    return teamObject;
}