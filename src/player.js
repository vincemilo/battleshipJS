import Computer from './computer';
import Gameboard from './gameBoard';

export default class Player {
    constructor(comp = false, gameBoard = new Gameboard()) {
        this.gameBoard = gameBoard;
        if (comp) this.comp = new Computer(gameBoard);
    }

    // 3 different returns, miss, hit, or already attacked
    attack(cell) {
        if (cell.occupied === false) {
            this.gameBoard.missedAttacks[cell.coords] = null;
            // ensures comp doesn't attack same square twice
            // if (this.comp) this.gameBoard.missedAttacks[cell.coords] = null;
            return 0;
        }
        if (cell.coords in this.gameBoard.hitAttacks) {
            // if (this.comp) this.gameBoard.missedAttacks[cell.coords] = null;
            return 1;
        }
        this.gameBoard.hitAttacks[cell.coords] = null;
        // if (this.comp) this.gameBoard.missedAttacks[cell.coords] = null;
        return 2;
    }
}
