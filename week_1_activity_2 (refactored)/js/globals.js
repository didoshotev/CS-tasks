const GlobalReference = {}

GlobalReference.buildings = {
    'small': { cordinates: [[2, 3], [2, 3]], symbol: '@', isAlive: true },

    'medium': {
        cordinates: [[4, 5], [7, 9]], lockedCordinates: [[5, 4], [5, 5]], isAlive: true, validExplosions: { a: [[4, 7], [5, 9]], b: [[5, 7], [4, 9]] },
    },

    'big': {
        cordinates: [[9, 11], [1, 3]], symbol: '&', isAlive: true,
        validExplosions: { a: [[9, 1], [9, 3], [10, 2], [11, 1], [11, 3]] }
    }
}

GlobalReference.BOMB_EXPLOSION_NUMBER = 6;
GlobalReference.CORNERS_NUMBER = 4;
GlobalReference.POSSIBLE_DIRECTIONS_NUMBER = 4;

GlobalReference.MIN_ROW_COLL_NUM = 0;
GlobalReference.MAX_ROW_COLL_NUM = 14;

GlobalReference.SUM_SYMBOL = '+';
GlobalReference.SUBSTRACT_SYMBOL = '-';

GlobalReference.buildingNames = { }

GlobalReference.buildingNames.SMALL = 'sm'
GlobalReference.buildingNames.MEDIUM = 'md'
GlobalReference.buildingNames.MEDIUM_WALL = 'mda'
GlobalReference.buildingNames.BIG = 'bg'


export default GlobalReference;