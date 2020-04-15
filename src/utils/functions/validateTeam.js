export default function validateTeam (format, slot1, slot2, slot3, slot4, slot5, setIsValid) {
    if(slot1 === null ||
      slot2 === null ||
      slot3 === null ||
      slot4 === null ||
      slot5 === null){
      alert("Your team doesn't have enough beasts.");
      return;
    } else {
      const iterableTeam = [];
      iterableTeam.push(slot1);
      iterableTeam.push(slot2);
      iterableTeam.push(slot3);
      iterableTeam.push(slot4);
      iterableTeam.push(slot5);
      let superCounter = 0;
      for(let i = 0; i < iterableTeam.length; i++){
        if(iterableTeam[i] === null){
          continue;
        }
        if(format.length === 0){
          alert("Please select a format.");
          setIsValid(false);
          break;
        }
        if(iterableTeam[i].format !== format){
          alert(`${iterableTeam[i].beast_name} is not allowed in this format.`);
          setIsValid(false);
          break;
        }
        const move1 = iterableTeam[i].moves.get('move1');
        const move2 = iterableTeam[i].moves.get('move2');
        const move3 = iterableTeam[i].moves.get('move3');
        const move4 = iterableTeam[i].moves.get('move4');
        if(move1 === null &&
          move2 === null &&
          move3 === null &&
          move4 === null){
            alert(`${iterableTeam[i].beast_name} has no moves.`);
            setIsValid(false);
            break;
          }
        if(move1 === move2 && move1 !== null && move2 !== null ||
          move1 === move3 && move1 !== null && move3 !== null ||
          move1 === move4 && move1 !== null && move4 !== null ||
          move2 === move3 && move2 !== null && move3 !== null ||
          move2 === move4 && move2 !== null && move4 !== null ||
          move3 === move4 && move3 !== null && move4 !== null){
            alert("Beasts cannot have more than one copy of the same move.")
            setIsValid(false);
            break;
          }
        if(iterableTeam[i].item !== null && iterableTeam[i].item.item_name === "Super Crystal"){
          superCounter++;
          if(superCounter > 1){
            alert("Teams are only allowed one beast with a Super Crystal.");
            setIsValid(false);
            break;
          }
        }
        if(i === iterableTeam.length - 1){
          setIsValid(true);
          continue;
        }
      }
    }
  }