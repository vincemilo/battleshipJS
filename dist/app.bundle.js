/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/computer.js":
/*!*************************!*\
  !*** ./src/computer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Computer)
/* harmony export */ });
/* harmony import */ var _translateCoords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translateCoords */ "./src/translateCoords.js");
/* harmony import */ var _generateOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateOptions */ "./src/generateOptions.js");
/* harmony import */ var _reverseTranslate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reverseTranslate */ "./src/reverseTranslate.js");




class Computer {
    constructor(gameboard) {
        this.coords = {};
        this.gameboard = gameboard;
        this.prevAttacks = {};
        this.successAttacks = {};
    }

    createCoords() {
        const letter = 'abcdefghij';
        for (let i = 0; i < letter.length; i += 1) {
            for (let j = 1; j < letter.length + 1; j += 1) {
                this.coords[letter[i] + j] = null;
            }
        }
    }

    returnCoords() {
        return this.coords;
    }

    // remove used coords from options
    removeCoords(usedCoords, success = false) {
        if (success) this.successAttacks[usedCoords] = null;
        this.prevAttacks[usedCoords] = null;
        delete this.coords[usedCoords];
        return this.prevAttacks;
    }

    // check if options have already been used
    validateAttack(options) {
        for (let i = 0; i < options.length; i += 1) {
            if (!(options[i] in this.prevAttacks)) return options[i];
        }
        return false;
    }

    checkAdjacent(hitCoords) {
        let adjSquare = '';
        hitCoords.forEach((e) => {
            const translatedCoords = (0,_translateCoords__WEBPACK_IMPORTED_MODULE_0__["default"])(e);
            const options = (0,_generateOptions__WEBPACK_IMPORTED_MODULE_1__["default"])(translatedCoords);
            adjSquare = this.validateAttack(options);
        });
        return (0,_reverseTranslate__WEBPACK_IMPORTED_MODULE_2__["default"])(adjSquare);
    }

    compAttack() {
        const hitCoords = Object.keys(this.successAttacks);
        if (hitCoords.length) return this.checkAdjacent(hitCoords);
        const keys = Object.keys(this.coords);
        return keys[Math.floor(Math.random() * keys.length)];
    }
}


/***/ }),

/***/ "./src/createGrid.js":
/*!***************************!*\
  !*** ./src/createGrid.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createGrid)
/* harmony export */ });
function createGrid() {
    const grid = [];
    const rows = 10;
    const colums = 10;
    const letter = 'abcdefghij';
    for (let i = 0; i < rows; i += 1) {
        grid[i] = [];
        for (let j = 0; j < colums; j += 1) {
            grid[i][j] = { coords: letter[i] + (j + 1), occupied: false };
        }
    }
    return grid;
}


/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _createGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createGrid */ "./src/createGrid.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _translateCoords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translateCoords */ "./src/translateCoords.js");




class Gameboard {
    constructor() {
        this.grid = (0,_createGrid__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.missedAttacks = {};
        this.hitAttacks = {};
        this.shipsSunk = 0;
        this.allSunk = false;
        this.ships = [];
    }

    showGrid() {
        return this.grid;
    }

    checkAllSunk() {
        if (this.shipsSunk === 5) this.allSunk = true;
    }

    placeShips() {
        const ships = [
            {
                name: 'carrier',
                length: 5,
                coords: { a1: null, a2: null, a3: null, a4: null, a5: null },
            },
            {
                name: 'battleship',
                length: 4,
                coords: { b1: null, b2: null, b3: null, b4: null },
            },
            {
                name: 'destroyer',
                length: 3,
                coords: { c1: null, c2: null, c3: null },
            },
            {
                name: 'submarine',
                length: 3,
                coords: { d1: null, d2: null, d3: null },
            },
            {
                name: 'patrol boat',
                length: 2,
                coords: { e1: null, e2: null },
            },
        ];

        ships.forEach((element) => {
            const ship = new _ship__WEBPACK_IMPORTED_MODULE_1__["default"](element.name, element.length, element.coords);
            this.ships.push(ship);
            // takes ship coords and applies them to board
            Object.keys(ship.coords).forEach((e) => this.occupy(e));
        });
    }

    occupy(coords) {
        const translated = (0,_translateCoords__WEBPACK_IMPORTED_MODULE_2__["default"])(coords);
        this.grid[translated[0]][translated[1]].occupied = true;
    }

    receiveAttack(attackCoords) {
        const translated = (0,_translateCoords__WEBPACK_IMPORTED_MODULE_2__["default"])(attackCoords);
        if (this.grid[translated[0]][translated[1]].occupied === false) {
            this.missedAttacks[attackCoords] = null;
        } else {
            for (let i = 0; i < this.ships.length; i += 1) {
                const ship = this.ships[i];
                if (attackCoords in ship.coords) {
                    ship.hit();
                    if (ship.sunk) {
                        this.shipsSunk += 1;
                        this.checkAllSunk();
                    }
                    this.hitAttacks[attackCoords] = null;
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/gameLoop.js":
/*!*************************!*\
  !*** ./src/gameLoop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameLoop)
/* harmony export */ });
function gameLoop(player1, player2) {
    let turn = 0;
    let gameOver = false;
    while (gameOver === false) {
        console.log(player1);
        console.log(player2);
        turn += 1;
        console.log(turn);
        gameOver = true;
    }
}


/***/ }),

/***/ "./src/generateOptions.js":
/*!********************************!*\
  !*** ./src/generateOptions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateOptions)
/* harmony export */ });
function generateOptions(coords) {
    const options = [];
    if (coords[0] - 1 >= 0) {
        options.push([coords[0] - 1, coords[1]]);
    }
    if (coords[0] + 1 <= 10) {
        options.push([coords[0] + 1, coords[1]]);
    }
    if (coords[1] - 1 >= 0) {
        options.push([coords[0], coords[1] - 1]);
    }
    if (coords[1] + 1 <= 10) {
        options.push([coords[0], coords[1] + 1]);
    }
    return options;
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
    const div = document.createElement('div');
    div.className = 'header';
    div.innerText = 'Battleship';
    return div;
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./computer */ "./src/computer.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");



