import { armySoldiersCollection, fireTowardsArmy } from "./ArmyService.js";
import { arrayChecker, checkIfValid, getRandomNumberFromRange } from "../utils/utils.js";

const CORNERS_NUMBER = 4;
const POSSIBLE_DIRECTIONS_NUMBER = 4;

const startPositions = [[1, 1], [13, 1], [1, 13], [13, 13]];

const moveMapper = {
    1: 'up',
    2: 'down',
    3: 'left',
    4: 'right'
}

const commandsHunter = {

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

const HunterReference = {};

HunterReference.hunterObject = { currentPosition: [8, 8], prevPosition: [8, 7], color: 'brown', symbol: '$', domElement: null };

HunterReference.getRandomCordinates = () => {
    return startPositions[getRandomNumberFromRange(CORNERS_NUMBER)];
}

HunterReference.changeCordinates = () => {

    const nextPosition = getNextMove();
    HunterReference.checkForFire();
    commandsHunter[nextPosition]();
}

function getNextMove() {
    // up
    const move = moveMapper[getRandomNumberFromRange(POSSIBLE_DIRECTIONS_NUMBER)];

    return isNextMoveInvalid(move) ? getNextMove() : move;
}

function isNextMoveInvalid(move) {
    let isMoveValid;

    if (move === 'up') {

        isMoveValid = checkIfValid(HunterReference.hunterObject.currentPosition[0] - 1, HunterReference.hunterObject.currentPosition[1]);
    } else if (move === 'down') {

        isMoveValid = checkIfValid(HunterReference.hunterObject.currentPosition[0] + 1, HunterReference.hunterObject.currentPosition[1]);
    } else if (move === 'left') {

        isMoveValid = checkIfValid(HunterReference.hunterObject.currentPosition[0], HunterReference.hunterObject.currentPosition[1] - 1);
    } else if (move === 'right') {

        isMoveValid = checkIfValid(HunterReference.hunterObject.currentPosition[0], HunterReference.hunterObject.currentPosition[1] + 1);
    }

    return isMoveValid.error;
}

HunterReference.checkForFire = () => {
    // 1, 1
    // open for fire:  [0,0] [0,1] [0,2] [1,0] [2,0] [2, 1] [2, 2] [1, 2]
    const currentPosition = HunterReference.hunterObject.currentPosition;
    const openFirePositions = generatePositions(currentPosition);
    
    armySoldiersCollection.map(item => {

        openFirePositions.map(cell => {

            const isInRangeForFire = arrayChecker(item.currentPosition, cell);
            (isInRangeForFire && shouldHunterOpenFire()) && fireTowardsArmy();
        })
    })
}

// Try Heap's algorithm

function generatePositions(arr) {

    const positions = [
        [arr[0] -1, arr[1] -1], [arr[0]- 1, arr[1]], [arr[0]- 1, arr[1]+1],
        [arr[0], arr[1]- 1], [arr[0], arr[1]+1],
        [arr[0]+1, arr[1]+1], [arr[0]+1, arr[1]], [arr[0]+1, arr[1]- 1]
    ];

    return positions
}

function shouldHunterOpenFire() {
    return getRandomNumberFromRange(24) % 11 === 0;
    // return getRandomNumberFromRange(2) % 2 === 0;
}

export default HunterReference;