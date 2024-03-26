export default class Ship {
    constructor(length, numHits = 0, isSunk = false) {
        this.length = length;
        this.numHits = numHits;
        this.isSunk = isSunk;
    }
}
