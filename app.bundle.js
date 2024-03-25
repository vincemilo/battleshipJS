/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/advanceSlide.js":
/*!*****************************!*\
  !*** ./src/advanceSlide.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ advanceSlide)
/* harmony export */ });
/* harmony import */ var _replaceImg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replaceImg */ "./src/replaceImg.js");
/* harmony import */ var _i__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i */ "./src/i.js");



function advanceSlide(
    index,
    imgCarousel,
    navDotContainer,
    window
) {
    const oldIndex = index;
    let newIndex = index;
    if (index === imgCarousel.length - 1) {
        newIndex = 0;
    } else {
        newIndex += 1;
    }
    (0,_replaceImg__WEBPACK_IMPORTED_MODULE_0__["default"])(oldIndex, newIndex, navDotContainer, window);
    (0,_i__WEBPACK_IMPORTED_MODULE_1__.setIndex)(newIndex);
    return newIndex;
}


/***/ }),

/***/ "./src/clearNavDots.js":
/*!*****************************!*\
  !*** ./src/clearNavDots.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ clearNavDots)
/* harmony export */ });
function clearNavDots() {
    const navDotContainer = document.querySelector('.navdots');
    navDotContainer.innerText = '';
}


/***/ }),

/***/ "./src/dotArray.js":
/*!*************************!*\
  !*** ./src/dotArray.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dotArray = [];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dotArray);


/***/ }),

/***/ "./src/footer.js":
/*!***********************!*\
  !*** ./src/footer.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ footer)
/* harmony export */ });
function footer() {
    const footerDiv = document.createElement('footer');
    footerDiv.innerHTML += `<a href="https://www.flaticon.com/">Icons created by Kiranshastry - Flaticon</a>`;
    return footerDiv;
}


/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ header)
/* harmony export */ });
function header() {
    const headerDiv = document.createElement('header');
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.innerText = 'Image Slider App';
    headerDiv.appendChild(logo);
    return headerDiv;
}


/***/ }),

/***/ "./src/i.js":
/*!******************!*\
  !*** ./src/i.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getIndex: () => (/* binding */ getIndex),
/* harmony export */   setIndex: () => (/* binding */ setIndex)
/* harmony export */ });
let index = 0;
const getIndex = () => index;
const setIndex = (value) => {
    index = value;
};




/***/ }),

/***/ "./src/imgCarousel.js":
/*!****************************!*\
  !*** ./src/imgCarousel.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _img_Crono2_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/Crono2.png */ "./src/img/Crono2.png");
/* harmony import */ var _img_Frog_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/Frog.png */ "./src/img/Frog.png");
/* harmony import */ var _img_Lucca2_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/Lucca2.png */ "./src/img/Lucca2.png");
/* harmony import */ var _img_Marle2_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/Marle2.png */ "./src/img/Marle2.png");
/* harmony import */ var _img_Robo2_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/Robo2.png */ "./src/img/Robo2.png");
/* harmony import */ var _img_Ayla_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./img/Ayla.png */ "./src/img/Ayla.png");
/* harmony import */ var _img_Magus2_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./img/Magus2.png */ "./src/img/Magus2.png");








const imgCarousel = [_img_Crono2_png__WEBPACK_IMPORTED_MODULE_0__, _img_Frog_png__WEBPACK_IMPORTED_MODULE_1__, _img_Lucca2_png__WEBPACK_IMPORTED_MODULE_2__, _img_Marle2_png__WEBPACK_IMPORTED_MODULE_3__, _img_Robo2_png__WEBPACK_IMPORTED_MODULE_4__, _img_Ayla_png__WEBPACK_IMPORTED_MODULE_5__, _img_Magus2_png__WEBPACK_IMPORTED_MODULE_6__];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (imgCarousel);


/***/ }),

/***/ "./src/navDots.js":
/*!************************!*\
  !*** ./src/navDots.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ navDots)
/* harmony export */ });
/* harmony import */ var _img_full_stop_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/full-stop.png */ "./src/img/full-stop.png");
/* harmony import */ var _img_period_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/period.png */ "./src/img/period.png");
/* harmony import */ var _dotArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dotArray */ "./src/dotArray.js");




