// check if options have already been used
export default function validateAttack(options, missCoords) {
    for (let i = 0; i < options.length; i += 1) {
        if (!(options[i] in missCoords)) return options[i];
    }
    return false;
}
