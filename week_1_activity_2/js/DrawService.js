import GameBoardManager from "./GameBoardManager.js";
import { armySoldiersCollection, getArmySoldiersCollection } from './army.js';

// GameBoardManager.changeSoldierLeader(1, 3)

let rows = document.getElementsByClassName('gridRow');
let cells = document.getElementsByClassName("cell");

const DrawService = {

    start() {
        this.initDomSoldiersElements();
        this.drawEnds();
        this.drawSoldiersInit();
    },

    drawSoldiersInit() {
        const armySoldiersUpdated = getArmySoldiersCollection();

        for (let soldier of armySoldiersUpdated) {

            let cellToPlace = this.getCell(soldier.currentPosition[0], soldier.currentPosition[1]);
            cellToPlace.textContent = '';
            cellToPlace.appendChild(soldier.domElement)
        }
    },

    drawSoldiers() {
        const armySoldiersUpdated = getArmySoldiersCollection();
        let lastSoldier;
        for (let i = 0; i < armySoldiersUpdated.length; i++) {
            
            let soldier = armySoldiersCollection[i]
            soldier.domElement.textContent = `${i+1}${soldier.id}`;
            let cellToPlace = this.getCell(soldier.currentPosition[0], soldier.currentPosition[1]);
            cellToPlace.textContent = '';
            cellToPlace.appendChild(soldier.domElement);
            lastSoldier = soldier;
        }

        let emptyCell = this.getCell(lastSoldier.prevPosition[0], lastSoldier.prevPosition[1]);
        emptyCell.textContent = 'X';
    },

    initDomSoldiersElements() {

        for (const soldier of armySoldiersCollection) {
            // console.log(soldier);
            let newEl = this.createCell('div', soldier.id, soldier.color);
            let curretSoldierIndex = armySoldiersCollection.findIndex(item => item.id === soldier.id);
            armySoldiersCollection[curretSoldierIndex].domElement = newEl
        }
    },

    get lastSoldierId() {
        return GameBoardManager.getLastSoldierOrder();
    },

    getCell(row, coll) {
        return [...rows[row].childNodes][coll];
    },

    createCell(el, id, backgroundColor, className) {

        let cell = document.createElement(el);

        // className ? cell.classList.add(`cell ${className}`) : cell.classList.add(`cell`);

        cell.classList.add(`child-cell`);
        let order = armySoldiersCollection.findIndex(item => item.id === id) + 1;
        cell.textContent = `${order}${id}`;
        cell.style.backgroundColor = backgroundColor;

        return cell;
    },

    drawEnds() {
        let currCell = this.getCell(0, 0);
        currCell.style.backgroundColor = 'gray'
    },

    swapCells(oldCell, newCell) {

    },

    changeCell(row, coll, newCell) {
        return [...rows[row].childNodes][coll].replaceWith(newCell);
    }
}

export default DrawService