function navDots(imgCarousel) {
    const navDotContainer = document.createElement('div');
    navDotContainer.classList.add('navdots');
    const initialDot = new Image();
    initialDot.src = _img_full_stop_png__WEBPACK_IMPORTED_MODULE_0__;
    initialDot.id = 0;
    initialDot.classList.add('active');
    _dotArray__WEBPACK_IMPORTED_MODULE_2__["default"].push(initialDot);
    for (let i = 0; i < imgCarousel.length - 1; i += 1) {
        const dot = new Image();
        dot.src = _img_period_png__WEBPACK_IMPORTED_MODULE_1__;
        dot.id = i + 1;
        _dotArray__WEBPACK_IMPORTED_MODULE_2__["default"].push(dot);
    }
    _dotArray__WEBPACK_IMPORTED_MODULE_2__["default"].forEach((dot) => navDotContainer.appendChild(dot));

    return navDotContainer;
}


/***/ }),

/***/ "./src/replaceImg.js":
/*!***************************!*\
  !*** ./src/replaceImg.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ replaceImg)
/* harmony export */ });
/* harmony import */ var _img_full_stop_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/full-stop.png */ "./src/img/full-stop.png");
/* harmony import */ var _img_period_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/period.png */ "./src/img/period.png");
/* harmony import */ var _imgCarousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imgCarousel */ "./src/imgCarousel.js");
/* harmony import */ var _dotArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dotArray */ "./src/dotArray.js");
/* harmony import */ var _clearNavDots__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clearNavDots */ "./src/clearNavDots.js");






function replaceImg(oldIndex, index, navDotContainer, window) {
    const currImg = new Image();
    currImg.src = _imgCarousel__WEBPACK_IMPORTED_MODULE_2__["default"][index];
    window.firstChild.remove();
    window.appendChild(currImg);
    const inactiveDot = new Image();
    inactiveDot.src = _img_period_png__WEBPACK_IMPORTED_MODULE_1__;
    inactiveDot.id = oldIndex;
    _dotArray__WEBPACK_IMPORTED_MODULE_3__["default"].splice(oldIndex, 1, inactiveDot);
    const activeDot = new Image();
    activeDot.src = _img_full_stop_png__WEBPACK_IMPORTED_MODULE_0__;
    activeDot.id = index;
    activeDot.classList.add('active');
    _dotArray__WEBPACK_IMPORTED_MODULE_3__["default"].splice(index, 1, activeDot);
    (0,_clearNavDots__WEBPACK_IMPORTED_MODULE_4__["default"])();
    _dotArray__WEBPACK_IMPORTED_MODULE_3__["default"].forEach((dot) => navDotContainer.appendChild(dot));
    return navDotContainer;
}


/***/ }),

/***/ "./src/slider.js":
/*!***********************!*\
  !*** ./src/slider.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
/* harmony import */ var _navDots__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navDots */ "./src/navDots.js");
/* harmony import */ var _imgCarousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgCarousel */ "./src/imgCarousel.js");
/* harmony import */ var _replaceImg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replaceImg */ "./src/replaceImg.js");
/* harmony import */ var _img_prev_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/prev.png */ "./src/img/prev.png");
/* harmony import */ var _img_next_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/next.png */ "./src/img/next.png");
/* harmony import */ var _advanceSlide__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./advanceSlide */ "./src/advanceSlide.js");
/* harmony import */ var _i__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./i */ "./src/i.js");








