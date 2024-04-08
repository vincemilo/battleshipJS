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
            grid[i][j] = {
                name: letter[i] + (j + 1),
                coords: [i, j],
                occupied: false,
            };
        }
    }
    return grid;
}


/***/ }),

/***/ "./src/enemyGrid.js":
/*!**************************!*\
  !*** ./src/enemyGrid.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ enemyGrid)
/* harmony export */ });
function enemyGrid(grid) {
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
    player2.gameBoard.placeShips();
    while (gameOver === false) {
        turn += 1;
        gameOver = true;
    }
    return { player1, player2, turn };
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
    const div = document.createElement('header');
    div.innerText = 'Battleship';
    return div;
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _enemyGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemyGrid */ "./src/enemyGrid.js");


function main(p2Grid, p1Grid) {
    const mainDiv = document.createElement('main');
    const eGrid = (0,_enemyGrid__WEBPACK_IMPORTED_MODULE_0__["default"])(p2Grid);
    // const pGrid = playerGrid(p1Grid);
    mainDiv.appendChild(eGrid);
    return mainDiv;
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

    attack(cell) {
        if (cell.occupied === false) {
            this.gameBoard.missedAttacks[cell.name] = null;
        } else {
            this.gameBoard.hitAttacks[cell.name] = null;
            // const shipArr = this.gameBoard.ships;
            // for (let i = 0; i < shipArr.length; i += 1) {

            //     const ship = this.ships[i];
            //     if (attackCoords in ship.coords) {
            //         ship.hit();
            //         if (ship.sunk) {
            //             this.shipsSunk += 1;
            //             this.checkAllSunk();
            //         }

            //     }
            // }
        }
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
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main */ "./src/main.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
// import _ from 'lodash';






const player1 = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]();
const player2 = new _player__WEBPACK_IMPORTED_MODULE_2__["default"](true);
const content = document.createElement('div');
content.id = 'content';
const body = document.querySelector('body');
content.appendChild((0,_header__WEBPACK_IMPORTED_MODULE_1__["default"])());
content.appendChild((0,_main__WEBPACK_IMPORTED_MODULE_3__["default"])(player2.gameBoard.grid, player2.gameBoard.grid));
body.appendChild(content);

(0,_gameLoop__WEBPACK_IMPORTED_MODULE_0__["default"])(player1, player2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDakJlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ2tDO0FBQ0o7QUFDQTtBQUNKO0FBQ0w7O0FBRXJCLG9CQUFvQiwrQ0FBTTtBQUMxQixvQkFBb0IsK0NBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1EQUFNO0FBQzFCLG9CQUFvQixpREFBSTtBQUN4Qjs7QUFFQSxxREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZW5lbXlHcmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZW5lcmF0ZU9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcmV2ZXJzZVRyYW5zbGF0ZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy90cmFuc2xhdGVDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRyYW5zbGF0ZUNvb3JkcyBmcm9tICcuL3RyYW5zbGF0ZUNvb3Jkcyc7XG5pbXBvcnQgZ2VuZXJhdGVPcHRpb25zIGZyb20gJy4vZ2VuZXJhdGVPcHRpb25zJztcbmltcG9ydCByZXZlcnNlVHJhbnNsYXRlIGZyb20gJy4vcmV2ZXJzZVRyYW5zbGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXB1dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lYm9hcmQpIHtcbiAgICAgICAgdGhpcy5jb29yZHMgPSB7fTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gICAgICAgIHRoaXMucHJldkF0dGFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5zdWNjZXNzQXR0YWNrcyA9IHt9O1xuICAgIH1cblxuICAgIGNyZWF0ZUNvb3JkcygpIHtcbiAgICAgICAgY29uc3QgbGV0dGVyID0gJ2FiY2RlZmdoaWonO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxldHRlci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBsZXR0ZXIubGVuZ3RoICsgMTsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZHNbbGV0dGVyW2ldICsgal0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuQ29vcmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb29yZHM7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIHVzZWQgY29vcmRzIGZyb20gb3B0aW9uc1xuICAgIHJlbW92ZUNvb3Jkcyh1c2VkQ29vcmRzLCBzdWNjZXNzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHRoaXMuc3VjY2Vzc0F0dGFja3NbdXNlZENvb3Jkc10gPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZBdHRhY2tzW3VzZWRDb29yZHNdID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIHRoaXMuY29vcmRzW3VzZWRDb29yZHNdO1xuICAgICAgICByZXR1cm4gdGhpcy5wcmV2QXR0YWNrcztcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiBvcHRpb25zIGhhdmUgYWxyZWFkeSBiZWVuIHVzZWRcbiAgICB2YWxpZGF0ZUF0dGFjayhvcHRpb25zKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKCEob3B0aW9uc1tpXSBpbiB0aGlzLnByZXZBdHRhY2tzKSkgcmV0dXJuIG9wdGlvbnNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNoZWNrQWRqYWNlbnQoaGl0Q29vcmRzKSB7XG4gICAgICAgIGxldCBhZGpTcXVhcmUgPSAnJztcbiAgICAgICAgaGl0Q29vcmRzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZWRDb29yZHMgPSB0cmFuc2xhdGVDb29yZHMoZSk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gZ2VuZXJhdGVPcHRpb25zKHRyYW5zbGF0ZWRDb29yZHMpO1xuICAgICAgICAgICAgYWRqU3F1YXJlID0gdGhpcy52YWxpZGF0ZUF0dGFjayhvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXZlcnNlVHJhbnNsYXRlKGFkalNxdWFyZSk7XG4gICAgfVxuXG4gICAgY29tcEF0dGFjaygpIHtcbiAgICAgICAgY29uc3QgaGl0Q29vcmRzID0gT2JqZWN0LmtleXModGhpcy5zdWNjZXNzQXR0YWNrcyk7XG4gICAgICAgIGlmIChoaXRDb29yZHMubGVuZ3RoKSByZXR1cm4gdGhpcy5jaGVja0FkamFjZW50KGhpdENvb3Jkcyk7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvb3Jkcyk7XG4gICAgICAgIHJldHVybiBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV07XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcbiAgICBjb25zdCBncmlkID0gW107XG4gICAgY29uc3Qgcm93cyA9IDEwO1xuICAgIGNvbnN0IGNvbHVtcyA9IDEwO1xuICAgIGNvbnN0IGxldHRlciA9ICdhYmNkZWZnaGlqJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkgKz0gMSkge1xuICAgICAgICBncmlkW2ldID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1zOyBqICs9IDEpIHtcbiAgICAgICAgICAgIGdyaWRbaV1bal0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogbGV0dGVyW2ldICsgKGogKyAxKSxcbiAgICAgICAgICAgICAgICBjb29yZHM6IFtpLCBqXSxcbiAgICAgICAgICAgICAgICBvY2N1cGllZDogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5lbXlHcmlkKGdyaWQpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gJ2VuZW15LWdyaWQnO1xuICAgIGdyaWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuICAgICAgICAgICAgY2VsbC5pZCA9IGUubmFtZTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjb25zb2xlLmxvZyhlKSk7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkaXY7XG59XG4iLCJpbXBvcnQgY3JlYXRlR3JpZCBmcm9tICcuL2NyZWF0ZUdyaWQnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcbmltcG9ydCB0cmFuc2xhdGVDb29yZHMgZnJvbSAnLi90cmFuc2xhdGVDb29yZHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdyaWQgPSBjcmVhdGVHcmlkKCk7XG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IHt9O1xuICAgICAgICB0aGlzLmhpdEF0dGFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5zaGlwc1N1bmsgPSAwO1xuICAgICAgICB0aGlzLmFsbFN1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgIH1cblxuICAgIHNob3dHcmlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ncmlkO1xuICAgIH1cblxuICAgIGNoZWNrQWxsU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNTdW5rID09PSA1KSB0aGlzLmFsbFN1bmsgPSB0cnVlO1xuICAgIH1cblxuICAgIHBsYWNlU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdjYXJyaWVyJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDUsXG4gICAgICAgICAgICAgICAgY29vcmRzOiB7IGExOiBudWxsLCBhMjogbnVsbCwgYTM6IG51bGwsIGE0OiBudWxsLCBhNTogbnVsbCB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmF0dGxlc2hpcCcsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA0LFxuICAgICAgICAgICAgICAgIGNvb3JkczogeyBiMTogbnVsbCwgYjI6IG51bGwsIGIzOiBudWxsLCBiNDogbnVsbCB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZGVzdHJveWVyJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgICAgICAgY29vcmRzOiB7IGMxOiBudWxsLCBjMjogbnVsbCwgYzM6IG51bGwgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3N1Ym1hcmluZScsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAzLFxuICAgICAgICAgICAgICAgIGNvb3JkczogeyBkMTogbnVsbCwgZDI6IG51bGwsIGQzOiBudWxsIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdwYXRyb2wgYm9hdCcsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAyLFxuICAgICAgICAgICAgICAgIGNvb3JkczogeyBlMTogbnVsbCwgZTI6IG51bGwgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgc2hpcHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGVsZW1lbnQubmFtZSwgZWxlbWVudC5sZW5ndGgsIGVsZW1lbnQuY29vcmRzKTtcbiAgICAgICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgICAgICAgICAgIC8vIHRha2VzIHNoaXAgY29vcmRzIGFuZCBhcHBsaWVzIHRoZW0gdG8gYm9hcmRcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHNoaXAuY29vcmRzKS5mb3JFYWNoKChlKSA9PiB0aGlzLm9jY3VweShlKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9jY3VweShjb29yZHMpIHtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlZCA9IHRyYW5zbGF0ZUNvb3Jkcyhjb29yZHMpO1xuICAgICAgICB0aGlzLmdyaWRbdHJhbnNsYXRlZFswXV1bdHJhbnNsYXRlZFsxXV0ub2NjdXBpZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmRzKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWQgPSB0cmFuc2xhdGVDb29yZHMoYXR0YWNrQ29vcmRzKTtcbiAgICAgICAgaWYgKHRoaXMuZ3JpZFt0cmFuc2xhdGVkWzBdXVt0cmFuc2xhdGVkWzFdXS5vY2N1cGllZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMubWlzc2VkQXR0YWNrc1thdHRhY2tDb29yZHNdID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tDb29yZHMgaW4gc2hpcC5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXAuc3Vuaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwc1N1bmsgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdW5rKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXRBdHRhY2tzW2F0dGFja0Nvb3Jkc10gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdhbWVMb29wKHBsYXllcjEsIHBsYXllcjIpIHtcbiAgICBsZXQgdHVybiA9IDA7XG4gICAgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG4gICAgcGxheWVyMi5nYW1lQm9hcmQucGxhY2VTaGlwcygpO1xuICAgIHdoaWxlIChnYW1lT3ZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgdHVybiArPSAxO1xuICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7IHBsYXllcjEsIHBsYXllcjIsIHR1cm4gfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlT3B0aW9ucyhjb29yZHMpIHtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgaWYgKGNvb3Jkc1swXSAtIDEgPj0gMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSAtIDEsIGNvb3Jkc1sxXV0pO1xuICAgIH1cbiAgICBpZiAoY29vcmRzWzBdICsgMSA8PSAxMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSArIDEsIGNvb3Jkc1sxXV0pO1xuICAgIH1cbiAgICBpZiAoY29vcmRzWzFdIC0gMSA+PSAwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gLSAxXSk7XG4gICAgfVxuICAgIGlmIChjb29yZHNbMV0gKyAxIDw9IDEwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gKyAxXSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVhZGVyKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGRpdi5pbm5lclRleHQgPSAnQmF0dGxlc2hpcCc7XG4gICAgcmV0dXJuIGRpdjtcbn1cbiIsImltcG9ydCBlbmVteUdyaWQgZnJvbSAnLi9lbmVteUdyaWQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWluKHAyR3JpZCwgcDFHcmlkKSB7XG4gICAgY29uc3QgbWFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgICBjb25zdCBlR3JpZCA9IGVuZW15R3JpZChwMkdyaWQpO1xuICAgIC8vIGNvbnN0IHBHcmlkID0gcGxheWVyR3JpZChwMUdyaWQpO1xuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQoZUdyaWQpO1xuICAgIHJldHVybiBtYWluRGl2O1xufVxuIiwiaW1wb3J0IENvbXB1dGVyIGZyb20gJy4vY29tcHV0ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVCb2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoY29tcCA9IGZhbHNlLCBnYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCkpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBnYW1lQm9hcmQ7XG4gICAgICAgIGlmIChjb21wKSB0aGlzLmNvbXAgPSBuZXcgQ29tcHV0ZXIoZ2FtZUJvYXJkKTtcbiAgICB9XG5cbiAgICBhdHRhY2soY2VsbCkge1xuICAgICAgICBpZiAoY2VsbC5vY2N1cGllZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3NbY2VsbC5uYW1lXSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVCb2FyZC5oaXRBdHRhY2tzW2NlbGwubmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgLy8gY29uc3Qgc2hpcEFyciA9IHRoaXMuZ2FtZUJvYXJkLnNoaXBzO1xuICAgICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwQXJyLmxlbmd0aDsgaSArPSAxKSB7XG5cbiAgICAgICAgICAgIC8vICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tpXTtcbiAgICAgICAgICAgIC8vICAgICBpZiAoYXR0YWNrQ29vcmRzIGluIHNoaXAuY29vcmRzKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHNoaXAuaGl0KCk7XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChzaGlwLnN1bmspIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hpcHNTdW5rICs9IDE7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmNoZWNrQWxsU3VuaygpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXZlcnNlVHJhbnNsYXRlKGNvb3Jkcykge1xuICAgIGNvbnN0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29vcmRzWzBdICsgOTcpO1xuICAgIGNvbnN0IG51bSA9IGNvb3Jkc1sxXSArIDE7XG4gICAgcmV0dXJuIGxldHRlciArIG51bTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCwgY29vcmRzID0gW10sIG51bUhpdHMgPSAwLCBzdW5rID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuY29vcmRzID0gY29vcmRzO1xuICAgICAgICB0aGlzLm51bUhpdHMgPSBudW1IaXRzO1xuICAgICAgICB0aGlzLnN1bmsgPSBzdW5rO1xuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5udW1IaXRzICs9IDE7XG4gICAgICAgIHRoaXMuaXNTdW5rKCk7XG4gICAgfVxuXG4gICAgaXNTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5udW1IaXRzID09PSB0aGlzLmxlbmd0aCkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2xhdGVDb29yZHMoY29vcmRzKSB7XG4gICAgY29uc3QgbGV0dGVyID0gY29vcmRzWzBdLmNoYXJDb2RlQXQoKSAtIDk3O1xuICAgIGNvbnN0IG51bSA9IGNvb3Jkc1sxXSAtIDE7XG4gICAgcmV0dXJuIFtsZXR0ZXIsIG51bV07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZ2FtZUxvb3AgZnJvbSAnLi9nYW1lTG9vcCc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IG1haW4gZnJvbSAnLi9tYWluJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5jb25zdCBwbGF5ZXIxID0gbmV3IFBsYXllcigpO1xuY29uc3QgcGxheWVyMiA9IG5ldyBQbGF5ZXIodHJ1ZSk7XG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb250ZW50LmlkID0gJ2NvbnRlbnQnO1xuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbmNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKCkpO1xuY29udGVudC5hcHBlbmRDaGlsZChtYWluKHBsYXllcjIuZ2FtZUJvYXJkLmdyaWQsIHBsYXllcjIuZ2FtZUJvYXJkLmdyaWQpKTtcbmJvZHkuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbmdhbWVMb29wKHBsYXllcjEsIHBsYXllcjIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9