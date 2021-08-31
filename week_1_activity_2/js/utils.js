function swapArrayElements(arr, x, y) {
    if (arr.length === 1) return arr;
    arr.splice(y, 1, arr.splice(x, 1, arr[y])[0]);
    return arr;
};

export { swapArrayElements }