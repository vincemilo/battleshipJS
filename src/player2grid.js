export default function player2grid(player1, player2) {
    const container = document.createElement('div');
    const p2grid = player2.gameBoard.grid;
    const div = document.createElement('div');
    div.className = 'player2-grid';
    const status = document.createElement('div');
    status.className = 'status';
    status.innerText = 'Click location to attack';
    p2grid.forEach((element) => {
        element.forEach((e) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = e.name;
            cell.addEventListener('click', () => {
                if (player1.attack(e) === 2) {
                    player2.gameBoard.receiveAttack(e.name);
                    cell.style.backgroundColor = 'red';
                    status.innerText = 'Hit!';
                    const sunk = player2.gameBoard.latestSunk;
                    if (sunk.length) {
                        status.innerText = `You sunk their ${sunk}!`;
                        player2.gameBoard.resetShipsSunk();
                    }
                    if (player2.gameBoard.allSunk) {
                        status.innerText += ' Game over!';
                    }
                } else if (player1.attack(e) === 1) {
                    status.innerText = 'Already attacked! Miss!';
                } else {
                    status.innerText = 'Miss!';
                    cell.style.backgroundColor = 'white';
                }
            });
            div.appendChild(cell);
        });
    });
    container.appendChild(div);
    container.appendChild(status);
    return container;
}
