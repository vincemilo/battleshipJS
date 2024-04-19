import checkLength from './checkLength';
import randomLocations from './randomLocations';

function randomValidNum(min, max) {
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeild) + minCeild);
}

export default function shipRandomizer(length, board) {
    const usedCoords = board.shipLocations;
    const coords = {};
    const coord1 = randomValidNum(0, 9);
    const coord2 = randomValidNum(0, 10 - length);
    if (!([coord1, coord2] in usedCoords)) {
        const options = randomLocations([coord1, coord2], usedCoords, length);
        coords[[coord1, coord2]] = null;
        board.occupy([coord1, coord2]);
        const adjSquares = checkLength(
            options.vertOptions,
            options.horizOptions
        );
        for (let i = 0; i < adjSquares.length; i += 1) {
            coords[adjSquares[i]] = null;
            board.occupy(adjSquares[i]);
            if (Object.keys(coords).length === length) {
                return coords;
            }
        }
    }
    // run again if valid coords aren't found
    console.log('again');
    // return shipRandomizer(length, usedCoords);
}
