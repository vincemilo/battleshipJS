import enemyGrid from './enemyGrid';

export default function main(p2Grid, p1Grid) {
    const mainDiv = document.createElement('main');
    const eGrid = enemyGrid(p2Grid);
    // const pGrid = playerGrid(p1Grid);
    mainDiv.appendChild(eGrid);
    return mainDiv;
}
