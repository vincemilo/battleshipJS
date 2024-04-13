import player1grid from './player1grid';
import player2grid from './player2grid';

export default function main(player1, player2) {
    const mainDiv = document.createElement('main');
    const p2grid = player2grid(player1, player2);
    const p1grid = player1grid(player1, player2);
    mainDiv.appendChild(p2grid);
    mainDiv.appendChild(p1grid);
    return mainDiv;
}
