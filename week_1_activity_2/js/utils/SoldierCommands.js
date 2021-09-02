import { armySoldiersCollection } from "../services/ArmyService.js";
import { checkIfValid } from "./utils.js";


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
        armySoldiersCollection[0].prevPosition = [armySoldiersCollection[0].currentPosition[0], armySoldiersCollection[0].currentPosition[1]];
        armySoldiersCollection[0].currentPosition[0] -= 1;
    },

    'down': () => {
        armySoldiersCollection[0].prevPosition = [armySoldiersCollection[0].currentPosition[0], armySoldiersCollection[0].currentPosition[1]];
        armySoldiersCollection[0].currentPosition[0] += 1;
    },

    'left': () => {
        armySoldiersCollection[0].prevPosition = [armySoldiersCollection[0].currentPosition[0], armySoldiersCollection[0].currentPosition[1]];
        armySoldiersCollection[0].currentPosition[1] -= 1;
    },

    'right': () => {
        armySoldiersCollection[0].prevPosition = [armySoldiersCollection[0].currentPosition[0], armySoldiersCollection[0].currentPosition[1]];
        armySoldiersCollection[0].currentPosition[1] += 1;
    }
}


export default SoldierCommands;