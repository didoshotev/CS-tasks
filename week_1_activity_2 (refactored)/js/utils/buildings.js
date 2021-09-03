import DrawService from "../dom/drawPrimary.js";
import field from "../dom/field.js";
import GlobalReference from "../globals.js";
import { compareArrayValues, validBigCells } from "./utils.js";

const BIG_COLLECTION_NAME = 'BIG';
const MEDIUM_COLLECTION_NAME = 'MEDIUM';
const SMALL_COLLECTION_NAME = 'SMALL';

const destroyedBigCells = [];
const checkBigBuilding = (row, coll) => {

    let cell = field.get.cell(row, coll);
    const isInBuildingRange = cell.name === GlobalReference.buildingNames.BIG;

    if (!isInBuildingRange) {
        return;
    }

    destroyedBigCells.push([row, coll]);

    field.edit.destroyCell(row, coll);

    const validExplosionCordinates = field.get.bigBuildingExplosionCordinates();

    if (destroyedBigCells.length < 5) { return; }

    destroyedBigCells.map(item => {
        validBigCells.a1 === false ? validBigCells.a1 = compareArrayValues(item, validExplosionCordinates[0]) : true;
        validBigCells.a3 === false ? validBigCells.a3 = compareArrayValues(item, validExplosionCordinates[1]) : true;
        validBigCells.b2 === false ? validBigCells.b2 = compareArrayValues(item, validExplosionCordinates[2]) : true;
        validBigCells.c1 === false ? validBigCells.c1 = compareArrayValues(item, validExplosionCordinates[3]) : true;
        validBigCells.c3 === false ? validBigCells.c3 = compareArrayValues(item, validExplosionCordinates[4]) : true;
    })

    const shouldExplode = validBigCells.a1 && validBigCells.a3 && validBigCells.b2 && validBigCells.c1 && validBigCells.c3;

    const cordinates = getCordinatesForDestructrion(BIG_COLLECTION_NAME);

    shouldExplode && (DrawService.explodeMutlipleCells(cordinates[0], cordinates[1]),
        GlobalReference.buildings.big.isAlive = false);
}

const checkMediumBuilding = (row, coll) => {

    let cell = field.get.cell(row, coll);
    const isInBuildingRange = cell.name === GlobalReference.buildingNames.MEDIUM;

    if (!isInBuildingRange) {
        return;
    }

    field.edit.destroyCell(row, coll);

    const shouldCollapse = field.check.mediumForCollapse(row, coll);

    const cordinates = getCordinatesForDestructrion(MEDIUM_COLLECTION_NAME);

    shouldCollapse && (DrawService.explodeMutlipleCells(cordinates[0], cordinates[1]),
        GlobalReference.buildings.medium.isAlive = false)
}

const checkSmallBuilding = (row, coll) => {

    let cell = field.get.cell(row, coll);
    const isInBuildingRange = cell.name === GlobalReference.buildingNames.SMALL;

    if (!isInBuildingRange) {
        return
    }

    const cordinates = getCordinatesForDestructrion(SMALL_COLLECTION_NAME);

    GlobalReference.buildings.small.isAlive = false;
    DrawService.explodeMutlipleCells(cordinates[0], cordinates[1]);
}

function getCordinatesForDestructrion(buildingType) {
    const cordinates = field.get.buildingCordinates(GlobalReference.buildingNames[buildingType])
    let result = [[cordinates[0][0], cordinates[cordinates.length - 1][0]], [cordinates[0][1], cordinates[cordinates.length - 1][1]]];
    return result
}

export { checkBigBuilding, checkMediumBuilding, checkSmallBuilding }