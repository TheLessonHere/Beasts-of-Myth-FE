import { beasts } from '../../data/libraries/BeastLibrary';
import { items } from '../../data/libraries/ItemLibrary';
import { moves } from '../../data/libraries/MoveLibrary';

export default function validateTeam (format, slot1, slot2, slot3, slot4, slot5, setIsValid) {

    if(slot1 === null ||
      slot2 === null ||
      slot3 === null ||
      slot4 === null ||
      slot5 === null){
      alert("Your team doesn't have enough beasts.");
      return;
    } else {
      if(format.length === 0 || !format){
        alert("Please select a format.");
        setIsValid(false);
        return;
      }

      const iterableTeam = [];
      iterableTeam.push(slot1);
      iterableTeam.push(slot2);
      iterableTeam.push(slot3);
      iterableTeam.push(slot4);
      iterableTeam.push(slot5);

      let superCounter = 0;

      for(let i = 0; i < iterableTeam.length; i++){
        if(iterableTeam[i].format !== format){
          alert(`${iterableTeam[i].beast_name} is not allowed in this format.`);
          setIsValid(false);
          break;
        }

        if(iterableTeam[i].item !== null){
          if(iterableTeam[i].item.format !== format){
            alert(`${iterableTeam[i].beast_name}'s item is not usable in this format.`)
          }
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
            alert("Beasts cannot have more than one copy of the same move.");
            setIsValid(false);
            break;
          }

        if(move1 !== null){
          const move1Valid = moves.find(move =>
            move.move_name === move1.move_name);

          if(!move1Valid){
            alert(`${iterableTeam[i].beast_name}'s first move is invalid.`);
            setIsValid(false);
            break;
          }
        }

        if(move2 !== null){
          const move2Valid = moves.find(move =>
            move.move_name === move2.move_name);

          if(!move2Valid){
            alert(`${iterableTeam[i].beast_name}'s second move is invalid.`);
            setIsValid(false);
            break;
          }
        }

        if(move3 !== null){
          const move3Valid = moves.find(move =>
            move.move_name === move3.move_name);

          if(!move3Valid){
            alert(`${iterableTeam[i].beast_name}'s third move is invalid.`);
            setIsValid(false);
            break;
          }
        }

        if(move4 !== null){
          const move4Valid = moves.find(move =>
            move.move_name === move4.move_name);

          if(!move4Valid){
            alert(`${iterableTeam[i].beast_name}'s fourth move is invalid.`);
            setIsValid(false);
            break;
          }
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