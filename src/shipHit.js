export default function shipHit() {
    const shipArr = this.gameBoard.ships;
    for (let i = 0; i < shipArr.length; i += 1) {
        const ship = this.ships[i];
        if (attackCoords in ship.coords) {
            ship.hit();
            if (ship.sunk) {
                this.shipsSunk += 1;
                this.checkAllSunk();
            }
        }
    }
}
