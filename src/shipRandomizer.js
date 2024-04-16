import checkLength from './checkLength';

const usedCoords = {};
function randomValidNum(min, max) {
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeild) + minCeild);
}

export default function shipRandomizer(length) {
    const coords = [];
    for (let i = 0; i < (10 - length) * (10 - length); i += 1) {
        const coord1 = randomValidNum(0, 9);
        const coord2 = randomValidNum(0, 10 - length);
        if (!([coord1, coord2] in usedCoords)) {
            return checkLength([coord1, coord2], usedCoords, length);
            // usedCoords[[coord1, coord2]] = null;
        }

        coords.push([coord1, coord2]);
    }

    return coords;
}
