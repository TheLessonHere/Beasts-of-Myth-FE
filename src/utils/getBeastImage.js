import angwool from '../data/assets/angwool.png';
import canight from '../data/assets/canight.png';
import outfox from '../data/assets/outfox.png';
import impacabra from '../data/assets/impacabra.png';
import scorchion from '../data/assets/scorchion.png';
import kore from '../data/assets/kore.png';
import surphin from '../data/assets/surphin.png';
import empyreagle from '../data/assets/empyreagle.png';
import vilefly from '../data/assets/vilefly.png';
import mothebo from '../data/assets/mothebo.png';

export const getBeastImage = (beast) => {
    switch(beast){
        case "angwool":
            return angwool;
            break;
        case "canight":
            return canight;
            break;
        case "outfox":
            return outfox;
            break;
        case "impacabra":
            return impacabra;
            break;
        case "scorchion":
            return scorchion;
            break;
        case "kore":
            return kore;
            break;
        case "surphin":
            return surphin;
            break;
        case "empyreagle":
            return empyreagle;
            break;
        case "vilefly":
            return vilefly;
            break;
        case "mothebo":
            return mothebo;
            break;
    }
}