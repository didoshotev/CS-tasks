import { getArmySoldiersCollection, updateArmySoldiersCollectionPositions, changeCordinates } from "./army.js";
let soldiersOrderCollection = [1, 2, 3, 4]; // [3, 2, 1, 4]

const soldiersListPositions = {

    1: { nickname: 'tank', cordinates: [13, 10], symbol: getSoldierSymbol(1), order: 3 },
    2: { nickname: 'sniper', cordinates: [13, 11], symbol: getSoldierSymbol(2), order: 2 },
    3: { nickname: 'drunker', cordinates: [13, 12], symbol: getSoldierSymbol(3), order: 1 },
    4: { nickname: 'fisher', cordinates: [13, 13], symbol: getSoldierSymbol(4), order: 4 },
}

// [[startRow, endRow], [startColl, endColl]]

const GameBoardManager = {

    unitCollection: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //1
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //2
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //3
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //4
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //5
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //6
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //7 
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //8
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //9
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //10
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //11
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //12
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //13
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 11, 22, 33, 44, 1],  //14
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //15
    ],

    activeBombs: [
        { cordinates: [1, 1], timeLeft: 5}
    ],

    receiveShoot() {
        if(soldiersListPositions.hasOwnProperty(1)) {
            delete soldiersListPositions[1];
            return;
        }

        // delete next one available
        for (const soldierKey in soldiersListPositions) {

            delete soldiersListPositions[soldierKey];
            return;
        }
    },

    moveTo(direction) {
        changeCordinates(direction);
    },

    activateBomb() {
        const cordinatesToDetronate = soldiersListPositions[4].cordinates;
        this.activeBombs.push({ cordinates: cordinatesToDetronate, timeLeft: 5})
    },

    changeSoldierLeader(newLeadId) {
       
        // const oldLeadId = this.getOldLeadID();
        const oldLeadId = getArmySoldiersCollection().shift().id
        const newLeadIndex = soldiersOrderCollection.findIndex(item => item === newLeadId);

        soldiersOrderCollection = swapArrayElements(soldiersOrderCollection, 0, newLeadIndex);
        soldiersListPositions[oldLeadId].order = newLeadIndex + 1;
        soldiersListPositions[newLeadId].order = 1;
        console.log(soldiersListPositions);
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

    updateUnitCollection(newRow, newColl, oldRow, oldColl, symbol) {
        this.unitCollection[oldRow][oldColl] = 0;
        this.unitCollection[newRow][newColl] = symbol;
    },

    getSoldiersListPositions() {
        return soldiersListPositions;
    },

    getBuildingListPositions() {
        return buildingListPositions;
    },

    getLastSoldierOrder() {
        let order = 0;
        for (const soldierKey in soldiersListPositions) {
            if(soldiersListPositions[soldierKey].order > order) {
                order = soldiersListPositions[soldierKey].order
            }
        }
        return order;
    },

    getOldLeadID() {
        for (const soldierKey in soldiersListPositions) {
            if(soldiersListPositions[soldierKey].order === 1) {
                return soldierKey;
            }
        }
    },

    getSoldiersOrderCollection() {
        return soldiersOrderCollection;
    }
}

function getSoldierSymbol(soldierId) {
    return `${soldiersOrderCollection.findIndex(id => id === soldierId) + 1}${soldierId}`;
}

// ------------

function swapArrayElements(arr, x, y) {
    if (arr.length === 1) return arr;
    arr.splice(y, 1, arr.splice(x, 1, arr[y])[0]);
    return arr;
};

export default GameBoardManager;

