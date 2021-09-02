import GlobalReference from "../globals.js";
import { armySoldiersCollection } from "../services/armyService.js";
import { checkIfValid, commandsDispatcher } from "./utils.js";

const SoldierCommands = {};

SoldierCommands.check = {

    'up': () => {
        return checkIfValid(armySoldiersCollection[0].currentPosition[0] - 1, armySoldiersCollection[0].currentPosition[1]);
    },
    'down': () => {
        return checkIfValid(armySoldiersCollection[0].currentPosition[0] + 1, armySoldiersCollection[0].currentPosition[1]);
    },
    'left': () => {
        return checkIfValid(armySoldiersCollection[0].currentPosition[0], armySoldiersCollection[0].currentPosition[1] - 1);
    },
    'right': () => {
        return checkIfValid(armySoldiersCollection[0].currentPosition[0], armySoldiersCollection[0].currentPosition[1] + 1);
    }
}

SoldierCommands.actions = {

    'up': () => {
        commandsDispatcher(armySoldiersCollection[0], 0, GlobalReference.SUBSTRACT_SYMBOL);
    },

    'down': () => {
        commandsDispatcher(armySoldiersCollection[0], 0, GlobalReference.SUM_SYMBOL);
    },

    'left': () => {
        commandsDispatcher(armySoldiersCollection[0], 1, GlobalReference.SUBSTRACT_SYMBOL);
    },

    'right': () => {
        commandsDispatcher(armySoldiersCollection[0], 1, GlobalReference.SUM_SYMBOL)
    }
}


export default SoldierCommands;