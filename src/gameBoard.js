import createGrid from './createGrid';
import Ship from './ship';

export default class Gameboard {
    constructor() {
        this.grid = createGrid();
        this.missedAttacks = [];
        this.allSunk = false;
        this.player1ships = [];
        this.player2ships = [];
    }

    showGrid() {
        return this.grid;
    }

    showP1ships() {
        return this.player1ships;
    }

    placeShips() {
        const ships = [
            {
                name: 'carrier',
                length: 5,
                coords: ['a1', 'a2', 'a3', 'a4', 'a5'],
            },
            {
                name: 'battleship',
                length: 4,
                coords: ['b1', 'b2', 'b3', 'b4'],
            },
            {
                name: 'destroyer',
                length: 3,
                coords: ['c1', 'c2', 'c3'],
            },
            {
                name: 'submarine',
                length: 3,
                coords: ['d1', 'd2', 'd3'],
            },
            {
                name: 'patrol boat',
                length: 2,
                coords: ['e1', 'e2'],
            },
        ];

        ships.forEach((element) => {
            const ship = new Ship(element.name, element.length, element.coords);
            this.player1ships.push(ship);
        });
    }

    receiveAttack(attackCoords) {
        this.player1ships.forEach((e) => {
            if (e.coords.includes(attackCoords)) {
                return true;
            }
        });
    }
}
