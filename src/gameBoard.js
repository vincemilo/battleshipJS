import createGrid from './createGrid';
import Ship from './ship';
import translateCoords from './translateCoords';

export default class Gameboard {
    constructor() {
        this.grid = createGrid();
        this.missedAttacks = {};
        this.hitAttacks = {};
        this.shipsSunk = 0;
        this.allSunk = false;
        this.ships = [];
    }

    showGrid() {
        return this.grid;
    }

    checkAllSunk() {
        if (this.shipsSunk === 5) this.allSunk = true;
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
        const translated = translateCoords(attackCoords);
        if (this.grid[translated[0]][translated[1]].occupied === false) {
            this.missedAttacks[attackCoords] = null;
        } else {
            for (let i = 0; i < this.ships.length; i += 1) {
                const ship = this.ships[i];
                if (attackCoords in ship.coords) {
                    ship.hit();
                    if (ship.sunk) {
                        this.shipsSunk += 1;
                        this.checkAllSunk();
                    }
                    this.hitAttacks[attackCoords] = null;
                }
            }
        }
    }
}
