import GlobalReference from "../globals.js";
import HunterReference from "../services/hunterService.js";
import { checkIfValid, commandsDispatcher } from "./utils.js";

const HunterCommands = {}

HunterCommands.check = {
    
    'up': () => {
        return checkIfValid(HunterReference.hunterObject.currentPosition[0] - 1, HunterReference.hunterObject.currentPosition[1]);
    },
    'down': () => {
        return checkIfValid(HunterReference.hunterObject.currentPosition[0] + 1, HunterReference.hunterObject.currentPosition[1]);
    },
    'left': () => {
        return checkIfValid(HunterReference.hunterObject.currentPosition[0], HunterReference.hunterObject.currentPosition[1] - 1);
    },
    'right': () => {
        return checkIfValid(HunterReference.hunterObject.currentPosition[0], HunterReference.hunterObject.currentPosition[1] + 1);
    }
}


HunterCommands.actions = {

    'up': () => {
        commandsDispatcher(HunterReference.hunterObject, 0, GlobalReference.SUBSTRACT_SYMBOL);
    },

    'down': () => {
        commandsDispatcher(HunterReference.hunterObject, 0, GlobalReference.SUM_SYMBOL);
    },

    'left': () => {
        commandsDispatcher(HunterReference.hunterObject, 1, GlobalReference.SUBSTRACT_SYMBOL);
    },

    'right': () => {
        commandsDispatcher(HunterReference.hunterObject, 1, GlobalReference.SUM_SYMBOL);
    }
}

export default HunterCommands;