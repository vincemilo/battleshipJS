import shipRandomizer from './shipRandomizer';
import Gameboard from './gameBoard';

const gameBoard = new Gameboard();

test('returns random ship coords based on length', () => {
    expect(Object.keys(shipRandomizer(2, gameBoard)).length).toEqual(2);
});
