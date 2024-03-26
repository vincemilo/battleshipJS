import createGrid from './createGrid';

export default class Gameboard {
    constructor() {
        this.grid = createGrid();
        this.missedAttacks = [];
        this.allSunk = false;
    }

    showGrid() {
        return this.grid;
    }

    placeShips() {
        const ships = {
            carrier: 5,
            battleship: 4,
            destroyer: 3,
            submarine: 3,
            'patrol boat': 2,
        };
    }

    receiveAttack(coords) {}
}