class Player {
    constructor(comp = false, gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"]()) {
        this.gameBoard = gameBoard;
        if (comp) this.comp = new _computer__WEBPACK_IMPORTED_MODULE_0__["default"](gameBoard);
    }

    attack(coords) {
        return coords;
    }
}


/***/ }),

/***/ "./src/reverseTranslate.js":
/*!*********************************!*\
  !*** ./src/reverseTranslate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ reverseTranslate)
/* harmony export */ });
function reverseTranslate(coords) {
    const letter = String.fromCharCode(coords[0] + 97);
    const num = coords[1] + 1;
    return letter + num;
}


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
    constructor(name, length, coords = [], numHits = 0, sunk = false) {
        this.name = name;
        this.length = length;
        this.coords = coords;
        this.numHits = numHits;
        this.sunk = sunk;
    }

    hit() {
        this.numHits += 1;
        this.isSunk();
    }

    isSunk() {
        if (this.numHits === this.length) this.sunk = true;
    }
}


/***/ }),

/***/ "./src/translateCoords.js":
/*!********************************!*\
  !*** ./src/translateCoords.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ translateCoords)
/* harmony export */ });
function translateCoords(coords) {
    const letter = coords[0].charCodeAt() - 97;
    const num = coords[1] - 1;
    return [letter, num];
}


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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameLoop */ "./src/gameLoop.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
// import _ from 'lodash';




const player1 = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]();
const player2 = new _player__WEBPACK_IMPORTED_MODULE_2__["default"](true);
const content = document.createElement('div');
content.id = 'content';
const body = document.querySelector('body');
content.appendChild((0,_header__WEBPACK_IMPORTED_MODULE_1__["default"])());
body.appendChild(content);

const grid = document.createElement('div');

