import Player from './player';
import main from './main';

export default function newGame() {
    const player1 = new Player();
    const player2 = new Player(true);
    const mainDiv = document.querySelector('main');
    const content = document.getElementById('content');
    mainDiv.remove();
    content.appendChild(main(player1, player2));
}
