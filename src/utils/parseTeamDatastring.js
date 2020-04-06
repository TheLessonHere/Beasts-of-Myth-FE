export default function parseTeamDatastring(teamDatastring){
    const parse1 = teamDatastring.split("]f]");
    const format = parse1[0];
    const parse2 = parse1[1].split("/tn/");
    const team_name = parse2[0];
    const beast_slots = parse2[1].split("|s|")

    const beastParser = (beast_strings) => {
      let beasts = [];
      for(let i = 0; i <= beast_strings.length - 1; i++){
        const starting_str = beast_strings[i];
        const parse1 = starting_str.split(">bn>");
        const beast_name = parse1[0];
        const parse2 = parse1[1].split(")i)");
        const item = parse2[0];
        const move_arr = parse2[1].split(",");
        const beast = {
          slot: `slot${i + 1}`,
          beast_name: beast_name,
          item: item,
          moves: move_arr
        }
        beasts.push(beast);
      }
      return beasts;
    };

    const beasts = beastParser(beast_slots);

    const teamObject = {
        format: format,
        team_name: team_name,
        beasts: beasts
    }

    return teamObject;
}