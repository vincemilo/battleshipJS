import Gameboard from './gameBoard';
import Ship from './ship';

const board = new Gameboard();
board.ships.push(new Ship('patrol boat', 2, { '0,0': null, '0,1': null }));

test('checks receive attack function', () => {
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);

    expect(board.shipsSunk).toBe(1);
});

test('checks occupy function', () => {
    board.occupy([0, 0]);
    expect(board.grid[0][0].occupied).toBe(true);
    expect(board.grid[0][9].occupied).toBe(false);
});

test('checks allSunk function', () => {
    const occupiedCoords = [];
    const ships = [
        {
            name: 'cruiser',
            length: 5,
            coords: {
                '6,2': null,
                '6,3': null,
                '6,4': null,
                '6,5': null,
                '6:6': null,
            },
        },
        {
            name: 'battleship',
            length: 4,
            coords: { '7,2': null, '7,3': null, '7,4': null, '7,5': null },
        },
        {
            name: 'submarine',
            length: 3,
            coords: { '2,2': null, '3,2': null, '4,2': null },
        },
        {
            name: 'destroyer',
            length: 3,
            coords: { '5,2': null, '5,3': null, '5,4': null },
        },
    ];

    ships.forEach((e) => {
        board.ships.push(new Ship(e.name, e.length, e.coords));
        occupiedCoords.push(...Object.keys(e.coords));
    });
    occupiedCoords.forEach((e) => board.receiveAttack(e));
    expect(board.allSunk).toBe(true);
});
