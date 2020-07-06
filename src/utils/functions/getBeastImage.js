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
import angwoolSuper from '../../data/assets/angwool-super.png';
import canightSuper from '../../data/assets/canight-super.png';
import outfoxSuper from '../../data/assets/outfox-super.png';
import impacabraSuper from '../../data/assets/impacabra-super.png';
import scorchionSuper from '../../data/assets/scorchion-super.png';
import koreSuper from '../../data/assets/kore-super.png';
import surphinSuper from '../../data/assets/surphin-super.png';
import empyreagleSuper from '../../data/assets/empyreagle-super.png';
import vileflySuper from '../../data/assets/vilefly-super.png';
import motheboSuper from '../../data/assets/mothebo-super.png';

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
        case "angwool-super":
            return angwoolSuper;
        case "canight-super":
            return canightSuper;
        case "outfox-super":
            return outfoxSuper;
        case "impacabra-super":
            return impacabraSuper;
        case "scorchion-super":
            return scorchionSuper;
        case "kore-super":
            return koreSuper;
        case "surphin-super":
            return surphinSuper;
        case "empyreagle-super":
            return empyreagleSuper;
        case "vilefly-super":
            return vileflySuper;
        case "mothebo-super":
            return motheboSuper;
        default:
            console.log("No beast image found.")
    }
}