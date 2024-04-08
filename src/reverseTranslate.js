export default function reverseTranslate(coords) {
    const letter = String.fromCharCode(coords[0] + 97);
    const num = coords[1] + 1;
    return letter + num;
}
