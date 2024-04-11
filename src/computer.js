import generateOptions from './generateOptions';
import translateCoords from './translateCoords';

export default class Computer {
    constructor(gameboard) {
        this.coords = {};
        this.gameboard = gameboard;
    }

    createCoords() {
        for (let i = 0; i < 10; i += 1) {
            for (let j = 0; j < 10; j += 1) {
                this.coords[[i, j]] = null;
            }
        }
    }

    returnCoords() {
        return this.coords;
    }

    // check if options have already been used
    validateAttack(options, missCoords) {
        for (let i = 0; i < options.length; i += 1) {
            if (!(options[i] in missCoords)) return options[i];
        }
        return false;
    }

    checkAdjacent(hitCoords, missCoords) {
        let adjSquare = '';
        hitCoords.forEach((e) => {
            const translated = translateCoords(e);
            const options = generateOptions(translated);
            adjSquare = this.validateAttack(options, missCoords);
        });
        console.log(adjSquare);
        return adjSquare;
    }

    compAttack(player1, player2) {
        let attackCoords = [];
        const hitCoords = Object.keys(player2.gameBoard.hitAttacks);
        const missCoords = Object.keys(player2.gameBoard.missedAttacks);
        if (hitCoords.length) {
            attackCoords = this.checkAdjacent(hitCoords, missCoords);
        } else {
            const keys = Object.keys(this.coords);
            const randomCoords = keys[Math.floor(Math.random() * keys.length)];
            attackCoords = [randomCoords[0], randomCoords[1]];
        }
        const enemyCell =
            player1.gameBoard.grid[attackCoords[0]][attackCoords[1]];
        delete this.coords[attackCoords];
        return player2.attack(enemyCell);
    }
}
