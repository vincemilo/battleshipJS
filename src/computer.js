import checkAdjacent from './checkAdjacent';

export default class Computer {
    constructor(gameboard) {
        this.coords = {};
        this.gameboard = gameboard;
        this.createCoords();
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

    compAttack(player1, player2) {
        let attackCoords = [];
        const hitCoords = Object.keys(player2.gameBoard.hitAttacks);
        const missCoords = Object.keys(player2.gameBoard.missedAttacks);
        if (hitCoords.length) {
            attackCoords = checkAdjacent(hitCoords, missCoords);
        } else {
            const keys = Object.keys(this.coords);
            const randomCoords = keys[Math.floor(Math.random() * keys.length)];
            attackCoords = [randomCoords[0], randomCoords[2]];
        }
        const enemyCell =
            player1.gameBoard.grid[attackCoords[0]][attackCoords[1]];
        delete this.coords[attackCoords];
        return player2.attack(enemyCell);
    }
}
