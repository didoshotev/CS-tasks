const container = document.getElementById("grid-container");
let rows = document.getElementsByClassName("gridRow");

export function drawGrid() {
    makeRows(15);
    makeColumns(15);
    createBuildings();
}


function makeRows(rowNum) {

    // Creates rows
    for (let r = 0; r < rowNum; r++) {
        let row = document.createElement("div");
        container.appendChild(row).className = "gridRow";
    };
};


function makeColumns(cellNum) {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cellNum; j++) {
            let newCell = document.createElement("div");
            rows[j].appendChild(newCell).className = "cell";
            newCell.textContent= 'X'
        };

    };
};

function createBuildings() {
    createSmallBuilding(2, 2);
    createMediumBuilding(4, 7);
    createBigBuilding(8, 1);
}

function createSmallBuilding(row, coll) {
    accessCell(row, coll).className = 'cell small-build';
    accessCell(row, coll + 1).className = 'cell small-build';
    accessCell(row + 1, coll).className = 'cell small-build';
    accessCell(row + 1, coll + 1).className = 'cell small-build';

    let newDiv = document.createElement('div');
    newDiv.textContent = '@';
    newDiv.className = 'small-build';
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

