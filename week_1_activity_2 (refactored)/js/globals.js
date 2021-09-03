const GlobalReference = {}

GlobalReference.buildings = {
    'small': { symbol: '@', isAlive: true },

    'medium': {
        lockedCordinates: [[5, 4], [5, 5]], isAlive: true, validExplosions: { a: [[4, 9], [5, 11]], b: [[5, 9], [4, 11]] },
    },

    'big': {
        symbol: '&', isAlive: true,
        validExplosions: { a: [[11, 1], [11, 3], [12, 2], [13, 1], [13, 3]] }
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