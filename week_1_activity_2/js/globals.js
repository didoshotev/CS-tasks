const GlobalReference = {}

GlobalReference.buildings = {
    'small': { cordinates: [[2, 3], [2, 3]], symbol: '@', isAlive: true },

    'medium': {
        cordinates: [[4, 5], [7, 9]], lockedCordinates: [[5, 4], [5, 5]], isAlive: true, validExplosions: { a: [[4, 7], [5, 9]], b: [[5, 7], [4, 9]] },
    },

    'big': { cordinates: [[9, 11], [1, 3]], symbol: '&', isAlive: true,
    validExplosions: { a: [[9, 1], [9, 3], [10, 2], [11, 1], [11, 3]] } }
}

export default GlobalReference;