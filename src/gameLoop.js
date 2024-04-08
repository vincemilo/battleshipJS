export default function gameLoop(player1, player2) {
    let turn = 0;
    let gameOver = false;
    player2.gameBoard.placeShips();
    while (gameOver === false) {
        turn += 1;
        gameOver = true;
    }
    return turn;
}
