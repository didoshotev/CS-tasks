// import GlobalReference from "../globals.js";
import field from "./field.js";
const container = document.getElementById("grid-container");
// let rows = document.getElementsByClassName("gridRow");

export function drawGrid() {
    makeRows2();
}
function makeRows2() {
    
    for (let i = 0; i < field.unitsCollection.length; i++) {
        
        const rollCollection = field.unitsCollection[i];
        const row = document.createElement('div');
        container.appendChild(row).className = "gridRow";
        
        for (let j = 0; j < rollCollection.length; j++) {

            const rollItem = rollCollection[j]
            const newCell = document.createElement('div');
            newCell.className = 'cell'
            newCell.style.backgroundColor = rollItem.backgroundColor
            newCell.textContent = rollItem.defaultText;
            row.appendChild(newCell);
        }
    }
};