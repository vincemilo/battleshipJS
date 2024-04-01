export default class Ship {
    constructor(name, length, coords = [], numHits = 0, sunk = false) {
        this.name = name;
        this.length = length;
        this.coords = coords;
        this.numHits = numHits;
        this.sunk = sunk;
    }

    hit() {
        this.numHits += 1;
        this.isSunk();
    }

    isSunk() {
        if (this.numHits === this.length) this.sunk = true;
    }
}
