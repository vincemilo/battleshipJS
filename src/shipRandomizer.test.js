import shipRandomizer from './shipRandomizer';

test('returns random ship coords based on length', () => {
    expect(Object.keys(shipRandomizer(2)).length).toEqual(2);
});
