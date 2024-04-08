import createGrid from './createGrid';
import Ship from './ship';
import translateCoords from './translateCoords';

export default class Gameboard {
    constructor() {
        this.grid = createGrid();
        this.missedAttacks = {};
        this.hitAttacks = {};
        this.shipsSunk = '';
        this.allSunk = false;
        this.ships = [];
    }

    resetShipsSunk() {
        this.shipsSunk = '';
    }

    showGrid() {
        return this.grid;
    }

    placeShips() {
        const ships = [
            {
                name: 'carrier',
                length: 5,
                coords: { a1: null, a2: null, a3: null, a4: null, a5: null },
            },
            {
                name: 'battleship',
                length: 4,
                coords: { b1: null, b2: null, b3: null, b4: null },
            },
            {
                name: 'destroyer',
                length: 3,
                coords: { c1: null, c2: null, c3: null },
            },
            {
                name: 'submarine',
                length: 3,
                coords: { d1: null, d2: null, d3: null },
            },
            {
                name: 'patrol boat',
                length: 2,
                coords: { e1: null, e2: null },
            },
        ];

        ships.forEach((element) => {
            const ship = new Ship(element.name, element.length, element.coords);
            this.ships.push(ship);
            // takes ship coords and applies them to board
            Object.keys(ship.coords).forEach((e) => this.occupy(e));
        });
    }

    occupy(coords) {
        const translated = translateCoords(coords);
        this.grid[translated[0]][translated[1]].occupied = true;
    }

    receiveAttack(attackCoords) {
        for (let i = 0; i < this.ships.length; i += 1) {
            const ship = this.ships[i];
            if (attackCoords in ship.coords) {
                ship.hit();
                if (ship.sunk) {
                    this.shipsSunk = ship.name;
                    if (this.shipsSunk.length === 5) this.allSunk = true;
                }
            }
        }
    }
}
