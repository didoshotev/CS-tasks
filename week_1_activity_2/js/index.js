import { drawGrid } from './drawGrid.js';
const container = document.getElementById("container");
let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("cell");

drawGrid();




function accessCell(rowNumber, columnNumber) {
    let cell = rows[rowNumber].childNodes[columnNumber];
    return cell;
}
