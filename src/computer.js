import translateCoords from './translateCoords';
import generateOptions from './generateOptions';
import reverseTranslate from './reverseTranslate';

export default class Computer {
    constructor(gameboard) {
        this.coords = {};
        this.gameboard = gameboard;
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

    // remove used coords from options
    removeCoords(usedCoords, success = false) {
        if (success) this.successAttacks[usedCoords] = null;
        this.prevAttacks[usedCoords] = null;
        delete this.coords[usedCoords];
        return this.prevAttacks;
    }

    // check if options have already been used
    validateAttack(options) {
        for (let i = 0; i < options.length; i += 1) {
            if (!(options[i] in this.prevAttacks)) return options[i];
        }
        return false;
    }

    checkAdjacent(hitCoords) {
        let adjSquare = '';
        hitCoords.forEach((e) => {
            const translatedCoords = translateCoords(e);
            const options = generateOptions(translatedCoords);
            adjSquare = this.validateAttack(options);
        });
        return reverseTranslate(adjSquare);
    }

    compAttack() {
        const hitCoords = Object.keys(this.successAttacks);
        if (hitCoords.length) return this.checkAdjacent(hitCoords);
        const keys = Object.keys(this.coords);
        return keys[Math.floor(Math.random() * keys.length)];
    }
}
