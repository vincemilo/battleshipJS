import Player from './player';

const compPlayer = new Player(true);
const humanPlayer = new Player();

test('check attack function', () => {
    const compCell = {
        name: 'a1',
        coords: [0, 0],
        occupied: true,
    };
    const compCell2 = {
        name: 'j10',
        coords: [9, 9],
        occupied: false,
    };
    humanPlayer.attack(compCell);
    humanPlayer.attack(compCell2);
    expect(humanPlayer.gameBoard.hitAttacks).toEqual({ '0,0': null });
    expect(humanPlayer.gameBoard.missedAttacks).toEqual({ '9,9': null });
});