function slider() {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');
    const windowWrapper = document.createElement('div');
    windowWrapper.classList.add('window-wrapper');
    const window = document.createElement('div');
    window.className = 'window';
    const nextButton = new Image();
    nextButton.src = _img_next_png__WEBPACK_IMPORTED_MODULE_4__;
    nextButton.classList.add('nav-button');
    const prevButton = new Image();
    prevButton.src = _img_prev_png__WEBPACK_IMPORTED_MODULE_3__;
    prevButton.classList.add('nav-button');
    const initialImg = new Image();
    [initialImg.src] = _imgCarousel__WEBPACK_IMPORTED_MODULE_1__["default"];
    window.appendChild(initialImg);
    let index = (0,_i__WEBPACK_IMPORTED_MODULE_6__.getIndex)();

    const navDotContainer = (0,_navDots__WEBPACK_IMPORTED_MODULE_0__["default"])(_imgCarousel__WEBPACK_IMPORTED_MODULE_1__["default"]);

    nextButton.addEventListener('click', () => {
        const oldIndex = index;
        if (index === _imgCarousel__WEBPACK_IMPORTED_MODULE_1__["default"].length - 1) {
            index = 0;
        } else {
            index += 1;
        }
        (0,_i__WEBPACK_IMPORTED_MODULE_6__.setIndex)(index);
        (0,_replaceImg__WEBPACK_IMPORTED_MODULE_2__["default"])(oldIndex, index, navDotContainer, window);
    });

    prevButton.addEventListener('click', () => {
        const oldIndex = index;
        if (index === 0) {
            index = _imgCarousel__WEBPACK_IMPORTED_MODULE_1__["default"].length - 1;
        } else {
            index -= 1;
        }
        (0,_i__WEBPACK_IMPORTED_MODULE_6__.setIndex)(index);
        (0,_replaceImg__WEBPACK_IMPORTED_MODULE_2__["default"])(oldIndex, index, navDotContainer, window);
    });

    navDotContainer.addEventListener('click', (e) => {
        const activeImg = document.querySelector('.active');
        const oldIndex = Number(activeImg.id);
        navDotContainer.innerText = '';
        index = Number(e.target.id);
        (0,_i__WEBPACK_IMPORTED_MODULE_6__.setIndex)(index);
        (0,_replaceImg__WEBPACK_IMPORTED_MODULE_2__["default"])(oldIndex, index, navDotContainer, window);
    });

    const play = document.createElement('div');
    play.className = 'button';
    play.innerText = 'Play';
    let intervalId = 0;
    play.addEventListener('click', () => {
        if (play.innerText === 'Play') {
            intervalId = setInterval(() => {
                index = (0,_advanceSlide__WEBPACK_IMPORTED_MODULE_5__["default"])(
                    index,
                    _imgCarousel__WEBPACK_IMPORTED_MODULE_1__["default"],
                    navDotContainer,
                    window
                );
            }, 5000);
            play.innerText = 'Pause';
        } else {
            play.innerText = 'Play';
            clearInterval(intervalId);
        }
    });

    windowWrapper.appendChild(prevButton);
    windowWrapper.appendChild(window);
    windowWrapper.appendChild(nextButton);
    sliderContainer.appendChild(windowWrapper);
    sliderContainer.appendChild(navDotContainer);
    sliderContainer.appendChild(play);
    return sliderContainer;
}


/***/ }),

/***/ "./src/img/Ayla.png":
/*!**************************!*\
  !*** ./src/img/Ayla.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0ef40c57488d3f57b199.png";

/***/ }),

/***/ "./src/img/Crono2.png":
/*!****************************!*\
  !*** ./src/img/Crono2.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3a2abcbc0be6823cc135.png";

/***/ }),

/***/ "./src/img/Frog.png":
/*!**************************!*\
  !*** ./src/img/Frog.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5b96db07f773393f8adf.png";

/***/ }),

/***/ "./src/img/Lucca2.png":
/*!****************************!*\
  !*** ./src/img/Lucca2.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "91a4ab43ed3a9b9d1eeb.png";

/***/ }),

/***/ "./src/img/Magus2.png":
/*!****************************!*\
  !*** ./src/img/Magus2.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6ec34ed2ab7039f24bad.png";

/***/ }),

/***/ "./src/img/Marle2.png":
/*!****************************!*\
  !*** ./src/img/Marle2.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e746086dac18364b8e69.png";

/***/ }),

/***/ "./src/img/Robo2.png":
/*!***************************!*\
  !*** ./src/img/Robo2.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b28fe1d67df7785ae3dc.png";

/***/ }),

/***/ "./src/img/full-stop.png":
/*!*******************************!*\
  !*** ./src/img/full-stop.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "994a6c722e466c0558dd.png";

/***/ }),

/***/ "./src/img/next.png":
/*!**************************!*\
  !*** ./src/img/next.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "8548a4d9204866ca46a3.png";

/***/ }),

