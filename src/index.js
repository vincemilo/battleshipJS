// import _ from 'lodash';
import gameLoop from './gameLoop';
import header from './header';
import Player from './player';

const player1 = new Player();
const player2 = new Player(true);
const content = document.createElement('div');
content.id = 'content';
const body = document.querySelector('body');
content.appendChild(header());
body.appendChild(content);

const grid = document.createElement('div');

gameLoop(player1, player2);
