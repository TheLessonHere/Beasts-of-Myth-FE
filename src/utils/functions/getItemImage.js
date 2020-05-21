import supercrystal from '../../data/assets/supercrystal.png';
import focusvest from '../../data/assets/focusvest.png';
import focuscap from '../../data/assets/focuscap.png';
import focusbrace from '../../data/assets/focusbrace.png';
import bulkyvest from '../../data/assets/bulkyvest.png';
import bulkycap from '../../data/assets/bulkycap.png';
import spikeyvest from '../../data/assets/spikeyvest.png';
import spikeycap from '../../data/assets/spikeycap.png';
import protectiveboots from '../../data/assets/protectiveboots.png';
import leadboots from '../../data/assets/leadboots.png';
import repellentcoat from '../../data/assets/repellentcoat.png';
import slickcoat from '../../data/assets/slickcoat.png';
import assistbrace from '../../data/assets/assistbrace.png';
import firstaidkit from '../../data/assets/firstaidkit.png';
import evilcontract from '../../data/assets/evilcontract.png';
import specialistamulet from '../../data/assets/specialistamulet.png';
import challangecertificate from '../../data/assets/challangecertificate.png';
import perapberry from '../../data/assets/perapberry.png';
import asayoberry from '../../data/assets/asayoberry.png';
import blantoberry from '../../data/assets/blantoberry.png';
import citrumberry from '../../data/assets/citrumberry.png';
import gomaberry from '../../data/assets/gomaberry.png';
import graniteberry from '../../data/assets/graniteberry.png';
import plumeberry from '../../data/assets/plumeberry.png';
import spinapberry from '../../data/assets/spinapberry.png';
import chaosamulet from '../../data/assets/chaosamulet.png';
import darkamulet from '../../data/assets/darkamulet.png';
import mindamulet from '../../data/assets/mindamulet.png';
import lightamulet from '../../data/assets/lightamulet.png';
import terraamulet from '../../data/assets/terraamulet.png';
import seaamulet from '../../data/assets/seaamulet.png';
import flameamulet from '../../data/assets/flameamulet.png';
import skyamulet from '../../data/assets/skyamulet.png';
import brightstone from '../../data/assets/brightstone.png';
import concussiveturbine from '../../data/assets/concussiveturbine.png';
import entrancingorb from '../../data/assets/entrancingorb.png';
import flamebarb from '../../data/assets/flamebarb.png';
import impossibleobject from '../../data/assets/impossibleobject.png';
import mysteriousbox from '../../data/assets/mysteriousbox.png';
import sproutingseed from '../../data/assets/sproutingseed.png';
import wetblanket from '../../data/assets/wetblanket.png';

export const getItemImage = (item) => {
    switch(item){
        case "concussive turbine":
            return concussiveturbine;
        case "entrancing orb":
            return entrancingorb;
        case "flame barb":
            return flamebarb;
        case "impossible object":
            return impossibleobject;
        case "mysterious box":
            return mysteriousbox;
        case "sprouting seed":
            return sproutingseed;
        case "wet blanket":
            return wetblanket;
        case "bright stone":
            return brightstone;
        case "chaos amulet":
            return chaosamulet;
        case "dark amulet":
            return darkamulet;
        case "mind amulet":
            return mindamulet;
        case "light amulet":
            return lightamulet;
        case "terra amulet":
            return terraamulet;
        case "sea amulet":
            return seaamulet;
        case "sky amulet":
            return skyamulet;
        case "flame amulet":
            return flameamulet;
        case "super crystal":
            return supercrystal;
        case "focus vest":
            return focusvest;
        case "focus cap":
            return focuscap;
        case "focus brace":
            return focusbrace;
        case "bulky vest":
            return bulkyvest;
        case "bulky cap":
            return bulkycap;
        case "spikey vest":
            return spikeyvest;
        case "spikey cap":
            return spikeycap;
        case "protective boots":
            return protectiveboots;
        case "lead boots":
            return leadboots;
        case "repellent coat":
            return repellentcoat;
        case "slick coat":
            return slickcoat;
        case "assist brace":
            return assistbrace;
        case "first aid kit":
            return firstaidkit;
        case "evil contract":
            return evilcontract;
        case "specialist amulet":
            return specialistamulet;
        case "challenge certificate":
            return challangecertificate;
        case "perap berry":
            return perapberry;
        case "asayo berry":
            return asayoberry;
        case "blanto berry":
            return blantoberry;
        case "citrum berry":
            return citrumberry;
        case "goma berry":
            return gomaberry;
        case "granite berry":
            return graniteberry;
        case "plume berry":
            return plumeberry;
        case "spinap berry":
            return spinapberry;
        default:
            return null;
    }
}