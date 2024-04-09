import Computer from './computer';
import Gameboard from './gameBoard';

export default class Player {
    constructor(comp = false, gameBoard = new Gameboard()) {
        this.gameBoard = gameBoard;
        if (comp) this.comp = new Computer(gameBoard);
    }

    attack(cell) {
        if (cell.occupied === false) {
            this.gameBoard.missedAttacks[cell.name] = null;
            // 3 different returns, miss, hit, or already attacked
            return 0;
        }
        if (cell.name in this.gameBoard.hitAttacks) {
            return 1;
        }
        this.gameBoard.hitAttacks[cell.name] = null;
        return 2;
    }
}
