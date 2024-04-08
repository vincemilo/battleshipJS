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
        this.shipsSunk = '';
        this.allSunk = false;
        this.ships = [];
    }

    resetShipsSunk() {
        this.shipsSunk = '';
    }

    showGrid() {
        return this.grid;
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
        for (let i = 0; i < this.ships.length; i += 1) {
            const ship = this.ships[i];
            if (attackCoords in ship.coords) {
                ship.hit();
                if (ship.sunk) {
                    this.shipsSunk = ship.name;
                    if (this.shipsSunk.length === 5) this.allSunk = true;
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
    return turn;
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
/* harmony import */ var _player2grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player2grid */ "./src/player2grid.js");


function main(player1, player2) {
    const mainDiv = document.createElement('main');
    const p2Grid = (0,_player2grid__WEBPACK_IMPORTED_MODULE_0__["default"])(player1, player2);
    mainDiv.appendChild(p2Grid);
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
            return false;
        }
        this.gameBoard.hitAttacks[cell.name] = null;
        return true;
    }
}


/***/ }),

/***/ "./src/player2grid.js":
/*!****************************!*\
  !*** ./src/player2grid.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ player2grid)
/* harmony export */ });
function player2grid(player1, player2) {
    const container = document.createElement('div');
    const p2grid = player2.gameBoard.grid;
    const div = document.createElement('div');
    div.className = 'player2-grid';
    const status = document.createElement('div');
    status.className = 'status';
    status.innerText = 'Click location to attack';
    p2grid.forEach((element) => {
        element.forEach((e) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = e.name;
            cell.addEventListener('click', () => {
                if (player1.attack(e)) {
                    player2.gameBoard.receiveAttack(e.name);
                    cell.style.backgroundColor = 'red';
                    status.innerText = 'Hit!';
                    const sunk = player2.gameBoard.shipsSunk;
                    if (sunk) {
                        status.innerText = `You sunk their ${sunk}!`;
                        player2.gameBoard.resetShipsSunk();
                    }
                    if (player2.gameBoard.allSunk) console.log('game over');
                } else {
                    status.innerText = 'Miss!';
                    cell.style.backgroundColor = 'white';
                }
            });
            div.appendChild(cell);
        });
    });
    container.appendChild(div);
    container.appendChild(status);
    return container;
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
content.appendChild((0,_main__WEBPACK_IMPORTED_MODULE_3__["default"])(player1, player2));
body.appendChild(content);