/***/ "./src/img/period.png":
/*!****************************!*\
  !*** ./src/img/period.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "03a495692b825d4c4c5b.png";

/***/ }),

/***/ "./src/img/prev.png":
/*!**************************!*\
  !*** ./src/img/prev.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6e4df07d6acd7584a604.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer */ "./src/footer.js");
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slider */ "./src/slider.js");
// import _ from 'lodash';





const content = document.createElement('div');
content.id = 'content';
document.body.appendChild(content);
const main = document.createElement('main');

main.appendChild((0,_slider__WEBPACK_IMPORTED_MODULE_3__["default"])());
// main.appendChild(menu());

content.appendChild((0,_header__WEBPACK_IMPORTED_MODULE_0__["default"])());
content.appendChild(main);
content.appendChild((0,_footer__WEBPACK_IMPORTED_MODULE_2__["default"])());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7VUN2RkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUM4QjtBQUNUO0FBQ1M7QUFDQTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG1EQUFNO0FBQ3ZCOztBQUVBLG9CQUFvQixtREFBTTtBQUMxQjtBQUNBLG9CQUFvQixtREFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL2pzdG9kby8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9qc3RvZG8vLi9zcmMvYWR2YW5jZVNsaWRlLmpzIiwid2VicGFjazovL2pzdG9kby8uL3NyYy9jbGVhck5hdkRvdHMuanMiLCJ3ZWJwYWNrOi8vanN0b2RvLy4vc3JjL2RvdEFycmF5LmpzIiwid2VicGFjazovL2pzdG9kby8uL3NyYy9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vanN0b2RvLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9qc3RvZG8vLi9zcmMvaS5qcyIsIndlYnBhY2s6Ly9qc3RvZG8vLi9zcmMvaW1nQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vanN0b2RvLy4vc3JjL25hdkRvdHMuanMiLCJ3ZWJwYWNrOi8vanN0b2RvLy4vc3JjL3JlcGxhY2VJbWcuanMiLCJ3ZWJwYWNrOi8vanN0b2RvLy4vc3JjL3NsaWRlci5qcyIsIndlYnBhY2s6Ly9qc3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanN0b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc3RvZG8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9qc3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9qc3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc3RvZG8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vanN0b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCByZXBsYWNlSW1nIGZyb20gJy4vcmVwbGFjZUltZyc7XG5pbXBvcnQgeyBzZXRJbmRleCB9IGZyb20gJy4vaSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkdmFuY2VTbGlkZShcbiAgICBpbmRleCxcbiAgICBpbWdDYXJvdXNlbCxcbiAgICBuYXZEb3RDb250YWluZXIsXG4gICAgd2luZG93XG4pIHtcbiAgICBjb25zdCBvbGRJbmRleCA9IGluZGV4O1xuICAgIGxldCBuZXdJbmRleCA9IGluZGV4O1xuICAgIGlmIChpbmRleCA9PT0gaW1nQ2Fyb3VzZWwubGVuZ3RoIC0gMSkge1xuICAgICAgICBuZXdJbmRleCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3SW5kZXggKz0gMTtcbiAgICB9XG4gICAgcmVwbGFjZUltZyhvbGRJbmRleCwgbmV3SW5kZXgsIG5hdkRvdENvbnRhaW5lciwgd2luZG93KTtcbiAgICBzZXRJbmRleChuZXdJbmRleCk7XG4gICAgcmV0dXJuIG5ld0luZGV4O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xlYXJOYXZEb3RzKCkge1xuICAgIGNvbnN0IG5hdkRvdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZkb3RzJyk7XG4gICAgbmF2RG90Q29udGFpbmVyLmlubmVyVGV4dCA9ICcnO1xufVxuIiwiY29uc3QgZG90QXJyYXkgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgZG90QXJyYXk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb290ZXIoKSB7XG4gICAgY29uc3QgZm9vdGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XG4gICAgZm9vdGVyRGl2LmlubmVySFRNTCArPSBgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9cIj5JY29ucyBjcmVhdGVkIGJ5IEtpcmFuc2hhc3RyeSAtIEZsYXRpY29uPC9hPmA7XG4gICAgcmV0dXJuIGZvb3RlckRpdjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbG9nby5jbGFzc05hbWUgPSAnbG9nbyc7XG4gICAgbG9nby5pbm5lclRleHQgPSAnSW1hZ2UgU2xpZGVyIEFwcCc7XG4gICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKGxvZ28pO1xuICAgIHJldHVybiBoZWFkZXJEaXY7XG59XG4iLCJsZXQgaW5kZXggPSAwO1xuY29uc3QgZ2V0SW5kZXggPSAoKSA9PiBpbmRleDtcbmNvbnN0IHNldEluZGV4ID0gKHZhbHVlKSA9PiB7XG4gICAgaW5kZXggPSB2YWx1ZTtcbn07XG5cbmV4cG9ydCB7IGdldEluZGV4LCBzZXRJbmRleCB9O1xuIiwiaW1wb3J0IENyb25vIGZyb20gJy4vaW1nL0Nyb25vMi5wbmcnO1xuaW1wb3J0IEZyb2cgZnJvbSAnLi9pbWcvRnJvZy5wbmcnO1xuaW1wb3J0IEx1Y2NhIGZyb20gJy4vaW1nL0x1Y2NhMi5wbmcnO1xuaW1wb3J0IE1hcmxlIGZyb20gJy4vaW1nL01hcmxlMi5wbmcnO1xuaW1wb3J0IFJvYm8gZnJvbSAnLi9pbWcvUm9ibzIucG5nJztcbmltcG9ydCBBeWxhIGZyb20gJy4vaW1nL0F5bGEucG5nJztcbmltcG9ydCBNYWd1cyBmcm9tICcuL2ltZy9NYWd1czIucG5nJztcblxuY29uc3QgaW1nQ2Fyb3VzZWwgPSBbQ3Jvbm8sIEZyb2csIEx1Y2NhLCBNYXJsZSwgUm9ibywgQXlsYSwgTWFndXNdO1xuXG5leHBvcnQgZGVmYXVsdCBpbWdDYXJvdXNlbDtcbiIsImltcG9ydCBBY3RpdmUgZnJvbSAnLi9pbWcvZnVsbC1zdG9wLnBuZyc7XG5pbXBvcnQgSW5hY3RpdmUgZnJvbSAnLi9pbWcvcGVyaW9kLnBuZyc7XG5pbXBvcnQgZG90QXJyYXkgZnJvbSAnLi9kb3RBcnJheSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5hdkRvdHMoaW1nQ2Fyb3VzZWwpIHtcbiAgICBjb25zdCBuYXZEb3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuYXZEb3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbmF2ZG90cycpO1xuICAgIGNvbnN0IGluaXRpYWxEb3QgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbml0aWFsRG90LnNyYyA9IEFjdGl2ZTtcbiAgICBpbml0aWFsRG90LmlkID0gMDtcbiAgICBpbml0aWFsRG90LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIGRvdEFycmF5LnB1c2goaW5pdGlhbERvdCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWdDYXJvdXNlbC5sZW5ndGggLSAxOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgZG90ID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGRvdC5zcmMgPSBJbmFjdGl2ZTtcbiAgICAgICAgZG90LmlkID0gaSArIDE7XG4gICAgICAgIGRvdEFycmF5LnB1c2goZG90KTtcbiAgICB9XG4gICAgZG90QXJyYXkuZm9yRWFjaCgoZG90KSA9PiBuYXZEb3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZG90KSk7XG5cbiAgICByZXR1cm4gbmF2RG90Q29udGFpbmVyO1xufVxuIiwiaW1wb3J0IEFjdGl2ZSBmcm9tICcuL2ltZy9mdWxsLXN0b3AucG5nJztcbmltcG9ydCBJbmFjdGl2ZSBmcm9tICcuL2ltZy9wZXJpb2QucG5nJztcbmltcG9ydCBpbWdDYXJvdXNlbCBmcm9tICcuL2ltZ0Nhcm91c2VsJztcbmltcG9ydCBkb3RBcnJheSBmcm9tICcuL2RvdEFycmF5JztcbmltcG9ydCBjbGVhck5hdkRvdHMgZnJvbSAnLi9jbGVhck5hdkRvdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXBsYWNlSW1nKG9sZEluZGV4LCBpbmRleCwgbmF2RG90Q29udGFpbmVyLCB3aW5kb3cpIHtcbiAgICBjb25zdCBjdXJySW1nID0gbmV3IEltYWdlKCk7XG4gICAgY3VyckltZy5zcmMgPSBpbWdDYXJvdXNlbFtpbmRleF07XG4gICAgd2luZG93LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgd2luZG93LmFwcGVuZENoaWxkKGN1cnJJbWcpO1xuICAgIGNvbnN0IGluYWN0aXZlRG90ID0gbmV3IEltYWdlKCk7XG4gICAgaW5hY3RpdmVEb3Quc3JjID0gSW5hY3RpdmU7XG4gICAgaW5hY3RpdmVEb3QuaWQgPSBvbGRJbmRleDtcbiAgICBkb3RBcnJheS5zcGxpY2Uob2xkSW5kZXgsIDEsIGluYWN0aXZlRG90KTtcbiAgICBjb25zdCBhY3RpdmVEb3QgPSBuZXcgSW1hZ2UoKTtcbiAgICBhY3RpdmVEb3Quc3JjID0gQWN0aXZlO1xuICAgIGFjdGl2ZURvdC5pZCA9IGluZGV4O1xuICAgIGFjdGl2ZURvdC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICBkb3RBcnJheS5zcGxpY2UoaW5kZXgsIDEsIGFjdGl2ZURvdCk7XG4gICAgY2xlYXJOYXZEb3RzKCk7XG4gICAgZG90QXJyYXkuZm9yRWFjaCgoZG90KSA9PiBuYXZEb3RDb250YWluZXIuYXBwZW5kQ2hpbGQoZG90KSk7XG4gICAgcmV0dXJuIG5hdkRvdENvbnRhaW5lcjtcbn1cbiIsImltcG9ydCBuYXZEb3RzIGZyb20gJy4vbmF2RG90cyc7XG5pbXBvcnQgaW1nQ2Fyb3VzZWwgZnJvbSAnLi9pbWdDYXJvdXNlbCc7XG5pbXBvcnQgcmVwbGFjZUltZyBmcm9tICcuL3JlcGxhY2VJbWcnO1xuaW1wb3J0IFByZXYgZnJvbSAnLi9pbWcvcHJldi5wbmcnO1xuaW1wb3J0IE5leHQgZnJvbSAnLi9pbWcvbmV4dC5wbmcnO1xuaW1wb3J0IGFkdmFuY2VTbGlkZSBmcm9tICcuL2FkdmFuY2VTbGlkZSc7XG5pbXBvcnQgeyBnZXRJbmRleCwgc2V0SW5kZXggfSBmcm9tICcuL2knO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbGlkZXIoKSB7XG4gICAgY29uc3Qgc2xpZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2xpZGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlci1jb250YWluZXInKTtcbiAgICBjb25zdCB3aW5kb3dXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgd2luZG93V3JhcHBlci5jbGFzc0xpc3QuYWRkKCd3aW5kb3ctd3JhcHBlcicpO1xuICAgIGNvbnN0IHdpbmRvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHdpbmRvdy5jbGFzc05hbWUgPSAnd2luZG93JztcbiAgICBjb25zdCBuZXh0QnV0dG9uID0gbmV3IEltYWdlKCk7XG4gICAgbmV4dEJ1dHRvbi5zcmMgPSBOZXh0O1xuICAgIG5leHRCdXR0b24uY2xhc3NMaXN0LmFkZCgnbmF2LWJ1dHRvbicpO1xuICAgIGNvbnN0IHByZXZCdXR0b24gPSBuZXcgSW1hZ2UoKTtcbiAgICBwcmV2QnV0dG9uLnNyYyA9IFByZXY7XG4gICAgcHJldkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCduYXYtYnV0dG9uJyk7XG4gICAgY29uc3QgaW5pdGlhbEltZyA9IG5ldyBJbWFnZSgpO1xuICAgIFtpbml0aWFsSW1nLnNyY10gPSBpbWdDYXJvdXNlbDtcbiAgICB3aW5kb3cuYXBwZW5kQ2hpbGQoaW5pdGlhbEltZyk7XG4gICAgbGV0IGluZGV4ID0gZ2V0SW5kZXgoKTtcblxuICAgIGNvbnN0IG5hdkRvdENvbnRhaW5lciA9IG5hdkRvdHMoaW1nQ2Fyb3VzZWwpO1xuXG4gICAgbmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2xkSW5kZXggPSBpbmRleDtcbiAgICAgICAgaWYgKGluZGV4ID09PSBpbWdDYXJvdXNlbC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNldEluZGV4KGluZGV4KTtcbiAgICAgICAgcmVwbGFjZUltZyhvbGRJbmRleCwgaW5kZXgsIG5hdkRvdENvbnRhaW5lciwgd2luZG93KTtcbiAgICB9KTtcblxuICAgIHByZXZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9sZEluZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgaW5kZXggPSBpbWdDYXJvdXNlbC5sZW5ndGggLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBzZXRJbmRleChpbmRleCk7XG4gICAgICAgIHJlcGxhY2VJbWcob2xkSW5kZXgsIGluZGV4LCBuYXZEb3RDb250YWluZXIsIHdpbmRvdyk7XG4gICAgfSk7XG5cbiAgICBuYXZEb3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBhY3RpdmVJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0IG9sZEluZGV4ID0gTnVtYmVyKGFjdGl2ZUltZy5pZCk7XG4gICAgICAgIG5hdkRvdENvbnRhaW5lci5pbm5lclRleHQgPSAnJztcbiAgICAgICAgaW5kZXggPSBOdW1iZXIoZS50YXJnZXQuaWQpO1xuICAgICAgICBzZXRJbmRleChpbmRleCk7XG4gICAgICAgIHJlcGxhY2VJbWcob2xkSW5kZXgsIGluZGV4LCBuYXZEb3RDb250YWluZXIsIHdpbmRvdyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGxheS5jbGFzc05hbWUgPSAnYnV0dG9uJztcbiAgICBwbGF5LmlubmVyVGV4dCA9ICdQbGF5JztcbiAgICBsZXQgaW50ZXJ2YWxJZCA9IDA7XG4gICAgcGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKHBsYXkuaW5uZXJUZXh0ID09PSAnUGxheScpIHtcbiAgICAgICAgICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBhZHZhbmNlU2xpZGUoXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICBpbWdDYXJvdXNlbCxcbiAgICAgICAgICAgICAgICAgICAgbmF2RG90Q29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgICAgICBwbGF5LmlubmVyVGV4dCA9ICdQYXVzZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbGF5LmlubmVyVGV4dCA9ICdQbGF5JztcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHdpbmRvd1dyYXBwZXIuYXBwZW5kQ2hpbGQocHJldkJ1dHRvbik7XG4gICAgd2luZG93V3JhcHBlci5hcHBlbmRDaGlsZCh3aW5kb3cpO1xuICAgIHdpbmRvd1dyYXBwZXIuYXBwZW5kQ2hpbGQobmV4dEJ1dHRvbik7XG4gICAgc2xpZGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHdpbmRvd1dyYXBwZXIpO1xuICAgIHNsaWRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChuYXZEb3RDb250YWluZXIpO1xuICAgIHNsaWRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5KTtcbiAgICByZXR1cm4gc2xpZGVyQ29udGFpbmVyO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIi8vIGltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGZvb3RlciBmcm9tICcuL2Zvb3Rlcic7XG5pbXBvcnQgc2xpZGVyIGZyb20gJy4vc2xpZGVyJztcblxuY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29udGVudC5pZCA9ICdjb250ZW50JztcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5jb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuXG5tYWluLmFwcGVuZENoaWxkKHNsaWRlcigpKTtcbi8vIG1haW4uYXBwZW5kQ2hpbGQobWVudSgpKTtcblxuY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIoKSk7XG5jb250ZW50LmFwcGVuZENoaWxkKG1haW4pO1xuY29udGVudC5hcHBlbmRDaGlsZChmb290ZXIoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=