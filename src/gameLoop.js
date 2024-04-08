export default function gameLoop(player1, player2) {
    let turn = 0;
    let gameOver = false;
    while (gameOver === false) {
        turn += 1;
        gameOver = true;
    }
    return { player1, player2, turn };
}
