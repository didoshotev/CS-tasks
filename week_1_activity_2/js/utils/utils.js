const swapArrayElements = (arr, x, y) => {
    if (arr.length === 1) return arr;
    arr.splice(y, 1, arr.splice(x, 1, arr[y])[0]);
    return arr;
};

const arrayChecker = (arr1, arr2) => {
    return JSON.stringify(arr1) == JSON.stringify(arr2)
}

const getRandomNumberFromRange = (maxNum) => {
    return Math.floor(Math.random() * maxNum) + 1   
}

const checkIfValid = (row, coll) => {

    if ((row === 0 || row === 14) || (coll === 0 || coll === 14)) {
        return { error: true, message: "You are not allowed to step there!" }
    }

    if ((row === 4 && coll === 8)) {
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

export { swapArrayElements, validDiagonals, arrayChecker, validBigCells, getRandomNumberFromRange, checkIfValid }