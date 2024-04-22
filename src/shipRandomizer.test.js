import shipRandomizer from './shipRandomizer';
import Gameboard from './gameBoard';

const gameBoard = new Gameboard();
const patrolBoat = shipRandomizer(2, gameBoard);

test('returns random ship coords based on length', () => {
    expect(Object.keys(patrolBoat).length).toEqual(2);
});
