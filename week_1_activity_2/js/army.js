import GameBoardManager from "./GameBoardManager.js";
import { swapArrayElements } from './utils.js';

const armySoldiersCollection = [
    { name: 'Tractor hooligan', nickname: 'tank', id: 1, skill: 'passive', color: 'red', currentPosition: [13, 10], prevPosition: [13, 10], domElement: null},
    { name: 'Stone thrower', nickname: 'sniper', id: 2, skill: 'passive', color: 'orange',  currentPosition: [13, 11], prevPosition: [13, 11], domElement: null},
    { name: 'The drunker', nickname: 'spy', id: 3, skill: 'passive', color: 'yellow', currentPosition: [13, 12], prevPosition: [13, 12], domElement: null},
    { name: 'The fisher', nickname: 'saboteur', id: 4, skill: 'special', color: 'purple', currentPosition: [13, 13], prevPosition: [13, 13], domElement: null},
]

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

        if(isLeader) {
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

    const oldLeadItemCordinates = { newPosition: [oldLeadItem.currentPosition[0], oldLeadItem.currentPosition[1]], oldPosition: [oldLeadItem.prevPosition[0], oldLeadItem.prevPosition[1]]};
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

export { armySoldiersCollection, updateArmySoldiersCollectionPositions, getArmySoldiersCollection, changeCordinates, changeLeader }