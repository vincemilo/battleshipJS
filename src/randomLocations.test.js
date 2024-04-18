import randomLocations from './randomLocations';

test('returns horiz/vertical ship coords based on length', () => {
    expect(randomLocations([1, 1], {}, 2)).toEqual({
        horizOptions: [
            [1, 2],
            [1, 0],
        ],
        vertOptions: [
            [2, 1],
            [0, 1],
        ],
    });

    expect(randomLocations([1, 1], { '2,1': null }, 2)).toEqual({
        horizOptions: [
            [1, 2],
            [1, 0],
        ],
        vertOptions: [[0, 1]],
    });

    expect(randomLocations([0, 0], {}, 5)).toEqual({
        horizOptions: [
            [0, 1],
            [0, 2],
            [0, 3],
            [0, 4],
        ],
        vertOptions: [
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
        ],
    });
});
