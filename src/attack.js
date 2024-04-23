import endTurn from './endTurn';
import gameOver from './gameOver';

// takes a clicked cell and updates the board and status bar accordingly as well as ends the turn
export default function attack(player1, player2, e) {
    // console.log(player1.comp);
    let status = '';
    let cell = '';
    if (player1.comp) {
        cell = document.getElementById(e.coords);
        status = document.querySelector('.status2');
    } else {
        cell = document.getElementById(e.name);
        status = document.querySelector('.status');
    }
    const attackStatus = player1.attack(e);
    if (attackStatus === 2) {
        player2.gameBoard.receiveAttack(e.coords);
        cell.style.backgroundColor = 'red';
        status.innerText = 'Hit!';
        const sunk = player2.gameBoard.latestSunk;
        if (sunk.length) {
            if (player1.comp) {
                status.innerText = `They sunk your ${sunk}!`;
            } else {
                status.innerText = `You sunk their ${sunk}!`;
            }
            player2.gameBoard.resetShipsSunk();
        }
        if (player2.gameBoard.allSunk) {
            if (player1.comp) {
                status.innerText += ' Game over! You lose!';
            } else {
                status.innerText += ' Game over! You win!';
            }
            return gameOver();
        }
    } else if (attackStatus === 1) {
        status.innerText = 'Already attacked! Miss!';
    } else {
        status.innerText = 'Miss!';
        cell.style.backgroundColor = 'white';
    }

    return endTurn(player1, player2);
}
