import field from "../dom/field.js";
import GlobalReference from "../globals.js";

const swapArrayElements = (arr, x, y) => {
    if (arr.length === 1) return arr;
    arr.splice(y, 1, arr.splice(x, 1, arr[y])[0]);
    return arr;
};

const compareArrayValues = (arr1, arr2) => {
    return JSON.stringify(arr1) == JSON.stringify(arr2)
}

const getRandomNumberFromRange = (maxNum) => {
    return Math.floor(Math.random() * maxNum) + 1   
}

const checkIfValid = (row, coll) => {
    let cell = field.get.cell(row, coll);

    if(cell.isWall) {
        return { error: true, message: "You are not allowed to step there!" };
    }

    return { error: false }
};

const commandsDispatcher = (objectReference, positionToModify, operaion) => {
    objectReference.prevPosition = [objectReference.currentPosition[0], objectReference.currentPosition[1]];
    
    operaion === GlobalReference.SUM_SYMBOL ? (objectReference.currentPosition[positionToModify] += 1) : (objectReference.currentPosition[positionToModify] -= 1)
}


const validDiagonals = {
    a1: false,
    a2: false,
    b1: false,
    b2: false,
}

const validBigCells = {
    a1: false,
    a3: false,
    b2: false,
    c1: false,
    c3: false
}

export { swapArrayElements, validDiagonals, compareArrayValues, validBigCells,
     getRandomNumberFromRange, checkIfValid, commandsDispatcher }