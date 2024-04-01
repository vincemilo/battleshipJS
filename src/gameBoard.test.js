import Gameboard from './gameBoard';

const board = new Gameboard();
board.placeShips();
board.receiveAttack('e1');
board.receiveAttack('e2');
board.receiveAttack('e3');

test('checks receive attack function', () => {
    expect(board.hitAttacks).toEqual({ e1: null, e2: null });
});

test('checks receive attack function', () => {
    expect(board.shipsSunk).toBe(1);
});

test('checks receive attack function', () => {
    expect(board.missedAttacks).toEqual({ e3: null });
});

board.occupy('a1');
test('checks occupy function', () => {
    expect(board.grid[0][0].occupied).toBe(true);
});
