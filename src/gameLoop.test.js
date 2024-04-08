import gameLoop from './gameLoop';
import Player from './player';

const player1 = new Player();
const player2 = new Player(true);
const newGameLoop = gameLoop(player1, player2);

test('check basic functionality', () => {
    expect(newGameLoop).toEqual('');
});
