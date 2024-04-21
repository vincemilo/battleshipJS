import randomLocations from './randomLocations';

test('returns horiz/vertical ship coords based on length', () => {
    expect(randomLocations([1, 1], { '1,2': null }, 2)).toEqual([
        [1, 1],
        [2, 1],
    ]);

    expect(randomLocations([1, 1], { '2,1': null }, 2)).toEqual([
        [1, 1],
        [1, 2],
    ]);

    // expect(randomLocations([0, 0], {}, 5)).toEqual({});
});
