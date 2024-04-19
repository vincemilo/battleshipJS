import createGrid from './createGrid';
import Ship from './ship';
import shipRandomizer from './shipRandomizer';

export default class Gameboard {
    constructor() {
        this.grid = createGrid();
        this.missedAttacks = {};
        this.hitAttacks = {};
        this.shipsSunk = 0;
        this.latestSunk = '';
        this.allSunk = false;
        this.ships = [];
        this.shipLocations = {};
        // this.placeShips();
    }

    resetShipsSunk() {
        this.latestSunk = '';
    }

    showGrid() {
        return this.grid;
    }

    placeShips() {
        const ships = [
            {
                name: 'carrier',
                length: 5,
                coords: shipRandomizer(5, this),
            },
            {
                name: 'battleship',
                length: 4,
                coords: shipRandomizer(4, this),
            },
            // {
            //     name: 'destroyer',
            //     length: 3,
            //     coords: shipRandomizer(3),
            // },
            // {
            //     name: 'submarine',
            //     length: 3,
            //     coords: shipRandomizer(3),
            // },
            // {
            //     name: 'patrol boat',
            //     length: 2,
            //     coords: shipRandomizer(2),
            // },
        ];

        ships.forEach((element) => {
            const ship = new Ship(element.name, element.length, element.coords);
            this.ships.push(ship);
            // console.log(ship.coords);
            // takes ship coords and applies them to board
            // Object.keys(ship.coords).forEach((e) => this.occupy(e));
        });
    }

    occupy(coords) {
        this.shipLocations[coords] = null;
        this.grid[coords[0]][coords[1]].occupied = true;
    }

    receiveAttack(attackCoords) {
        for (let i = 0; i < this.ships.length; i += 1) {
            const ship = this.ships[i];
            if (attackCoords in ship.coords) {
                ship.hit();
                if (ship.sunk) {
                    this.latestSunk = ship.name;
                    this.shipsSunk += 1;
                    if (this.shipsSunk === 5) this.allSunk = true;
                }
            }
        }
    }
}
