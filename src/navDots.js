import Active from './img/full-stop.png';
import Inactive from './img/period.png';
import dotArray from './dotArray';

export default function navDots(imgCarousel) {
    const navDotContainer = document.createElement('div');
    navDotContainer.classList.add('navdots');
    const initialDot = new Image();
    initialDot.src = Active;
    initialDot.id = 0;
    initialDot.classList.add('active');
    dotArray.push(initialDot);
    for (let i = 0; i < imgCarousel.length - 1; i += 1) {
        const dot = new Image();
        dot.src = Inactive;
        dot.id = i + 1;
        dotArray.push(dot);
    }
    dotArray.forEach((dot) => navDotContainer.appendChild(dot));

    return navDotContainer;
}
