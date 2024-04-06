import Player from './player';

const compPlayer = new Player(true);

test('check computer player creation', () => {
    expect(compPlayer.comp.successAttacks).toEqual({});
});
