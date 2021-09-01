import {  changeCordinates } from "./army.js";

const GameBoardManager = {

    moveTo(direction) {
        changeCordinates(direction);
    },

    checkIfValid(row, coll) {

        if ((row === 0 || row === 14) || (coll === 0 || coll === 14)) {
            return { error: true, message: "You are not allowed to step there!" }
        }

        if ((row === 4 && coll === 8)) {
            return { error: true, message: "You can't go throgh this buidling!" }
        }
        return { error: false }
    },

}

export default GameBoardManager;

