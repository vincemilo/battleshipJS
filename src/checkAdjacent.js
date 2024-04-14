import translateCoords from './translateCoords';
import generateOptions from './generateOptions';

const prevOptions = {};

export default function checkAdjacent(hitCoords, missCoords) {
    let adjSquare = '';
    hitCoords.forEach((e) => {
        const translated = translateCoords(e);
        const options = generateOptions(translated);
        // check if option has already been generated or is a miss
        options.forEach((option) => {
            if (!(option in prevOptions) && !(option in missCoords))
                prevOptions[option] = null;
        });
        const prevOptionsKeys = Object.keys(prevOptions);
        prevOptionsKeys.forEach((key) => {
            if (key in missCoords) {
                delete prevOptions[key];
            } else {
                adjSquare = [Number(key[0]), Number(key[2])];
            }
        });
    });
    return adjSquare;
}
