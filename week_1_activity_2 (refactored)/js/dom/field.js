import GlobalReference from "../globals.js";
import { compareArrayValues } from "../utils/utils.js";

const a = { isWall: true, defaultText: 'W', backgroundColor: 'gray', name: 'a' }
const b = { isWall: false, defaultText: 'X', backgroundColor: 'white', name: 'b' }
const sm = { isWall: false, defaultText: '&', backgroundColor: 'purple', name: GlobalReference.buildingNames.SMALL }
const bg = { isWall: false, defaultText: '%', backgroundColor: 'red', name: GlobalReference.buildingNames.BIG, isDestroyed: false }
const md = { isWall: false, defaultText: '#', backgroundColor: 'green', name: GlobalReference.buildingNames.MEDIUM, isDestroyed: false }
const mda = { isWall: true, defaultText: '#', backgroundColor: 'green', name: GlobalReference.buildingNames.MEDIUM_WALL }

const field = {};
field.get = {};
field.edit = {};
field.check = {};

field.unitsCollection = [
    [a, a, a, a, a, a, a, a, a, a, a, a, a, a, a], //0
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //1
    [a, sm, sm, b, b, b, b, b, b, b, b, b, b, b, a], //2
    [a, sm, sm, b, b, b, b, b, b, b, b, b, b, b, a], //3
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //4
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //5
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //6
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //7 
    [a, b, b, b, b, b, b, b, b, md, md, md, b, b, a], //8
    [a, b, b, b, b, b, b, b, b, md, md, md, b, b, a], //9
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //10
    [a, bg, bg, bg, b, b, b, b, b, b, b, b, b, b, a], //11
    [a, bg, bg, bg, b, b, b, b, b, b, b, b, b, b, a], //12
    [a, bg, bg, bg, b, b, b, b, b, b, b, b, b, b, a], //13
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //14
    [a, a, a, a, a, a, a, a, a, a, a, a, a, a, a], //15
];


field.get.cell = (row, coll) => {
    return field.unitsCollection[row][coll];
};

field.get.buildingCordinates = (name) => {
    let cordinates = [];

    for (let i = 0; i < field.unitsCollection.length; i++) {
        let row = field.unitsCollection[i];

        for (let j = 0; j < row.length; j++) {

            if (name === row[j].name) {
                cordinates.push([i, j]);
            }
        }
    }
    return cordinates
};

field.edit.destroyCell = (row, coll) => {
  
    const currentCell = field.get.cell(row, coll);
    field.unitsCollection[row][coll] = { ...currentCell, isDestroyed: true };
};

field.get.bigBuildingExplosionCordinates = () => {
    
    const bigBuildingCordinates = field.get.buildingCordinates(GlobalReference.buildingNames.BIG);
    const explosionCordinates = [];
    for (let i = 0; i < bigBuildingCordinates.length; i += 2) {
        explosionCordinates.push(bigBuildingCordinates[i]);
    };
    return explosionCordinates;
};

field.check.bigForCollapse = () => {
    // [[11, 1], [11, 3], [12, 2], [13, 1], [13, 3]]
    //      0        2        4        6        8
}

field.check.mediumForCollapse = (row, coll) => {
    // formula to check wheather the building should collapse
    // [4, 9] - [5, 11] and [5, 9] - [4, 11]
    const mdBuilding = field.get.buildingCordinates(GlobalReference.buildingNames.MEDIUM);

    let a1 = compareArrayValues([row, coll], mdBuilding[0]);
    let b1 = compareArrayValues([row, coll], mdBuilding[3]);

    let a2 = compareArrayValues([row, coll], mdBuilding[5]);
    let b2 = compareArrayValues([row, coll], mdBuilding[2]);


    let cellToCheck;
    if (a1) {
        cellToCheck = field.get.cell(mdBuilding[5][0], mdBuilding[5][1]);
    } else if (b1) {
        cellToCheck = field.get.cell(mdBuilding[2][0], mdBuilding[2][1]);
    } else if (a2) {
        cellToCheck = field.get.cell(mdBuilding[0][0], mdBuilding[0][1]);
    } else if (b2) {
        cellToCheck = field.get.cell(mdBuilding[3][0], mdBuilding[3][1]);
    }

    return cellToCheck.isDestroyed
};

export default field;