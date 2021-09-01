const container = document.getElementById("grid-container");
let rows = document.getElementsByClassName("gridRow");
import GlobalReference from './globals.js';

export function drawGrid() {
    makeRows(15);
    makeColumns(15);
    createBuildings();
}

function makeRows(rowNum) {

    // Creates rows
    for (let r = 0; r < rowNum; r++) {
        let row = document.createElement("div");
        
        if(r === 0 || r === 14) {
            row.style.backgroundColor = 'gray';            
        }
        
        container.appendChild(row).className = "gridRow";
    };
};


function makeColumns(cellNum) {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cellNum; j++) {
            let newCell = document.createElement("div");
            if(i === 0 || i === 14) {
                newCell.style.backgroundColor = 'gray';
            }
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
    let c1 = accessCell(row, coll).className = 'cell small-build';
    let c2 = accessCell(row, coll + 1).className = 'cell small-build';
    let c3 = accessCell(row + 1, coll).className = 'cell small-build';
    let c4 = accessCell(row + 1, coll + 1).className = 'cell small-build';
    // c1.textContent;
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

