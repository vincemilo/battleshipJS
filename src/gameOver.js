import newGame from './newGame';

export default function gameOver() {
    const main = document.querySelector('main');
    const newMain = main.cloneNode(true);
    const content = document.getElementById('content');
    main.remove();
    content.appendChild(newMain);
    const newGameBtn = document.createElement('button');
    newGameBtn.innerText = 'Play again';
    newGameBtn.id = 'new-game';
    newGameBtn.addEventListener('click', () => newGame());
    newMain.appendChild(newGameBtn);
}
