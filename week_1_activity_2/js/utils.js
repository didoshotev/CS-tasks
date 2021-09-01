const swapArrayElements = (arr, x, y) => {
    if (arr.length === 1) return arr;
    arr.splice(y, 1, arr.splice(x, 1, arr[y])[0]);
    return arr;
};

const arrayChecker = (arr1, arr2) => {
    return JSON.stringify(arr1) == JSON.stringify(arr2)
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

export { swapArrayElements, validDiagonals, arrayChecker, validBigCells }