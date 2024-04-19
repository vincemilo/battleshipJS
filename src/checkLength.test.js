import checkLength from './checkLength';
import randomLocations from './randomLocations';

const coords = randomLocations([0, 0], { '0,1': null }, 2);
// console.log(checkLength(coords.vertOptions, coords.horizOptions));

test('returns an array of vertical or horizontal options', () =>
    expect(checkLength(coords.vertOptions, coords.horizOptions)).toEqual([
        [1, 0],
    ]));
