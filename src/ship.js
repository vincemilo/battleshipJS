export default class Ship {
    constructor(name, length, coords = [], numHits = 0) {
        this.name = name;
        this.length = length;
        this.coords = coords;
        this.numHits = numHits;
    }

    hit() {
        this.numHits += 1;
    }

    isSunk() {
        return this.numHits === this.length;
    }
}
