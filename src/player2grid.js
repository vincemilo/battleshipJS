import attack from './attack';

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
            cell.addEventListener('click', () => attack(player1, player2, e));
            div.appendChild(cell);
        });
    });
    container.appendChild(div);
    container.appendChild(status);
    return container;
}
