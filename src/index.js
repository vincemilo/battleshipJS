// import _ from 'lodash';
import header from './header';
import './style.css';
import footer from './footer';
import slider from './slider';

const content = document.createElement('div');
content.id = 'content';
document.body.appendChild(content);
const main = document.createElement('main');

main.appendChild(slider());
// main.appendChild(menu());

content.appendChild(header());
content.appendChild(main);
content.appendChild(footer());
