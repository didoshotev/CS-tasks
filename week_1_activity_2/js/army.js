import { checkBigBuilding, checkMediumBuilding, checkSmallBuilding } from "./buildings.js";
import DrawService from "./dom/DrawService.js";
import GameBoardManager from "./GameBoardManager.js";

const BOMB_EXPLOSION_NUMBER = 6;
const TANK_ID = 1;

const armySoldiersCollection = [
    { name: 'Tractor hooligan', nickname: 'tank', id: 1, skill: 'passive', color: 'red', currentPosition: [13, 10], prevPosition: [13, 10], domElement: null },
    { name: 'Stone thrower', nickname: 'sniper', id: 2, skill: 'passive', color: 'orange', currentPosition: [13, 11], prevPosition: [13, 11], domElement: null },
    { name: 'The drunker', nickname: 'spy', id: 3, skill: 'passive', color: 'yellow', currentPosition: [13, 12], prevPosition: [13, 12], domElement: null },
    { name: 'The fisher', nickname: 'saboteur', id: 4, skill: 'special', color: 'purple', currentPosition: [13, 13], prevPosition: [13, 13], domElement: null },
]

const activeBombs = [
    // { cordinates: [1, 1], timeLeft: 6}
    // victims: [1, 0] [0, 1] [1, 2] [2, 1]
];

const updateArmySoldiersCollectionPositions = (id, [x, y]) => {

    let currentItem = armySoldiersCollection.find(item => item.id === +id);
    let currentItemIndex = armySoldiersCollection.findIndex(item => item.id === +id);

    currentItem.prevPosition = currentItem.currentPosition;
    currentItem.currentPosition = [x, y];

    armySoldiersCollection.splice(currentItemIndex, 1, currentItem);
}

function changeCordinates(direction) {
    let isMoveValid;

    for (let i = 0; i < armySoldiersCollection.length; i++) {

        let currentSoldier = armySoldiersCollection[i];
        const isLeader = i === 0;
        let prevPosition;

        if (isLeader) {
            prevPosition = armySoldiersCollection[i].currentPosition

            // nextSoldierCordinates = [soldiersListPositions[soldierKey].cordinates[0], soldiersListPositions[soldierKey].cordinates[1]]

            if (direction === 'left') {

                isMoveValid = GameBoardManager.checkIfValid(armySoldiersCollection[i].currentPosition[1] - 1);
                armySoldiersCollection[i].prevPosition = [armySoldiersCollection[i].currentPosition[0], armySoldiersCollection[i].currentPosition[1]];
                armySoldiersCollection[i].currentPosition[1] -= 1

            } else if (direction === 'down') {

                isMoveValid = GameBoardManager.checkIfValid(armySoldiersCollection[i].currentPosition[0] + 1);
                armySoldiersCollection[i].prevPosition = [armySoldiersCollection[i].currentPosition[0], armySoldiersCollection[i].currentPosition[1]];
                armySoldiersCollection[i].currentPosition[0] += 1;

            } else if (direction === 'up') {

                isMoveValid = GameBoardManager.checkIfValid(armySoldiersCollection[i].currentPosition[0] - 1);
                armySoldiersCollection[i].prevPosition = [armySoldiersCollection[i].currentPosition[0], armySoldiersCollection[i].currentPosition[1]];
                armySoldiersCollection[i].currentPosition[0] -= 1

            } else if (direction === 'right') {

                isMoveValid = GameBoardManager.checkIfValid(armySoldiersCollection[i].currentPosition[1] + 1);
                armySoldiersCollection[i].prevPosition = [armySoldiersCollection[i].currentPosition[0], armySoldiersCollection[i].currentPosition[1]];
                armySoldiersCollection[i].currentPosition[1] += 1;
            }

            if (isMoveValid.error) {
                alert(isMoveValid.message);
                throw new Error(isMoveValid.message);
            }

        } else {

            armySoldiersCollection[i].prevPosition = armySoldiersCollection[i].currentPosition;
            armySoldiersCollection[i].currentPosition = armySoldiersCollection[i - 1].prevPosition;
        }

        //updateArmySoldiersCollectionPositions(soldierKey ,soldiersListPositions[soldierKey].cordinates);
    }
}

