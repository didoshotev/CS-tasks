import DrawService from "../dom/drawPrimary.js";
import GlobalReference from "../globals.js";
import { validDiagonals, compareArrayValues, validBigCells } from "./utils.js";

const destroyedMediumCells = [];
const destroyedBigCells = [];

const checkBigBuilding = (row, coll) => {

    const bigBuildingCordinates = GlobalReference.buildings.big.cordinates;
    const bigBuildingValidCordinates = GlobalReference.buildings.big.validExplosions;

    const isValidRow = row >= bigBuildingCordinates[0][0] && row <= bigBuildingCordinates[0][1];
    const isValidColl = coll >= bigBuildingCordinates[1][0] && coll <= bigBuildingCordinates[1][1];

    if (!(isValidRow && isValidColl)) {
        return;
    }
    destroyedBigCells.push([row, coll]);

    if (destroyedBigCells.length < 5) { return; }

    destroyedBigCells.map(item => {
        validBigCells.a1 === false ? validBigCells.a1 = compareArrayValues(item, bigBuildingValidCordinates.a[0]) : true;
        validBigCells.a3 === false ? validBigCells.a3 = compareArrayValues(item, bigBuildingValidCordinates.a[1]) : true;
        validBigCells.b2 === false ? validBigCells.b2 = compareArrayValues(item, bigBuildingValidCordinates.a[2]) : true;
        validBigCells.c1 === false ? validBigCells.c1 = compareArrayValues(item, bigBuildingValidCordinates.a[3]) : true;
        validBigCells.c3 === false ? validBigCells.c3 = compareArrayValues(item, bigBuildingValidCordinates.a[4]) : true;
    })

    const shouldExplode = validBigCells.a1 && validBigCells.a3 && validBigCells.b2 && validBigCells.c1 && validBigCells.c3;

    shouldExplode && (DrawService.explodeMutlipleCells([...bigBuildingCordinates[0]], [...bigBuildingCordinates[1]]),
        GlobalReference.buildings.big.isAlive = false);
}

const checkMediumBuilding = (row, coll) => {

    const mediumBuildingValidCordinates = GlobalReference.buildings.medium.validExplosions;
    const mediumBuildingCordinates = GlobalReference.buildings.medium.cordinates;

    const isValidRow = (row === mediumBuildingCordinates[0][0] || row === mediumBuildingCordinates[0][1]);
    const isValidColl = (coll === mediumBuildingCordinates[1][0] || coll === mediumBuildingCordinates[1][1]);

    if (!(isValidRow && isValidColl)) {
        return;
    }
    destroyedMediumCells.push([row, coll])

    destroyedMediumCells.map(item => {
        // item = [4, 8]
        validDiagonals.a1 === false ? validDiagonals.a1 = compareArrayValues(item, mediumBuildingValidCordinates.a[0]) : true;
        validDiagonals.a2 === false ? validDiagonals.a2 = compareArrayValues(item, mediumBuildingValidCordinates.a[1]) : true;
        validDiagonals.b1 === false ? validDiagonals.b1 = compareArrayValues(item, mediumBuildingValidCordinates.b[0]) : true;
        validDiagonals.b2 === false ? validDiagonals.b2 = compareArrayValues(item, mediumBuildingValidCordinates.b[1]) : true;
    })

    const areBombsDiagonal = (validDiagonals.a1 && validDiagonals.a2) || (validDiagonals.b1 && validDiagonals.b2);

    areBombsDiagonal && (DrawService.explodeMutlipleCells([...mediumBuildingCordinates[0]], [...mediumBuildingCordinates[1]]),
        GlobalReference.buildings.medium.isAlive = false)
}

const checkSmallBuilding = (row, coll) => {

    const smallBuildCordinates = GlobalReference.buildings.small.cordinates;

    const isInTheRowRange = row >= smallBuildCordinates[0][0] && row <= smallBuildCordinates[0][1];
    const isInTheColumnRange = coll >= smallBuildCordinates[1][0] && coll <= smallBuildCordinates[1][1];

    if (isInTheRowRange && isInTheColumnRange) {
        GlobalReference.buildings.small.isAlive = false;
        DrawService.explodeMutlipleCells([...smallBuildCordinates[0]], [...smallBuildCordinates[1]]);
    }
}

export { checkBigBuilding, checkMediumBuilding, checkSmallBuilding }