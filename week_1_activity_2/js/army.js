const armySoldiersCollection = [
    { name: 'Tractor hooligan', nickname: 'tank', id: 1, skill: 'passive', color: 'red', currentPosition: [13, 10], prevPosition: [13, 10], domElement: null},
    { name: 'Stone thrower', nickname: 'sniper', id: 2, skill: 'passive', color: 'orange',  currentPosition: [13, 11], prevPosition: [13, 11], domElement: null},
    { name: 'The drunker', nickname: 'spy', id: 3, skill: 'passive', color: 'yellow', currentPosition: [13, 12], prevPosition: [13, 12], domElement: null},
    { name: 'The fisher', nickname: 'saboteur', id: 4, skill: 'special', color: 'purple', currentPosition: [13, 13], prevPosition: [13, 13], domElement: null},
]

const Soldiers = { 
    1: { name: 'Tractor hooligan', nickname: 'tank', id: 1, skill: 'passive', color: 'red'},
    2: { name: 'Stone thrower', nickname: 'sniper', id: 2, skill: 'passive', color: 'orange'},
    3: { name: 'The drunker', nickname: 'spy', id: 3, skill: 'passive', color: 'yellow'},
    4: { name: 'The fisher', nickname: 'saboteur', id: 4, skill: 'special', color: 'purple'},
}

const updateArmySoldiersCollectionPositions = (id, [x, y]) => {
    
    let currentItem = armySoldiersCollection.find(item => item.id === +id);
    let currentItemIndex = armySoldiersCollection.findIndex(item => item.id === +id);

    currentItem.prevPosition = currentItem.currentPosition;
    currentItem.currentPosition = [x, y];
   
    armySoldiersCollection.splice(currentItemIndex, 1, currentItem);
}

const getArmySoldiersCollection = () => {
    return armySoldiersCollection;
}

export { armySoldiersCollection, Soldiers, updateArmySoldiersCollectionPositions, getArmySoldiersCollection }