const changeLeader = (newLeadId) => {

    const newLeadIndex = armySoldiersCollection.findIndex(item => item.id === newLeadId);
    const newLeadItem = armySoldiersCollection[newLeadIndex]
    const oldLeadItem = armySoldiersCollection.shift();

    const oldLeadItemCordinates = { newPosition: [oldLeadItem.currentPosition[0], oldLeadItem.currentPosition[1]], oldPosition: [oldLeadItem.prevPosition[0], oldLeadItem.prevPosition[1]] };
    const newLeadItemCordinates = { newPosition: [newLeadItem.currentPosition[0], newLeadItem.currentPosition[1]], oldPosition: [newLeadItem.prevPosition[0], newLeadItem.prevPosition[1]] };

    newLeadItem.currentPosition = oldLeadItemCordinates.newPosition;
    newLeadItem.prevPosition = oldLeadItemCordinates.oldPosition;

    oldLeadItem.currentPosition = newLeadItemCordinates.newPosition;
    oldLeadItem.prevPosition = newLeadItemCordinates.oldPosition;

    armySoldiersCollection.unshift(newLeadItem);
    armySoldiersCollection.splice(newLeadIndex, 1, oldLeadItem);

}

const getArmySoldiersCollection = () => {
    return armySoldiersCollection;
}

const deleteSoldier = (soldier) => {

    const soldierIndex = armySoldiersCollection.findIndex(item => item.id === soldier.id);
    armySoldiersCollection.splice(soldierIndex, 1);
}

const deleteSoldierById = (id) => {
    const soldierIndex = armySoldiersCollection.findIndex(item => item.id === id);
    armySoldiersCollection.splice(soldierIndex, 1);
}

const deleteFirst = () => {
    armySoldiersCollection.splice(0, 1);
}

const activateBomb = () => {

    const IsLeaderTheSaboteur = armySoldiersCollection[0].id === 4;
    if (!IsLeaderTheSaboteur) {
        alert('The leader of the group must be The Fisher(The Saboteur)');
        return;
    }
    activeBombs.push({ cordinates: [armySoldiersCollection[0].currentPosition[0], armySoldiersCollection[0].currentPosition[1]], timeLeft: BOMB_EXPLOSION_NUMBER });
}

const manageBombs = () => {

    if (activeBombs.length === 0) {
        return
    }
    decreaseBombsTimer();
}

const decreaseBombsTimer = () => {
    activeBombs.map(item => {
        item.timeLeft -= 1

        if (item.timeLeft === 0) {

            let bomb = activeBombs.shift();

            checkForVictims(bomb.cordinates[0], bomb.cordinates[1]);
            DrawService.explodeCell(bomb.cordinates[0], bomb.cordinates[1]);
            checkForDestroyedBuildings(bomb.cordinates[0], bomb.cordinates[1]);
        }
    });
}

const checkForVictims = (bombRoll, bombColl) => {
    const damagedCells = [[bombRoll, bombColl - 1], [bombRoll - 1, bombColl], [bombRoll, bombColl + 1], [bombRoll + 1, bombColl]];
    const damagedSoldiers = [];

    armySoldiersCollection.map(item => {

        damagedCells.map(damagedCell => {

            const checkIfArraysHasEqualCordinates = JSON.stringify(damagedCell) == JSON.stringify(item.currentPosition);

            if (checkIfArraysHasEqualCordinates) {
                deleteSoldier(item);
                DrawService.resetCell(item.currentPosition[0], item.currentPosition[1]);
                // damagedSoldiers.push(item) 
            }
        })
    })
}

const checkForDestroyedBuildings = (row, coll) => {

    checkSmallBuilding(row, coll);
    checkMediumBuilding(row, coll);
    checkBigBuilding(row, coll);
}

const getActiveBombs = () => {
    return activeBombs;
}

const fireTowardsArmy = () => {
    console.log('FIRIIING...!!!');

    if (armyHasTank()) {
        let tanker = armySoldiersCollection.find(item => item.id === TANK_ID);
        DrawService.resetCell(tanker.currentPosition[0], tanker.currentPosition[1]);
        deleteSoldierById(TANK_ID);
        return;
    }

    let victimSoldier = armySoldiersCollection[0];
    DrawService.resetCell(victimSoldier.currentPosition[0], victimSoldier.currentPosition[1]);
    deleteFirst();
}

const armyHasTank = () => {
    return armySoldiersCollection.find(item => item.id === TANK_ID) ? true : false;
}

export {
    armySoldiersCollection, updateArmySoldiersCollectionPositions,
    getArmySoldiersCollection, changeCordinates,
    changeLeader, activateBomb, decreaseBombsTimer, getActiveBombs, manageBombs,
    fireTowardsArmy
}