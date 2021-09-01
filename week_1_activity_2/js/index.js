import { drawGrid } from './drawGrid.js';
import GameBoardManager from './GameBoardManager.js';
import DrawService from './DrawService.js';
import { activateBomb, armySoldiersCollection, changeLeader, getActiveBombs, manageBombs,  } from './army.js';

let startBtn = document.getElementById('start-btn');
let resetBtn = document.getElementById('reset-btn');
let leaderFormBtn = document.getElementById('change-leader-btn');

let leaderForm = document.getElementById('leader-select');

const SABOTEUR_ID = 4;

drawGrid();
DrawService.start();

const commandObject = {
    'a': () => {
        GameBoardManager.moveTo('left')
    },
    'w': () => {
        GameBoardManager.moveTo('up')
    },
    's': () => {
        GameBoardManager.moveTo('down')
    },
    'd': () => {
        GameBoardManager.moveTo('right')
    },
    'c': () => {
        activateBomb()
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
            
            !isGameOver() && (alert('Game over!'), location.reload());

            manageBombs();
            commandObject[key.key]();
            DrawService.drawSoldiers();
        }
    })

    console.log('old', GameBoardManager.getSoldiersOrderCollection());
    leaderFormBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const isSoldierInArmy = armySoldiersCollection.find(item => item.id === +leaderForm.value);

        if(!isNaN(leaderForm.value) && isSoldierInArmy) {
            
            changeLeader(+leaderForm.value);
            DrawService.drawSoldiers()

        } else {
            alert('Selected soldier is not in the army!');
        }
    })
}

function isGameOver() {
    let check = armySoldiersCollection.find(item => item.id === SABOTEUR_ID) || armySoldiersCollection.length === 0;
    return check ? true : false;
}