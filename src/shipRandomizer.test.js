import shipRandomizer from './shipRandomizer';

test.skip('returns random ship coords based on length', () => {
    expect(shipRandomizer(2)).toEqual('randomcoords');
});
