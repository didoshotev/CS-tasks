import GlobalReference from "../globals.js";

const a = { isWall: true, defaultText: 'W', backgroundColor: 'gray', name: 'a' }
const b = { isWall: false, defaultText: 'X', backgroundColor: 'white', name: 'b' }
const sm = { isWall: false, defaultText: '&', backgroundColor: 'purple', name: GlobalReference.buildingNames.SMALL }
const bg = { isWall: false, defaultText: '%', backgroundColor: 'red', name: GlobalReference.buildingNames.BIG }
const md = { isWall: false, defaultText: '#', backgroundColor: 'green', name: GlobalReference.buildingNames.MEDIUM }
const mda = { isWall: true, defaultText: '#', backgroundColor: 'green', name: GlobalReference.buildingNames.MEDIUM_WALL }

const field = {}
field.get = {}

field.unitsCollection = [
    [a, a, a, a, a, a, a, a, a, a, a, a, a, a, a], //0
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //1
    [a, sm, sm, b, b, b, b, b, b, b, b, b, b, b, a], //2
    [a, sm, sm, b, b, b, b, b, b, b, b, b, b, b, a], //3
    [a, b, b, b, b, b, b, b, b, md, md, md, b, b, a], //4
    [a, b, b, b, b, b, b, b, b, md, md, md, b, b, a], //5
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //6
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //7 
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //8
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //9
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //10
    [a, bg, bg, bg, b, b, b, b, b, b, b, b, b, b, a], //11
    [a, bg, bg, bg, b, b, b, b, b, b, b, b, b, b, a], //12
    [a, bg, bg, bg, b, b, b, b, b, b, b, b, b, b, a], //13
    [a, b, b, b, b, b, b, b, b, b, b, b, b, b, a], //14
    [a, a, a, a, a, a, a, a, a, a, a, a, a, a, a], //15
];

// field.unitsCollection[10][4].isWall = true;
// field.unitsCollection[10][5].isWall = true;

field.get.cell = (row, coll) => {
    return field.unitsCollection[row][coll];
}

field.get.buildingCordinates = (name) => {
    let cordinates = [];

    for (let i = 0; i < field.unitsCollection.length; i++) {
        let row = field.unitsCollection[i];

        for (let j = 0; j < row.length; j++) {

            if(name === row[j].name) {
                cordinates.push([i, j]);
            }
        }
    }
    return cordinates
}

export default field;