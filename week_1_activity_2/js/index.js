import { drawGrid } from './drawGrid.js';
import { Soldiers } from './army.js';
import { DomFactory } from './domFactory.js';
const container = document.getElementById("container");
let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("cell");
let startBtn = document.getElementById('start-btn');
let resetBtn = document.getElementById('reset-btn');

drawGrid();
createBuildings();

startBtn.addEventListener("click", startGame)
resetBtn.addEventListener("click", () => {
    //reset the game
    startBtn.disabled = false;
    resetBtn.disabled = true;
})


const soldiersList = initSoliders();
const soldiersListPositions = initSolidersPositions();
drawSoldiers()

console.log(soldiersList);
console.log(soldiersListPositions);

const item = getCell(0, 0);
// item.textContent = '';
// item.appendChild(soldiersList.fisher);


function startGame() {
    // initSoliders()
    startBtn.disabled = true;
    resetBtn.disabled = false;

   
    window.addEventListener('keydown', (key) => {
        console.log(key);
        if(key.key === 'w') {
            console.log('forward');
            moveSoldiers('forward');
            // changeCell(11, 7, soldiersList['tank']);
            
        }
    })
}

function moveSoldiers(moveTo) {
    if(moveTo === 'forward') {
        let nextSoldierCordinates = [];
        let currentCordinates = [];
        // console.log('old', soldiersListPositions);

        for (const soldierKey in soldiersListPositions) {
            
            if(soldiersListPositions[soldierKey].isLeader) {
                nextSoldierCordinates = [soldiersListPositions[soldierKey].cordinates[0], soldiersListPositions[soldierKey].cordinates[1]]
                soldiersListPositions[soldierKey].cordinates[0]--;
            } else {
                currentCordinates = soldiersListPositions[soldierKey].cordinates; 
                soldiersListPositions[soldierKey].cordinates = nextSoldierCordinates;
                nextSoldierCordinates = currentCordinates;
            }
            drawSoldiers();
        }

    } else if (moveTo === 'downwards') {

    }
}


function appendCell(row, coll, childCell) {
    const currentCell = getCell(row, coll)
    currentCell.textContent = '';
    currentCell.appendChild(childCell);
    return currentCell;
}

function initSoliders() {
    let fisher = createCell('div', 44, 'purple');
    let drunker = createCell('div', 33, 'yellow');
    let sniper = createCell('div', 22, 'orange');
    let tank = createCell('div', 11, 'red');

    return {
        fisher,
        drunker,
        sniper,
        tank
    }
}


function initSolidersPositions() {
    const startPositions = {
        1: { nickname: 'tank', cordinates: [11, 8], isLeader: true },
        2: { nickname: 'sniper', cordinates: [11, 9], isLeader: false },
        3: { nickname: 'drunker', cordinates: [11, 10], isLeader: false },
        4: { nickname: 'fisher', cordinates: [11, 11], isLeader: false },
    }

    return startPositions;
}

function drawSoldiers() {
    for (let soldierKey in soldiersListPositions) {
        let current = soldiersListPositions[soldierKey];
        let cellToPlace = getCell(current.cordinates[0], current.cordinates[1]);
        cellToPlace.textContent = '';
        cellToPlace.appendChild(soldiersList[current.nickname])
    }
}

function createCell(el, text, backgroundColor, className) {
    let cell = document.createElement(el);
    // className ? cell.classList.add(`cell ${className}`) : cell.classList.add(`cell`);
    cell.classList.add(`child-cell`);
    cell.textContent = text;
    cell.style.backgroundColor = backgroundColor;
    return cell
}

function changeCell(row, coll, newCell) {
    return [...rows[row].childNodes][coll].replaceWith(newCell);
}

function getCell(row, coll) {
    return [...rows[row].childNodes][coll];
}

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
