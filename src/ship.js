export default class Ship {
    constructor(name, length, coords, numHits = 0, sunk = false) {
        this.name = name;
        this.length = length;
        this.numHits = numHits;
        this.sunk = sunk;
        this.coords = coords;
    }

    hit() {
        this.numHits += 1;
        if (this.numHits === this.length) this.sunk = true;
    }
}
