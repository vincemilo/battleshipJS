import player2grid from './player2grid';

export default function main(player1, player2) {
    const mainDiv = document.createElement('main');
    const p2Grid = player2grid(player1, player2);
    mainDiv.appendChild(p2Grid);
    return mainDiv;
}
