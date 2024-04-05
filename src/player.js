import Computer from './computer';
import Gameboard from './gameBoard';

export default class Player {
    constructor(comp = false, gameBoard = new Gameboard()) {
        this.gameBoard = gameBoard;
        if (comp) this.comp = new Computer(gameBoard);
    }

    attack(coords) {
        return coords;
    }
}
