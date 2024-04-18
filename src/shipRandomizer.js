import checkLength from './checkLength';
import randomLocations from './randomLocations';

const usedCoords = {};
function randomValidNum(min, max) {
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeild) + minCeild);
}

export default function shipRandomizer(length) {
    const coords = {};
    // for (let i = 0; i < (10 - length) * (10 - length); i += 1) {
    const coord1 = randomValidNum(0, 9);
    const coord2 = randomValidNum(0, 10 - length);
    if (!([coord1, coord2] in usedCoords)) {
        const options = randomLocations([coord1, coord2], usedCoords, length);
        usedCoords[[coord1, coord2]] = null;
        coords[[coord1, coord2]] = null;
        for (let i = 0; i < length - 1; i += 1) {
            const adjSquares = checkLength(
                options.vertOptions,
                options.horizOptions
            );
            coords[adjSquares[i]] = null;
            if (Object.keys(coords).length === length) {
                return coords;
            }
        }
    }
    // run if valid coords aren't found
    return shipRandomizer(length);
}
