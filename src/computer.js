import checkAdjacent from './checkAdjacent';
import attack from './attack';
import randomAttack from './randomAttack';

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
        const missCoords = player2.gameBoard.missedAttacks;
        if (hitCoords.length) {
            const adjacent = checkAdjacent(hitCoords, missCoords);
            if (adjacent) {
                attackCoords = adjacent;
            } else {
                attackCoords = randomAttack(this.coords);
            }
        } else {
            attackCoords = randomAttack(this.coords);
        }
        const enemyCell =
            player1.gameBoard.grid[attackCoords[0]][attackCoords[1]];
        delete this.coords[attackCoords];
        attack(player2, player1, enemyCell);
    }
}
