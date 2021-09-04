import { armySoldiersCollection, getArmySoldiersCollection, getSoldierIndex } from '../services/armyService.js';
import variables from './variables.js';

let rows = document.getElementsByClassName('gridRow');

const DrawService = {

    start() {
        this.initDomSoldiersElements();
        this.drawSoldiersInit();
    },

    drawSoldiersInit() {
        const armySoldiersUpdated = getArmySoldiersCollection();

        for (let soldier of armySoldiersUpdated) {

            let cellToPlace         = this.getCell(soldier.currentPosition[0], soldier.currentPosition[1]);
            
            cellToPlace.textContent = variables.TEXT_EMTY;
            cellToPlace.appendChild(soldier.domElement)
        }
    },

    drawSoldiers() {
        const armySoldiersUpdated = getArmySoldiersCollection();
        let lastSoldier;
        for (let i = 0; i < armySoldiersUpdated.length; i++) {
            
            let soldier                    = armySoldiersCollection[i]
            soldier.domElement.textContent = `${i+1}${soldier.id}`;
            
            let cellToPlace         = this.getCell(soldier.currentPosition[0], soldier.currentPosition[1]);
            cellToPlace.textContent = variables.TEXT_EMTY;
            cellToPlace.appendChild(soldier.domElement);
            
            lastSoldier = soldier;
        }

        let emptyCell = this.getCell(lastSoldier.prevPosition[0], lastSoldier.prevPosition[1]);
        emptyCell.textContent = variables.TEXT_X;
        
    },

    initDomSoldiersElements() {

        for (const soldier of armySoldiersCollection) {
            
            let newEl              = this.createCell('div', soldier.id, soldier.color);
            let curretSoldierIndex = getSoldierIndex(soldier.id);
            
            armySoldiersCollection[curretSoldierIndex].domElement = newEl
        }
    },

    getCell(row, coll) {
        return [...rows[row].childNodes][coll];
    },

    createCell(el, id, backgroundColor, className) {

        let cell = document.createElement(el);

        cell.classList.add(`child-cell`);
        let order = getSoldierIndex(id) + 1;

        cell.textContent           = `${order}${id}`;
        cell.style.backgroundColor = backgroundColor;

        return cell;
    },

    explodeCell(row, coll) {
        
        const explodedCell                 = this.getCell(row, coll);
        
        explodedCell.textContent           = '000';
        explodedCell.style.backgroundColor = 'black';
    },

    explodeMutlipleCells([startRow, endRow], [startColl, endColl]) {

        for (let i = startRow; i <= endRow; i++) {

            for (let k = startColl; k <= endColl; k++) {
                this.explodeCell(i, k); 
            }
        }
    },

    resetCell(row, coll) {
        const cell       = this.getCell(row, coll);
        cell.innerText   = variables.TEXT_X;
        cell.style.color = 'white';
    }


}

export default DrawService