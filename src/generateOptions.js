export default function generateOptions(coords) {
    const options = [];
    if (coords[0] - 1 >= 0) {
        options.push([coords[0] - 1, coords[1]]);
    }
    if (coords[0] + 1 <= 10) {
        options.push([coords[0] + 1, coords[1]]);
    }
    if (coords[1] - 1 >= 0) {
        options.push([coords[0], coords[1] - 1]);
    }
    if (coords[1] + 1 <= 10) {
        options.push([coords[0], coords[1] + 1]);
    }
    return options;
}
