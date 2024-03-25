import Active from './img/full-stop.png';
import Inactive from './img/period.png';
import imgCarousel from './imgCarousel';
import dotArray from './dotArray';
import clearNavDots from './clearNavDots';

export default function replaceImg(oldIndex, index, navDotContainer, window) {
    const currImg = new Image();
    currImg.src = imgCarousel[index];
    window.firstChild.remove();
    window.appendChild(currImg);
    const inactiveDot = new Image();
    inactiveDot.src = Inactive;
    inactiveDot.id = oldIndex;
    dotArray.splice(oldIndex, 1, inactiveDot);
    const activeDot = new Image();
    activeDot.src = Active;
    activeDot.id = index;
    activeDot.classList.add('active');
    dotArray.splice(index, 1, activeDot);
    clearNavDots();
    dotArray.forEach((dot) => navDotContainer.appendChild(dot));
    return navDotContainer;
}