(0,_gameLoop__WEBPACK_IMPORTED_MODULE_0__["default"])(player1, player2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNrQztBQUNKO0FBQ0E7O0FBRTlCLG9CQUFvQiwrQ0FBTTtBQUMxQixvQkFBb0IsK0NBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1EQUFNO0FBQzFCOztBQUVBOztBQUVBLHFEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dlbmVyYXRlT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3JldmVyc2VUcmFuc2xhdGUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdHJhbnNsYXRlQ29vcmRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0cmFuc2xhdGVDb29yZHMgZnJvbSAnLi90cmFuc2xhdGVDb29yZHMnO1xuaW1wb3J0IGdlbmVyYXRlT3B0aW9ucyBmcm9tICcuL2dlbmVyYXRlT3B0aW9ucyc7XG5pbXBvcnQgcmV2ZXJzZVRyYW5zbGF0ZSBmcm9tICcuL3JldmVyc2VUcmFuc2xhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wdXRlciB7XG4gICAgY29uc3RydWN0b3IoZ2FtZWJvYXJkKSB7XG4gICAgICAgIHRoaXMuY29vcmRzID0ge307XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkO1xuICAgICAgICB0aGlzLnByZXZBdHRhY2tzID0ge307XG4gICAgICAgIHRoaXMuc3VjY2Vzc0F0dGFja3MgPSB7fTtcbiAgICB9XG5cbiAgICBjcmVhdGVDb29yZHMoKSB7XG4gICAgICAgIGNvbnN0IGxldHRlciA9ICdhYmNkZWZnaGlqJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXR0ZXIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgbGV0dGVyLmxlbmd0aCArIDE7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzW2xldHRlcltpXSArIGpdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybkNvb3JkcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRzO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSB1c2VkIGNvb3JkcyBmcm9tIG9wdGlvbnNcbiAgICByZW1vdmVDb29yZHModXNlZENvb3Jkcywgc3VjY2VzcyA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChzdWNjZXNzKSB0aGlzLnN1Y2Nlc3NBdHRhY2tzW3VzZWRDb29yZHNdID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2QXR0YWNrc1t1c2VkQ29vcmRzXSA9IG51bGw7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvb3Jkc1t1c2VkQ29vcmRzXTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldkF0dGFja3M7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgb3B0aW9ucyBoYXZlIGFscmVhZHkgYmVlbiB1c2VkXG4gICAgdmFsaWRhdGVBdHRhY2sob3B0aW9ucykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmICghKG9wdGlvbnNbaV0gaW4gdGhpcy5wcmV2QXR0YWNrcykpIHJldHVybiBvcHRpb25zW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjaGVja0FkamFjZW50KGhpdENvb3Jkcykge1xuICAgICAgICBsZXQgYWRqU3F1YXJlID0gJyc7XG4gICAgICAgIGhpdENvb3Jkcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGVkQ29vcmRzID0gdHJhbnNsYXRlQ29vcmRzKGUpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGdlbmVyYXRlT3B0aW9ucyh0cmFuc2xhdGVkQ29vcmRzKTtcbiAgICAgICAgICAgIGFkalNxdWFyZSA9IHRoaXMudmFsaWRhdGVBdHRhY2sob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV2ZXJzZVRyYW5zbGF0ZShhZGpTcXVhcmUpO1xuICAgIH1cblxuICAgIGNvbXBBdHRhY2soKSB7XG4gICAgICAgIGNvbnN0IGhpdENvb3JkcyA9IE9iamVjdC5rZXlzKHRoaXMuc3VjY2Vzc0F0dGFja3MpO1xuICAgICAgICBpZiAoaGl0Q29vcmRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuY2hlY2tBZGphY2VudChoaXRDb29yZHMpO1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jb29yZHMpO1xuICAgICAgICByZXR1cm4ga2V5c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzLmxlbmd0aCldO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuICAgIGNvbnN0IHJvd3MgPSAxMDtcbiAgICBjb25zdCBjb2x1bXMgPSAxMDtcbiAgICBjb25zdCBsZXR0ZXIgPSAnYWJjZGVmZ2hpaic7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpICs9IDEpIHtcbiAgICAgICAgZ3JpZFtpXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtczsgaiArPSAxKSB7XG4gICAgICAgICAgICBncmlkW2ldW2pdID0geyBjb29yZHM6IGxldHRlcltpXSArIChqICsgMSksIG9jY3VwaWVkOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSAnLi9jcmVhdGVHcmlkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgdHJhbnNsYXRlQ29vcmRzIGZyb20gJy4vdHJhbnNsYXRlQ29vcmRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gY3JlYXRlR3JpZCgpO1xuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5oaXRBdHRhY2tzID0ge307XG4gICAgICAgIHRoaXMuc2hpcHNTdW5rID0gMDtcbiAgICAgICAgdGhpcy5hbGxTdW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB9XG5cbiAgICBzaG93R3JpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZDtcbiAgICB9XG5cbiAgICBjaGVja0FsbFN1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBzU3VuayA9PT0gNSkgdGhpcy5hbGxTdW5rID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwbGFjZVNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2FycmllcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA1LFxuICAgICAgICAgICAgICAgIGNvb3JkczogeyBhMTogbnVsbCwgYTI6IG51bGwsIGEzOiBudWxsLCBhNDogbnVsbCwgYTU6IG51bGwgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHsgYjE6IG51bGwsIGIyOiBudWxsLCBiMzogbnVsbCwgYjQ6IG51bGwgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2Rlc3Ryb3llcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAzLFxuICAgICAgICAgICAgICAgIGNvb3JkczogeyBjMTogbnVsbCwgYzI6IG51bGwsIGMzOiBudWxsIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzdWJtYXJpbmUnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMyxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHsgZDE6IG51bGwsIGQyOiBudWxsLCBkMzogbnVsbCB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncGF0cm9sIGJvYXQnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgICAgICAgICBjb29yZHM6IHsgZTE6IG51bGwsIGUyOiBudWxsIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHNoaXBzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChlbGVtZW50Lm5hbWUsIGVsZW1lbnQubGVuZ3RoLCBlbGVtZW50LmNvb3Jkcyk7XG4gICAgICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgICAgICAvLyB0YWtlcyBzaGlwIGNvb3JkcyBhbmQgYXBwbGllcyB0aGVtIHRvIGJvYXJkXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzaGlwLmNvb3JkcykuZm9yRWFjaCgoZSkgPT4gdGhpcy5vY2N1cHkoZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvY2N1cHkoY29vcmRzKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWQgPSB0cmFuc2xhdGVDb29yZHMoY29vcmRzKTtcbiAgICAgICAgdGhpcy5ncmlkW3RyYW5zbGF0ZWRbMF1dW3RyYW5zbGF0ZWRbMV1dLm9jY3VwaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3Jkcykge1xuICAgICAgICBjb25zdCB0cmFuc2xhdGVkID0gdHJhbnNsYXRlQ29vcmRzKGF0dGFja0Nvb3Jkcyk7XG4gICAgICAgIGlmICh0aGlzLmdyaWRbdHJhbnNsYXRlZFswXV1bdHJhbnNsYXRlZFsxXV0ub2NjdXBpZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3NbYXR0YWNrQ29vcmRzXSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrQ29vcmRzIGluIHNoaXAuY29vcmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXAuaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwLnN1bmspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcHNTdW5rICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQWxsU3VuaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGl0QXR0YWNrc1thdHRhY2tDb29yZHNdID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lTG9vcChwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgbGV0IHR1cm4gPSAwO1xuICAgIGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuICAgIHdoaWxlIChnYW1lT3ZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllcjIpO1xuICAgICAgICB0dXJuICs9IDE7XG4gICAgICAgIGNvbnNvbGUubG9nKHR1cm4pO1xuICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVPcHRpb25zKGNvb3Jkcykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBpZiAoY29vcmRzWzBdIC0gMSA+PSAwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdIC0gMSwgY29vcmRzWzFdXSk7XG4gICAgfVxuICAgIGlmIChjb29yZHNbMF0gKyAxIDw9IDEwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdICsgMSwgY29vcmRzWzFdXSk7XG4gICAgfVxuICAgIGlmIChjb29yZHNbMV0gLSAxID49IDApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSAtIDFdKTtcbiAgICB9XG4gICAgaWYgKGNvb3Jkc1sxXSArIDEgPD0gMTApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSArIDFdKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoZWFkZXIoKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSA9ICdoZWFkZXInO1xuICAgIGRpdi5pbm5lclRleHQgPSAnQmF0dGxlc2hpcCc7XG4gICAgcmV0dXJuIGRpdjtcbn1cbiIsImltcG9ydCBDb21wdXRlciBmcm9tICcuL2NvbXB1dGVyJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lQm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbXAgPSBmYWxzZSwgZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpKSB7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkO1xuICAgICAgICBpZiAoY29tcCkgdGhpcy5jb21wID0gbmV3IENvbXB1dGVyKGdhbWVCb2FyZCk7XG4gICAgfVxuXG4gICAgYXR0YWNrKGNvb3Jkcykge1xuICAgICAgICByZXR1cm4gY29vcmRzO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJldmVyc2VUcmFuc2xhdGUoY29vcmRzKSB7XG4gICAgY29uc3QgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb29yZHNbMF0gKyA5Nyk7XG4gICAgY29uc3QgbnVtID0gY29vcmRzWzFdICsgMTtcbiAgICByZXR1cm4gbGV0dGVyICsgbnVtO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoLCBjb29yZHMgPSBbXSwgbnVtSGl0cyA9IDAsIHN1bmsgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBjb29yZHM7XG4gICAgICAgIHRoaXMubnVtSGl0cyA9IG51bUhpdHM7XG4gICAgICAgIHRoaXMuc3VuayA9IHN1bms7XG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLm51bUhpdHMgKz0gMTtcbiAgICAgICAgdGhpcy5pc1N1bmsoKTtcbiAgICB9XG5cbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLm51bUhpdHMgPT09IHRoaXMubGVuZ3RoKSB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zbGF0ZUNvb3Jkcyhjb29yZHMpIHtcbiAgICBjb25zdCBsZXR0ZXIgPSBjb29yZHNbMF0uY2hhckNvZGVBdCgpIC0gOTc7XG4gICAgY29uc3QgbnVtID0gY29vcmRzWzFdIC0gMTtcbiAgICByZXR1cm4gW2xldHRlciwgbnVtXTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBnYW1lTG9vcCBmcm9tICcuL2dhbWVMb29wJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5cbmNvbnN0IHBsYXllcjEgPSBuZXcgUGxheWVyKCk7XG5jb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcih0cnVlKTtcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnRlbnQuaWQgPSAnY29udGVudCc7XG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIoKSk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG5jb25zdCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmdhbWVMb29wKHBsYXllcjEsIHBsYXllcjIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9