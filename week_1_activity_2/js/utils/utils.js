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
    
    const areCordinatesInTheField = (row === GlobalReference.MIN_ROW_COLL_NUM || row === GlobalReference.MAX_ROW_COLL_NUM) || (coll === GlobalReference.MIN_ROW_COLL_NUM || coll === GlobalReference.MAX_ROW_COLL_NUM); 

    if (areCordinatesInTheField) {
        return { error: true, message: "You are not allowed to step there!" }
    }

    if ((row === 4 && coll === 8) || (row === 5 && coll === 8)) {
        return { error: true, message: "You can't go throgh this buidling!" }
    }
    return { error: false }
};


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

export { swapArrayElements, validDiagonals, compareArrayValues, validBigCells, getRandomNumberFromRange, checkIfValid }