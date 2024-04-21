import randomLocations from './randomLocations';

function randomValidNum(min, max) {
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeild) + minCeild);
}

export default function shipRandomizer(length, board) {
    const usedCoords = board.shipLocations;
    // console.log(usedCoords);
    // const coords = {};
    const coord1 = randomValidNum(0, 9);
    const coord2 = randomValidNum(0, 10 - length);
    if (!([coord1, coord2] in usedCoords)) {
        const options = randomLocations([coord1, coord2], usedCoords, length);

        for (let i = 0; i < options.length; i += 1) {
            board.occupy(options[i]);
        }
        // board.occupy([coord1, coord2]);
        return options;
        // const adjSquares = checkLength(
        //     options.vertOptions,
        //     options.horizOptions,
        //     board
        // );
        // usedCoords = board.getShipLocs();
        // for (let i = 0; i < adjSquares.length; i += 1) {
        //     // console.log(coords[adjSquares[i]] in usedCoords);
        //     coords[adjSquares[i]] = null;
        //     board.occupy(adjSquares[i]);
        //     if (Object.keys(coords).length === length) {
        //         return coords;
        //     }
        // }
    }
    // run again if valid coords aren't found
    console.log('again');

    // usedCoords = board.getShipLocs();
    // return shipRandomizer(length, usedCoords);
}
