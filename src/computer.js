import translateCoords from './translateCoords';

export default class Computer {
    constructor(gameboard) {
        this.coords = {};
        this.grid = gameboard.showGrid();
        this.prevAttacks = {};
        this.successAttacks = {};
    }

    createCoords() {
        const letter = 'abcdefghij';
        for (let i = 0; i < letter.length; i += 1) {
            for (let j = 1; j < letter.length + 1; j += 1) {
                this.coords[letter[i] + j] = null;
            }
        }
    }

    returnCoords() {
        return this.coords;
    }

    removeCoords(usedCoords, success = false) {
        if (success) this.successAttacks[usedCoords] = null;
        this.prevAttacks[usedCoords] = null;
        delete this.coords[usedCoords];
        return this.prevAttacks;
    }

    checkAdjacent() {
        const translated = translateCoords(coords);
        this.grid[translated[0]][translated[1]].occupied = true;
    }

    compAttack() {
        if (this.successAttacks) checkAdjacent();
        const keys = Object.keys(this.coords);
        return keys[Math.floor(Math.random() * keys.length)];
    }
}
