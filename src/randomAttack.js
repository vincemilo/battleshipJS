export default function randomAttack(coords) {
    const keys = Object.keys(coords);
    const randomCoords = keys[Math.floor(Math.random() * keys.length)];
    return [randomCoords[0], randomCoords[2]];
}
