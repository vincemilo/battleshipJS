// import _ from 'lodash';
import gameLoop from './gameLoop';
import header from './header';
import Player from './player';
import main from './main';
import './style.css';

const player1 = new Player();
const player2 = new Player(true);
const content = document.createElement('div');
content.id = 'content';
const body = document.querySelector('body');
content.appendChild(header());
content.appendChild(main(player1, player2));
body.appendChild(content);

// gameLoop(player1, player2);
