let turn = 0;

export default function endTurn(player1, player2) {
    if (player2.comp) {
        player2.comp.compAttack(player1, player2);
    }

    turn += 1;
    turn %= 2;
    return turn;
}
