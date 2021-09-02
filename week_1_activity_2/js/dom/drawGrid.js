const container = document.getElementById("grid-container");
let rows = document.getElementsByClassName("gridRow");
import GlobalReference from '../globals.js';

export function drawGrid() {
    makeRows(15);
    makeColumns(15);
    createBuildings();
}

function makeRows(rowNum) {

    // Creates rows
    for (let r = 0; r < rowNum; r++) {
        let row = document.createElement("div");
        
        if(r === GlobalReference.MIN_ROW_COLL_NUM || r === GlobalReference.MAX_ROW_COLL_NUM) {
            row.style.backgroundColor = 'gray';            
        }
        
        container.appendChild(row).className = "gridRow";
    };
};


function makeColumns(cellNum) {
    for (let i = 0; i < rows.length; i++) {

        for (let j = 0; j < cellNum; j++) {
        
            let newCell = document.createElement("div");
        
            (i === GlobalReference.MIN_ROW_COLL_NUM || i === GlobalReference.MAX_ROW_COLL_NUM) && (newCell.style.backgroundColor = 'gray');

            rows[j].appendChild(newCell).className = "cell";
            newCell.textContent= 'X'
        };
    };
};

function createBuildings() {
    createSmallBuilding(GlobalReference.buildings.small.cordinates[0][0], GlobalReference.buildings.small.cordinates[1][0])
    createMediumBuilding(GlobalReference.buildings.medium.cordinates[0][0], GlobalReference.buildings.medium.cordinates[1][0])
    createBigBuilding(GlobalReference.buildings.big.cordinates[0][0], GlobalReference.buildings.big.cordinates[1][0])
}

function createSmallBuilding(row, coll) {
    accessCell(row, coll).className = 'cell small-build';
    accessCell(row, coll + 1).className = 'cell small-build';
    accessCell(row + 1, coll).className = 'cell small-build';
    accessCell(row + 1, coll + 1).className = 'cell small-build';
}

function createMediumBuilding(row, coll) {
    accessCell(row, coll).className = 'cell medium-build';
    accessCell(row, coll + 1).className = 'cell medium-build';
    accessCell(row, coll + 2).className = 'cell medium-build';

    accessCell(row + 1, coll).className = 'cell medium-build';
    accessCell(row + 1, coll + 1).className = 'cell medium-build';
    accessCell(row + 1, coll + 2).className = 'cell medium-build';

}

function createBigBuilding(row, coll) {
    accessCell(row, coll).className = 'cell big-build';
    accessCell(row, coll + 1).className = 'cell big-build';
    accessCell(row, coll + 2).className = 'cell big-build';

    accessCell(row + 1, coll).className = 'cell big-build';
    accessCell(row + 1, coll + 1).className = 'cell big-build';
    accessCell(row + 1, coll + 2).className = 'cell big-build';

    accessCell(row + 2, coll).className = 'cell big-build';
    accessCell(row + 2, coll + 1).className = 'cell big-build';
    accessCell(row + 2, coll + 2).className = 'cell big-build';
}

function accessCell(rowNumber, columnNumber) {
    let cell = rows[rowNumber].childNodes[columnNumber];
    return cell;
}

