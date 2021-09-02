import { armySoldiersCollection, fireTowardsArmy } from "./ArmyService.js";
import { compareArrayValues, getRandomNumberFromRange } from "../utils/utils.js";
import HunterCommands from "../utils/HunterCommands.js";
import GlobalReference from "../globals.js";

const startPositions = [[1, 1], [13, 1], [1, 13], [13, 13]];

const moveMapper = {
    1: 'up',
    2: 'down',
    3: 'left',
    4: 'right'
}



const HunterReference = {};

HunterReference.hunterObject = { currentPosition: [8, 8], prevPosition: [8, 7], color: 'brown', symbol: '$', domElement: null };

HunterReference.getRandomCordinates = () => {
    return startPositions[getRandomNumberFromRange(GlobalReference.CORNERS_NUMBER)];
}

HunterReference.changeCordinates = () => {

    const nextPosition = getNextMove();
    HunterReference.checkForFire();
    HunterCommands.actions[nextPosition]();
}

function getNextMove() {
    // up
    const move = moveMapper[getRandomNumberFromRange(GlobalReference.POSSIBLE_DIRECTIONS_NUMBER)];

    return isNextMoveInvalid(move) ? getNextMove() : move;
}

function isNextMoveInvalid(move) {

    const isMoveValid = HunterCommands.check[move]();

    return isMoveValid.error;
}

HunterReference.checkForFire = () => {
    // 1, 1
    // open for fire:  [0,0] [0,1] [0,2] [1,0] [2,0] [2, 1] [2, 2] [1, 2]
    const currentPosition = HunterReference.hunterObject.currentPosition;
    const openFirePositions = generatePositions(currentPosition);

    armySoldiersCollection.map(item => {

        openFirePositions.map(cell => {

            const isInRangeForFire = compareArrayValues(item.currentPosition, cell);
            (isInRangeForFire && shouldHunterOpenFire()) && fireTowardsArmy();
        })
    })
}

// Try Heap's algorithm

function generatePositions(arr) {

    const positions = [
        [arr[0] - 1, arr[1] - 1], [arr[0] - 1, arr[1]], [arr[0] - 1, arr[1] + 1],
        [arr[0], arr[1] - 1], [arr[0], arr[1] + 1],
        [arr[0] + 1, arr[1] + 1], [arr[0] + 1, arr[1]], [arr[0] + 1, arr[1] - 1]
    ];

    return positions
}

function shouldHunterOpenFire() {
    return getRandomNumberFromRange(24) % 11 === 0;
    // return getRandomNumberFromRange(2) % 2 === 0;
}

export default HunterReference;