import Gameboard from './gameBoard';

const board = new Gameboard();
board.placeShips([5]);

// test('shows created ship objects', () => {
//     expect(board.showP1ships()).toBe([]);
// });

test('checks receive attack', () => {
    expect(board.receiveAttack('a1')).toBe(true);
});
