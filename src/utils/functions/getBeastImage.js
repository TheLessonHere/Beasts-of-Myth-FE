import angwool from '../../data/assets/angwool.png';
import canight from '../../data/assets/canight.png';
import outfox from '../../data/assets/outfox.png';
import impacabra from '../../data/assets/impacabra.png';
import scorchion from '../../data/assets/scorchion.png';
import kore from '../../data/assets/kore.png';
import surphin from '../../data/assets/surphin.png';
import empyreagle from '../../data/assets/empyreagle.png';
import vilefly from '../../data/assets/vilefly.png';
import mothebo from '../../data/assets/mothebo.png';

export const getBeastImage = (beast) => {
    switch(beast){
        case "angwool":
            return angwool;
        case "canight":
            return canight;
        case "outfox":
            return outfox;
        case "impacabra":
            return impacabra;
        case "scorchion":
            return scorchion;
        case "kore":
            return kore;
        case "surphin":
            return surphin;
        case "empyreagle":
            return empyreagle;
        case "vilefly":
            return vilefly;
        case "mothebo":
            return mothebo;
        default:
            console.log("No beast image found.")
    }
}