(0,_gameLoop__WEBPACK_IMPORTED_MODULE_0__["default"])(player1, player2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNiZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNrQztBQUNKO0FBQ0E7QUFDSjtBQUNMOztBQUVyQixvQkFBb0IsK0NBQU07QUFDMUIsb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtREFBTTtBQUMxQixvQkFBb0IsaURBQUk7QUFDeEI7O0FBRUEscURBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3JlYXRlR3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2VuZXJhdGVPcHRpb25zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVhZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcjJncmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcmV2ZXJzZVRyYW5zbGF0ZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy90cmFuc2xhdGVDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRyYW5zbGF0ZUNvb3JkcyBmcm9tICcuL3RyYW5zbGF0ZUNvb3Jkcyc7XG5pbXBvcnQgZ2VuZXJhdGVPcHRpb25zIGZyb20gJy4vZ2VuZXJhdGVPcHRpb25zJztcbmltcG9ydCByZXZlcnNlVHJhbnNsYXRlIGZyb20gJy4vcmV2ZXJzZVRyYW5zbGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXB1dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lYm9hcmQpIHtcbiAgICAgICAgdGhpcy5jb29yZHMgPSB7fTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gICAgICAgIHRoaXMucHJldkF0dGFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5zdWNjZXNzQXR0YWNrcyA9IHt9O1xuICAgIH1cblxuICAgIGNyZWF0ZUNvb3JkcygpIHtcbiAgICAgICAgY29uc3QgbGV0dGVyID0gJ2FiY2RlZmdoaWonO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxldHRlci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBsZXR0ZXIubGVuZ3RoICsgMTsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZHNbbGV0dGVyW2ldICsgal0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuQ29vcmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb29yZHM7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIHVzZWQgY29vcmRzIGZyb20gb3B0aW9uc1xuICAgIHJlbW92ZUNvb3Jkcyh1c2VkQ29vcmRzLCBzdWNjZXNzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHRoaXMuc3VjY2Vzc0F0dGFja3NbdXNlZENvb3Jkc10gPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZBdHRhY2tzW3VzZWRDb29yZHNdID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIHRoaXMuY29vcmRzW3VzZWRDb29yZHNdO1xuICAgICAgICByZXR1cm4gdGhpcy5wcmV2QXR0YWNrcztcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiBvcHRpb25zIGhhdmUgYWxyZWFkeSBiZWVuIHVzZWRcbiAgICB2YWxpZGF0ZUF0dGFjayhvcHRpb25zKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKCEob3B0aW9uc1tpXSBpbiB0aGlzLnByZXZBdHRhY2tzKSkgcmV0dXJuIG9wdGlvbnNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNoZWNrQWRqYWNlbnQoaGl0Q29vcmRzKSB7XG4gICAgICAgIGxldCBhZGpTcXVhcmUgPSAnJztcbiAgICAgICAgaGl0Q29vcmRzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZWRDb29yZHMgPSB0cmFuc2xhdGVDb29yZHMoZSk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gZ2VuZXJhdGVPcHRpb25zKHRyYW5zbGF0ZWRDb29yZHMpO1xuICAgICAgICAgICAgYWRqU3F1YXJlID0gdGhpcy52YWxpZGF0ZUF0dGFjayhvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXZlcnNlVHJhbnNsYXRlKGFkalNxdWFyZSk7XG4gICAgfVxuXG4gICAgY29tcEF0dGFjaygpIHtcbiAgICAgICAgY29uc3QgaGl0Q29vcmRzID0gT2JqZWN0LmtleXModGhpcy5zdWNjZXNzQXR0YWNrcyk7XG4gICAgICAgIGlmIChoaXRDb29yZHMubGVuZ3RoKSByZXR1cm4gdGhpcy5jaGVja0FkamFjZW50KGhpdENvb3Jkcyk7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvb3Jkcyk7XG4gICAgICAgIHJldHVybiBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV07XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcbiAgICBjb25zdCBncmlkID0gW107XG4gICAgY29uc3Qgcm93cyA9IDEwO1xuICAgIGNvbnN0IGNvbHVtcyA9IDEwO1xuICAgIGNvbnN0IGxldHRlciA9ICdhYmNkZWZnaGlqJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkgKz0gMSkge1xuICAgICAgICBncmlkW2ldID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1zOyBqICs9IDEpIHtcbiAgICAgICAgICAgIGdyaWRbaV1bal0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogbGV0dGVyW2ldICsgKGogKyAxKSxcbiAgICAgICAgICAgICAgICBjb29yZHM6IFtpLCBqXSxcbiAgICAgICAgICAgICAgICBvY2N1cGllZDogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSAnLi9jcmVhdGVHcmlkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgdHJhbnNsYXRlQ29vcmRzIGZyb20gJy4vdHJhbnNsYXRlQ29vcmRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gY3JlYXRlR3JpZCgpO1xuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5oaXRBdHRhY2tzID0ge307XG4gICAgICAgIHRoaXMuc2hpcHNTdW5rID0gJyc7XG4gICAgICAgIHRoaXMuYWxsU3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNoaXBzID0gW107XG4gICAgfVxuXG4gICAgcmVzZXRTaGlwc1N1bmsoKSB7XG4gICAgICAgIHRoaXMuc2hpcHNTdW5rID0gJyc7XG4gICAgfVxuXG4gICAgc2hvd0dyaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWQ7XG4gICAgfVxuXG4gICAgcGxhY2VTaGlwcygpIHtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2NhcnJpZXInLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogNSxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHsgYTE6IG51bGwsIGEyOiBudWxsLCBhMzogbnVsbCwgYTQ6IG51bGwsIGE1OiBudWxsIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdiYXR0bGVzaGlwJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgICAgICAgICAgY29vcmRzOiB7IGIxOiBudWxsLCBiMjogbnVsbCwgYjM6IG51bGwsIGI0OiBudWxsIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdkZXN0cm95ZXInLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMyxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHsgYzE6IG51bGwsIGMyOiBudWxsLCBjMzogbnVsbCB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3VibWFyaW5lJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgICAgICAgY29vcmRzOiB7IGQxOiBudWxsLCBkMjogbnVsbCwgZDM6IG51bGwgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3BhdHJvbCBib2F0JyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDIsXG4gICAgICAgICAgICAgICAgY29vcmRzOiB7IGUxOiBudWxsLCBlMjogbnVsbCB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBzaGlwcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoZWxlbWVudC5uYW1lLCBlbGVtZW50Lmxlbmd0aCwgZWxlbWVudC5jb29yZHMpO1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICAgICAgLy8gdGFrZXMgc2hpcCBjb29yZHMgYW5kIGFwcGxpZXMgdGhlbSB0byBib2FyZFxuICAgICAgICAgICAgT2JqZWN0LmtleXMoc2hpcC5jb29yZHMpLmZvckVhY2goKGUpID0+IHRoaXMub2NjdXB5KGUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb2NjdXB5KGNvb3Jkcykge1xuICAgICAgICBjb25zdCB0cmFuc2xhdGVkID0gdHJhbnNsYXRlQ29vcmRzKGNvb3Jkcyk7XG4gICAgICAgIHRoaXMuZ3JpZFt0cmFuc2xhdGVkWzBdXVt0cmFuc2xhdGVkWzFdXS5vY2N1cGllZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tpXTtcbiAgICAgICAgICAgIGlmIChhdHRhY2tDb29yZHMgaW4gc2hpcC5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICBzaGlwLmhpdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzaGlwLnN1bmspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwc1N1bmsgPSBzaGlwLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaXBzU3Vuay5sZW5ndGggPT09IDUpIHRoaXMuYWxsU3VuayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZUxvb3AocGxheWVyMSwgcGxheWVyMikge1xuICAgIGxldCB0dXJuID0gMDtcbiAgICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICBwbGF5ZXIyLmdhbWVCb2FyZC5wbGFjZVNoaXBzKCk7XG4gICAgd2hpbGUgKGdhbWVPdmVyID09PSBmYWxzZSkge1xuICAgICAgICB0dXJuICs9IDE7XG4gICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHR1cm47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZU9wdGlvbnMoY29vcmRzKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGlmIChjb29yZHNbMF0gLSAxID49IDApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gLSAxLCBjb29yZHNbMV1dKTtcbiAgICB9XG4gICAgaWYgKGNvb3Jkc1swXSArIDEgPD0gMTApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gKyAxLCBjb29yZHNbMV1dKTtcbiAgICB9XG4gICAgaWYgKGNvb3Jkc1sxXSAtIDEgPj0gMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gMV0pO1xuICAgIH1cbiAgICBpZiAoY29vcmRzWzFdICsgMSA8PSAxMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgMV0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBkaXYuaW5uZXJUZXh0ID0gJ0JhdHRsZXNoaXAnO1xuICAgIHJldHVybiBkaXY7XG59XG4iLCJpbXBvcnQgcGxheWVyMmdyaWQgZnJvbSAnLi9wbGF5ZXIyZ3JpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1haW4ocGxheWVyMSwgcGxheWVyMikge1xuICAgIGNvbnN0IG1haW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XG4gICAgY29uc3QgcDJHcmlkID0gcGxheWVyMmdyaWQocGxheWVyMSwgcGxheWVyMik7XG4gICAgbWFpbkRpdi5hcHBlbmRDaGlsZChwMkdyaWQpO1xuICAgIHJldHVybiBtYWluRGl2O1xufVxuIiwiaW1wb3J0IENvbXB1dGVyIGZyb20gJy4vY29tcHV0ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVCb2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoY29tcCA9IGZhbHNlLCBnYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCkpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBnYW1lQm9hcmQ7XG4gICAgICAgIGlmIChjb21wKSB0aGlzLmNvbXAgPSBuZXcgQ29tcHV0ZXIoZ2FtZUJvYXJkKTtcbiAgICB9XG5cbiAgICBhdHRhY2soY2VsbCkge1xuICAgICAgICBpZiAoY2VsbC5vY2N1cGllZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3NbY2VsbC5uYW1lXSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lQm9hcmQuaGl0QXR0YWNrc1tjZWxsLm5hbWVdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxheWVyMmdyaWQocGxheWVyMSwgcGxheWVyMikge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHAyZ3JpZCA9IHBsYXllcjIuZ2FtZUJvYXJkLmdyaWQ7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSA9ICdwbGF5ZXIyLWdyaWQnO1xuICAgIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHN0YXR1cy5jbGFzc05hbWUgPSAnc3RhdHVzJztcbiAgICBzdGF0dXMuaW5uZXJUZXh0ID0gJ0NsaWNrIGxvY2F0aW9uIHRvIGF0dGFjayc7XG4gICAgcDJncmlkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgICAgIGNlbGwuaWQgPSBlLm5hbWU7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIxLmF0dGFjayhlKSkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIyLmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cy5pbm5lclRleHQgPSAnSGl0ISc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bmsgPSBwbGF5ZXIyLmdhbWVCb2FyZC5zaGlwc1N1bms7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW5rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gYFlvdSBzdW5rIHRoZWlyICR7c3Vua30hYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcjIuZ2FtZUJvYXJkLnJlc2V0U2hpcHNTdW5rKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllcjIuZ2FtZUJvYXJkLmFsbFN1bmspIGNvbnNvbGUubG9nKCdnYW1lIG92ZXInKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gJ01pc3MhJztcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdHVzKTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV2ZXJzZVRyYW5zbGF0ZShjb29yZHMpIHtcbiAgICBjb25zdCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvb3Jkc1swXSArIDk3KTtcbiAgICBjb25zdCBudW0gPSBjb29yZHNbMV0gKyAxO1xuICAgIHJldHVybiBsZXR0ZXIgKyBudW07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgsIGNvb3JkcyA9IFtdLCBudW1IaXRzID0gMCwgc3VuayA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IGNvb3JkcztcbiAgICAgICAgdGhpcy5udW1IaXRzID0gbnVtSGl0cztcbiAgICAgICAgdGhpcy5zdW5rID0gc3VuaztcbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMubnVtSGl0cyArPSAxO1xuICAgICAgICBpZiAodGhpcy5udW1IaXRzID09PSB0aGlzLmxlbmd0aCkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2xhdGVDb29yZHMoY29vcmRzKSB7XG4gICAgY29uc3QgbGV0dGVyID0gY29vcmRzWzBdLmNoYXJDb2RlQXQoKSAtIDk3O1xuICAgIGNvbnN0IG51bSA9IGNvb3Jkc1sxXSAtIDE7XG4gICAgcmV0dXJuIFtsZXR0ZXIsIG51bV07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZ2FtZUxvb3AgZnJvbSAnLi9nYW1lTG9vcCc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IG1haW4gZnJvbSAnLi9tYWluJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5jb25zdCBwbGF5ZXIxID0gbmV3IFBsYXllcigpO1xuY29uc3QgcGxheWVyMiA9IG5ldyBQbGF5ZXIodHJ1ZSk7XG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb250ZW50LmlkID0gJ2NvbnRlbnQnO1xuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbmNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKCkpO1xuY29udGVudC5hcHBlbmRDaGlsZChtYWluKHBsYXllcjEsIHBsYXllcjIpKTtcbmJvZHkuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbmdhbWVMb29wKHBsYXllcjEsIHBsYXllcjIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9