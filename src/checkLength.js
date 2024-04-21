export default function checkLength(options, length) {
    const coords = [];
    for (let i = 0; i < length; i += 1) {
        coords.push(options[i]);
    }
    return coords;
}
