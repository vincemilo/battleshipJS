import translateCoords from './translateCoords';
import generateOptions from './generateOptions';
import validateAttack from './validateAttack';

const prevOptions = {};

export default function checkAdjacent(hitCoords, missCoords) {
    let adjSquare = '';
    hitCoords.forEach((e) => {
        const translated = translateCoords(e);
        console.log(translated);
        console.log(missCoords);
        const options = generateOptions(translated);
        // check if option has already been generated or is a miss
        options.forEach((option) => {
            if (!(option in prevOptions) && !(option in missCoords))
                prevOptions[option] = null;
        });
        //        const prevOptionsKeys = Object.keys(prevOptions);
        // prevOptionsKeys.forEach((key) => {
        //     if (key in missCoords) {
        //         delete prevOptions[key];
        //     } else {
        //         console.log([key[0], key[2]]);
        //     }
        // });
        adjSquare = validateAttack(options, missCoords);
    });
    return adjSquare;
}
