import GameBoardManager from "./GameBoardManager.js";
import { armySoldiersCollection, getArmySoldiersCollection } from './army.js';

// GameBoardManager.changeSoldierLeader(1, 3)

let rows = document.getElementsByClassName('gridRow');
let cells = document.getElementsByClassName("cell");


const soldiersListPositions = GameBoardManager.getSoldiersListPositions();

const DrawService = { 

    start() {
        this.initDomSoldiersElements();
        this.drawSoldiersInit();
    },

    drawSoldiersInit() {
        const armySoldiersUpdated = getArmySoldiersCollection();

        for (let soldier in armySoldiersUpdated) {
            
            let currentSoldier = soldiersListPositions[armySoldiersCollection[soldier].id];

            let cellToPlace = this.getCell(currentSoldier.cordinates[0], currentSoldier.cordinates[1]);
            cellToPlace.textContent = '';
            cellToPlace.appendChild(armySoldiersCollection[soldier].domElement)
        }
    },

    drawSoldiers() {
        const armySoldiersUpdated = getArmySoldiersCollection();

        for (let soldier in armySoldiersUpdated) {
            
            let currentSoldier = soldiersListPositions[armySoldiersCollection[soldier].id];

            let cellToPlace = this.getCell(currentSoldier.cordinates[0], currentSoldier.cordinates[1]);
            cellToPlace.textContent = '';
            cellToPlace.appendChild(armySoldiersCollection[soldier].domElement)
            
            // reseting last box
            if(+armySoldiersUpdated[soldier].id === +this.lastSoldierId) {
                let emptyCell = this.getCell(armySoldiersUpdated[soldier].prevPosition[0], armySoldiersUpdated[soldier].prevPosition[1]);
                emptyCell.textContent = 'X';
            }
        }
    },

    initDomSoldiersElements() {
        
        for (const soldier of armySoldiersCollection) {
            
            let newEl = this.createCell('div', soldier.id, soldier.color);
            let curretSoliderIndex = armySoldiersCollection.findIndex(item => item.id === soldier.id);
            armySoldiersCollection[curretSoliderIndex].domElement = newEl
        }
    },

    get lastSoldierId() {
        return GameBoardManager.getLastSoldierOrder();
    },
    
    getCell(row, coll) { 
        return [...rows[row].childNodes][coll];
    },
    
    createCell(el, text, backgroundColor, className) {
    
        let cell = document.createElement(el);
    
        // className ? cell.classList.add(`cell ${className}`) : cell.classList.add(`cell`);
    
        cell.classList.add(`child-cell`);
        cell.textContent = `${text}${soldiersListPositions[text].order}`;
        cell.style.backgroundColor = backgroundColor;
        
        return cell;
    }
}

export default DrawService