import Gameboard from './gameBoard';

const board = new Gameboard();
board.placeShips();

test('checks receive attack function', () => {
    board.receiveAttack('e1');
    board.receiveAttack('e2');
    board.receiveAttack('e3');

    expect(board.hitAttacks).toEqual({ e1: null, e2: null });
    expect(board.shipsSunk).toBe(1);
    expect(board.missedAttacks).toEqual({ e3: null });
});

test('checks occupy function', () => {
    board.occupy('a1');
    expect(board.grid[0][0].occupied).toBe(true);
    expect(board.grid[0][9].occupied).toBe(false);
});

test('checks allSunk function', () => {
    const occupiedCoords = [];
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
    ];

    ships.forEach((e) => occupiedCoords.push(...Object.keys(e.coords)));
    occupiedCoords.forEach((e) => board.receiveAttack(e));
    expect(board.allSunk).toBe(true);
});
