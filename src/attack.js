import endTurn from './endTurn';

// takes a clicked cell and updates the board and status bar accordingly as well as ends the turn
export default function attack(player1, player2, e) {
    // console.log(player1.comp);
    const status = document.querySelector('.status');
    let cell = '';
    if (player1.comp) {
        cell = document.getElementById(e.coords);
    } else {
        cell = document.getElementById(e.name);
    }
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

    endTurn(player1, player2);
}
