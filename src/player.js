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
            return false;
        }
        this.gameBoard.hitAttacks[cell.name] = null;
        return true;
    }
}
