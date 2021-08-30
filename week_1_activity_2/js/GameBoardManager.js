let soldiersOrder = [1, 2, 3, 4]; // [3, 2, 1, 4]

const soldiersListPositions = {

    1: { nickname: 'tank', cordinates: [14, 10], isLeader: true, symbol: getSoldierSymbol(1), order: 1 },
    2: { nickname: 'sniper', cordinates: [14, 11], isLeader: false, symbol: getSoldierSymbol(2), order: 2 },
    3: { nickname: 'drunker', cordinates: [14, 12], isLeader: false, symbol: getSoldierSymbol(3), order: 3 },
    4: { nickname: 'fisher', cordinates: [14, 13], isLeader: false, symbol: getSoldierSymbol(4), order: 4 },
}

// [[startRow, endRow], [startColl, endColl]]
const buildingListPositions = {
    'small': [[2, 3], [2, 3]],
    'medium': [[4, 5], [7, 9]],
    'big': [[9, 11], [1, 3]],
 
}

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

    moveTo(direction) {
        if (direction === 'up') {
            changeCordinates(direction);
        } else if (direction === 'down') {
            changeCordinates(direction)
        } else if (direction === 'left') {
            changeCordinates(direction);
        }
    },


    activateBomb() {

    },

    changeSoldierLeader(oldLead, newLead) {
        const oldLeadIndex = soldiersOrder.findIndex(item => item === oldLead);
        const newLeadIndex = soldiersOrder.findIndex(item => item === newLead);

        soldiersOrder = swapArrayElements(soldiersOrder, oldLeadIndex, newLeadIndex);
        soldiersListPositions[oldLead].order = newLeadIndex + 1;
        soldiersListPositions[newLead].order = oldLeadIndex + 1;
    },

    checkIfValid(row, coll) {

        if((row === 0 || row === 14) || (coll === 0 || coll === 14)) {
            return { error: true, message: "You are not allowed to step there!"}
        }

        if((row === 4 && coll === 8)) {
            return { error: true, message: "You can't go throgh this buidling!" }
        }
        return { error: false }


        // for (const buildingKey in buildingListPositions) {
        //     let startRow = buildingListPositions[buildingKey][0][0];
        //     let endRow = buildingListPositions[buildingKey][0][1];
        //     let startColl = buildingListPositions[buildingKey][1][0];
        //     let endColl = buildingListPositions[buildingKey][1][1]
        //     // 2 4
        //     // if ((row >= startRow && row <= endRow) && (coll >= startColl && coll <= endColl)) {
        //     //     return { error: true, message: 'Invalid direction' }
        //     // }
        // }
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
    }
}

function changeCordinates(direction) {

    let nextSoldierCordinates;
    let currentCordinates;

    for (const soldierKey in soldiersListPositions) {

        if (soldiersListPositions[soldierKey].isLeader) {

            nextSoldierCordinates = [soldiersListPositions[soldierKey].cordinates[0], soldiersListPositions[soldierKey].cordinates[1]]

            if (direction === 'left') {

                const isMoveValid = GameBoardManager.checkIfValid(soldiersListPositions[soldierKey].cordinates[1] - 1);
                if (isMoveValid.error) {
                    throw new Error(isMoveValid.message)
                }
                soldiersListPositions[soldierKey].cordinates[1]--;
            } else if (direction === 'down') {

                const isMoveValid = GameBoardManager.checkIfValid(soldiersListPositions[soldierKey].cordinates[1] + 1);
                if (isMoveValid.error) {
                    throw new Error(isMoveValid.message)
                }
                soldiersListPositions[soldierKey].cordinates[0]++;
            } else if (direction === 'up') {

                const isMoveValid = GameBoardManager.checkIfValid(soldiersListPositions[soldierKey].cordinates[0] - 1);
                if (isMoveValid.error) {
                    throw new Error(isMoveValid.message)
                }
                soldiersListPositions[soldierKey].cordinates[0]--;
            }

        } else {

            currentCordinates = soldiersListPositions[soldierKey].cordinates;
            soldiersListPositions[soldierKey].cordinates = nextSoldierCordinates;
            nextSoldierCordinates = currentCordinates;
        }

        // GameBoardManager.updateUnitCollection(soldiersListPositions[soldierKey].cordinates[0],
        //                                     soldiersListPositions[soldierKey].cordinates[1],
        //                                     nextSoldierCordinates[0],
        //                                     nextSoldierCordinates[1],
        //                                     soldiersListPositions.symbol
        //                                     )
    }
}

function getSoldierSymbol(soldierId) {
    return `${soldiersOrder.findIndex(id => id === soldierId) + 1}${soldierId}`;
}


// ------------

function swapArrayElements(arr, x, y) {
    if (arr.length === 1) return arr;
    arr.splice(y, 1, arr.splice(x, 1, arr[y])[0]);
    return arr;
};

//   swapArrayElements([1, 2, 3, 4, 5], 1, 3); //=> [ 1, 4, 3, 2, 5 ]

export default GameBoardManager;

