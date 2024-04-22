import randomLocations from './randomLocations';

function randomValidNum(min, max) {
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeild) + minCeild);
}

export default function shipRandomizer(length, board) {
    const usedCoords = board.getShipLocs();
    const coord1 = randomValidNum(0, 9);
    const coord2 = randomValidNum(0, 9);
    if (!([coord1, coord2] in usedCoords)) {
        const options = randomLocations([coord1, coord2], usedCoords, length);
        if (options.length === length) {
            for (let i = 0; i < options.length; i += 1) {
                board.occupy(options[i]);
            }
            return options;
        }
    }
    // run again if valid coords aren't found
    return shipRandomizer(length, board);
}
