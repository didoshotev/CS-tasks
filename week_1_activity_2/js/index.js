import { drawGrid } from './dom/drawGrid.js';
import DrawService from './dom/drawPrimary.js';
import { activateBomb, changeCordinates, changeLeader, getSoldierById, manageBombs } from './services/armyService.js';
import GlobalReference from './globals.js';
import DrawHunter from './dom/drawHunter.js';
import HunterReference from './services/hunterService.js';

let startBtn = document.getElementById('start-btn');
let resetBtn = document.getElementById('reset-btn');
let leaderFormBtn = document.getElementById('change-leader-btn');

let leaderForm = document.getElementById('leader-select');

const SABOTEUR_ID = 4;

drawGrid();
DrawService.start();
DrawHunter.start();

const commandObject = {
    'a': () => {
        changeCordinates('left');
    },
    'w': () => {
        changeCordinates('up');
    },
    's': () => {
        changeCordinates('down');
    },
    'd': () => {
        changeCordinates('right');
    },
    'f': () => {
        activateBomb();
    }
}


startBtn.addEventListener("click", startGame)
resetBtn.addEventListener("click", () => {
    //reset the game
    location.reload();
})

function startGame() {
    startBtn.disabled = true;
    resetBtn.disabled = false;

    window.addEventListener('keydown', (key) => {
        
        if(key.key in commandObject) {
            
            isGameOver() && (alert('Game over!'), location.reload());

            manageBombs();
            commandObject[key.key]();
            DrawService.drawSoldiers();
            
            HunterReference.changeCordinates();
            DrawHunter.drawHunter();
        }
    })

    leaderFormBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const isSoldierInArmy = getSoldierById(+leaderForm.value);

        if(!isNaN(leaderForm.value) && isSoldierInArmy) {
            
            changeLeader(+leaderForm.value);
            DrawService.drawSoldiers();

        } else {
            alert('Selected soldier is not in the army!');
        }
    })
}

function isGameOver() {
    
    const isSaboteurDead        = getSoldierById(SABOTEUR_ID) ? false : true;
    const areBuildingsDestroyed = !GlobalReference.buildings.big.isAlive && !GlobalReference.buildings.medium.isAlive && !GlobalReference.buildings.small.isAlive; 
    
    return isSaboteurDead || areBuildingsDestroyed;
}