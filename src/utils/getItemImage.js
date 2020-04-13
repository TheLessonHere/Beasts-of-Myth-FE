import supercrystal from '../data/assets/supercrystal.png';
import focusvest from '../data/assets/focusvest.png';
import focuscap from '../data/assets/focuscap.png';
import focusbrace from '../data/assets/focusbrace.png';
import berry from '../data/assets/berry.png';


export const getItemImage = (item) => {
    switch(item){
        case "super crystal":
            return supercrystal;
        case "focus vest":
            return focusvest;
        case "focus cap":
            return focuscap;
        case "focus brace":
            return focusbrace;
        case "berry":
            return berry;
    }
}