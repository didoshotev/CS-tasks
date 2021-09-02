import HunterReference from "../services/HunterService.js";
import { checkIfValid } from "./utils.js";

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

        HunterReference.hunterObject.prevPosition = [HunterReference.hunterObject.currentPosition[0], HunterReference.hunterObject.currentPosition[1]];
        HunterReference.hunterObject.currentPosition[0] -= 1;
    },

    'down': () => {

        HunterReference.hunterObject.prevPosition = [HunterReference.hunterObject.currentPosition[0], HunterReference.hunterObject.currentPosition[1]];
        HunterReference.hunterObject.currentPosition[0] += 1;
    },

    'left': () => {

        HunterReference.hunterObject.prevPosition = [HunterReference.hunterObject.currentPosition[0], HunterReference.hunterObject.currentPosition[1]];
        HunterReference.hunterObject.currentPosition[1] -= 1;
    },

    'right': () => {

        HunterReference.hunterObject.prevPosition = [HunterReference.hunterObject.currentPosition[0], HunterReference.hunterObject.currentPosition[1]];
        HunterReference.hunterObject.currentPosition[1] += 1;
    }
}


export default HunterCommands;