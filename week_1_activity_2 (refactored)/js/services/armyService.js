import { checkBigBuilding, checkMediumBuilding, checkSmallBuilding } from "../utils/buildings.js";
import DrawService from "../dom/drawPrimary.js";
import { compareArrayValues } from "../utils/utils.js";
import SoldierCommands from "../utils/soldierCommands.js";
import GlobalReference from "../globals.js";


const TANK_ID = 1;

const armySoldiersCollection = [
    { name: 'Tractor hooligan', id: 1, skill: 'passive', color: 'red', currentPosition: [13, 10], prevPosition: [13, 10], domElement: null },
    { name: 'Stone thrower', id: 2, skill: 'passive', color: 'orange', currentPosition: [13, 11], prevPosition: [13, 11], domElement: null },
    { name: 'The drunker', id: 3, skill: 'passive', color: 'yellow', currentPosition: [13, 12], prevPosition: [13, 12], domElement: null },
    { name: 'The fisher', id: 4, skill: 'special', color: 'purple', currentPosition: [13, 13], prevPosition: [13, 13], domElement: null },
]

const activeBombs = [];
// { cordinates: [1, 1], timeLeft: 6}
// victims: [1, 0] [0, 1] [1, 2] [2, 1]


const updateArmySoldiersCollectionPositions = (id, [x, y]) => {

    let currentItem = getSoldierById(+id);
    let currentItemIndex = getSoldierIndex(+id);

    currentItem.prevPosition = currentItem.currentPosition;
    currentItem.currentPosition = [x, y];

    armySoldiersCollection.splice(currentItemIndex, 1, currentItem);
}

const changeCordinates = (direction) => {

    for (let i = 0; i < armySoldiersCollection.length; i++) {

        const isLeader = i === 0;
        let prevPosition;

        if (isLeader) {
            prevPosition = armySoldiersCollection[0].currentPosition;

            const isMoveValid = SoldierCommands.check[direction]();

            if (isMoveValid.error) {
                
                alert(isMoveValid.message)
                return
            }

            SoldierCommands.actions[direction]();

        } else {

            armySoldiersCollection[i].prevPosition = armySoldiersCollection[i].currentPosition;
            armySoldiersCollection[i].currentPosition = armySoldiersCollection[i - 1].prevPosition;
        }
    }
}

const changeLeader = (newLeadId) => {

    const newLeadIndex = getSoldierIndex(newLeadId);
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

const getSoldierById = (id) => {
    return armySoldiersCollection.find(item => item.id === id);
}

const getSoldierIndex = (id) => {
    return armySoldiersCollection.findIndex(item => item.id === id);
}

const deleteSoldierById = (id) => {
    const soldierIndex = getSoldierIndex(id);
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
    activeBombs.push({ cordinates: [armySoldiersCollection[0].currentPosition[0], armySoldiersCollection[0].currentPosition[1]], timeLeft: GlobalReference.BOMB_EXPLOSION_NUMBER });
}

const manageBombs = () => {

    if (activeBombs.length === 0) {
        return
    }
    decreaseBombsTimer();
}

const decreaseBombsTimer = () => {

    activeBombs.map(item => {

        item.timeLeft -= 1;

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

    armySoldiersCollection.map(item => {

        damagedCells.map(damagedCell => {

            const checkIfArraysHasEqualCordinates = compareArrayValues(damagedCell, item.currentPosition);

            if (checkIfArraysHasEqualCordinates) {

                deleteSoldierById(item.id);
                DrawService.resetCell(item.currentPosition[0], item.currentPosition[1]);
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

    console.log('FIRE IN THE HOLE...!!');

    const armyHasTank = getSoldierById(TANK_ID) ? true : false;

    if (armyHasTank) {

        let tankSoldier = getSoldierById(TANK_ID);
        DrawService.resetCell(tankSoldier.currentPosition[0], tankSoldier.currentPosition[1]);
        deleteSoldierById(TANK_ID);
        return;
    }

    let victimSoldier = armySoldiersCollection[0];
    DrawService.resetCell(victimSoldier.currentPosition[0], victimSoldier.currentPosition[1]);
    deleteFirst();
}

export {
    armySoldiersCollection, updateArmySoldiersCollectionPositions,
    getArmySoldiersCollection, changeCordinates,
    changeLeader, activateBomb, decreaseBombsTimer, getActiveBombs, manageBombs,
    fireTowardsArmy, getSoldierById, getSoldierIndex
}