import { drawGrid } from './drawGrid.js';
import GameBoardManager from './GameBoardManager.js';
import DrawService from './DrawService.js';
const container = document.getElementById("container");
let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("cell");
let startBtn = document.getElementById('start-btn');
let resetBtn = document.getElementById('reset-btn');


drawGrid();
DrawService.start();



startBtn.addEventListener("click", startGame)
resetBtn.addEventListener("click", () => {
    //reset the game
    location.reload();
})



function startGame() {
    startBtn.disabled = true;
    resetBtn.disabled = false;

    window.addEventListener('keydown', (key) => {
        console.log(key.key);
        if(key.key === 'w') {

            console.log('up');
            GameBoardManager.moveTo('up');
            DrawService.drawSoldiers();
            // console.log('new', GameBoardManager.getSoldiersListPositions());
            

        } else if(key.key === 'a') {

            console.log('left');
            GameBoardManager.moveTo('left');
            DrawService.drawSoldiers();


        } else if(key.key === 's') {

            console.log('down');
            GameBoardManager.moveTo('down');
            DrawService.drawSoldiers();

        } else if(key.key === 'd') {

            GameBoardManager.moveTo('right');
            DrawService.drawSoldiers();
        }
    })
}