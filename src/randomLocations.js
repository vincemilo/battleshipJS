// checks to see if ship length could fit in given coordinates range

import checkLength from './checkLength';

export default function randomLocations(coords, usedCoords, length) {
    const vertOptions = [coords];
    const horizOptions = [coords];
    for (let i = 1; i < length; i += 1) {
        // check vertical doesn't go off the board and hasnt already been used
        if (
            coords[0] + length - 1 <= 9 &&
            !([coords[0] + i, coords[1]] in usedCoords)
        ) {
            vertOptions.push([coords[0] + i, coords[1]]);
        }
        if (
            coords[0] - length + 1 >= 0 &&
            !([coords[0] - i, coords[1]] in usedCoords)
        ) {
            vertOptions.push([coords[0] - i, coords[1]]);
        }
        // check horizontal doesn't go off board and hasnt already been used
        if (
            coords[1] + length - 1 <= 9 &&
            !([coords[0], coords[1] + i] in usedCoords)
        ) {
            horizOptions.push([coords[0], coords[1] + i]);
        }
        if (
            coords[1] - length + 1 >= 0 &&
            !([coords[0], coords[1] - i] in usedCoords)
        ) {
            horizOptions.push([coords[0], coords[1] - i]);
        }
    }
    if (vertOptions.length > horizOptions.length) {
        return checkLength(vertOptions, length);
    }
    if (horizOptions.length > vertOptions.length) {
        return checkLength(horizOptions, length);
    }
    const options = [vertOptions, horizOptions];
    const coinToss = Math.floor(Math.random() * 2);
    return checkLength(options[coinToss], length);
}
