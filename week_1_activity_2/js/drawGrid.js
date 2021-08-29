const container = document.getElementById("container");
let rows = document.getElementsByClassName("gridRow");

export function drawGrid() {
    makeRows(13);
    makeColumns(13);
}


// Takes (rows, columns) input and makes a grid
function makeRows(rowNum) {

    // Creates rows
    for (let r = 0; r < rowNum; r++) {
        let row = document.createElement("div");
        container.appendChild(row).className = "gridRow";
    };
};

// Creates columns
function makeColumns(cellNum) {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cellNum; j++) {
            let newCell = document.createElement("div");
            rows[j].appendChild(newCell).className = "cell";
            newCell.textContent= 'X'
        };

    };
};

