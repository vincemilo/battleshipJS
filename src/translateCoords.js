export default function translateCoords(coords) {
    const letter = coords[0].charCodeAt() - 97;
    const num = coords[1] - 1;
    return [letter, num];
}
