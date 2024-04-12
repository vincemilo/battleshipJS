import translateCoords from './translateCoords';
import generateOptions from './generateOptions';
import validateAttack from './validateAttack';

export default function checkAdjacent(hitCoords, missCoords) {
    let adjSquare = '';
    hitCoords.forEach((e) => {
        const translated = translateCoords(e);
        const options = generateOptions(translated);
        adjSquare = validateAttack(options, missCoords);
    });
    return adjSquare;
}
