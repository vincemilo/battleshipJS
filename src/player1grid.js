export default function player1grid(player1, player2) {
    const container = document.createElement('div');
    const p1info = document.createElement('div');
    p1info.innerText = 'Your ships';
    p1info.className = 'info';
    const p1grid = player1.gameBoard.grid;

    const div = document.createElement('div');
    div.className = 'player1-grid';

    p1grid.forEach((element) => {
        element.forEach((e) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = e.name;
            div.appendChild(cell);
        });
    });
    container.appendChild(p1info);
    container.appendChild(div);
    return container;
}
