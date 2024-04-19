export default function checkLength(vert, horiz) {
    let options = [vert, horiz];
    if (vert.length > horiz.length) {
        options = vert;
    } else if (vert.length < horiz.length) {
        options = horiz;
    } else {
        const coinToss = Math.floor(Math.random() * 2);
        options = options[coinToss];
    }
    return options;
}
