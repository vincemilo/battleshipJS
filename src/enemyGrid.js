export default function enemyGrid(grid) {
    const div = document.createElement('div');
    div.className = 'enemy-grid';
    grid.forEach((element) => {
        element.forEach((e) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = e.name;
            cell.addEventListener('click', () => console.log(e));
            div.appendChild(cell);
        });
    });
    return div;
}
