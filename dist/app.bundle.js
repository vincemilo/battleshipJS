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

/***/ "./src/attack.js":
/*!***********************!*\
  !*** ./src/attack.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ attack)
/* harmony export */ });
// import endTurn from './endTurn';

// takes a clicked cell and updates the board and status bar accordingly as well as ends the turn
function attack(player1, player2, e) {
    // console.log(player1.comp);
    const status = document.querySelector('.status');
    let cell = '';
    if (player1.comp) {
        cell = document.getElementById(e.coords);
    } else {
        cell = document.getElementById(e.name);
    }
    if (player1.attack(e) === 2) {
        player2.gameBoard.receiveAttack(e.name);
        cell.style.backgroundColor = 'red';
        status.innerText = 'Hit!';
        const sunk = player2.gameBoard.latestSunk;
        if (sunk.length) {
            status.innerText = `You sunk their ${sunk}!`;
            player2.gameBoard.resetShipsSunk();
        }
        if (player2.gameBoard.allSunk) {
            status.innerText += ' Game over!';
        }
    } else if (player1.attack(e) === 1) {
        status.innerText = 'Already attacked! Miss!';
    } else {
        status.innerText = 'Miss!';
        cell.style.backgroundColor = 'white';
    }

    // endTurn(player1, player2);
}


/***/ }),

/***/ "./src/checkAdjacent.js":
/*!******************************!*\
  !*** ./src/checkAdjacent.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkAdjacent)
/* harmony export */ });
/* harmony import */ var _translateCoords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translateCoords */ "./src/translateCoords.js");
/* harmony import */ var _generateOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generateOptions */ "./src/generateOptions.js");



const prevOptions = {};

function checkAdjacent(hitCoords, missCoords) {
    let adjSquare = '';
    hitCoords.forEach((e) => {
        const translated = (0,_translateCoords__WEBPACK_IMPORTED_MODULE_0__["default"])(e);
        const options = (0,_generateOptions__WEBPACK_IMPORTED_MODULE_1__["default"])(translated);
        // check if option has already been generated or is a miss
        options.forEach((option) => {
            if (!(option in prevOptions) && !(option in missCoords))
                prevOptions[option] = null;
        });
        const prevOptionsKeys = Object.keys(prevOptions);
        prevOptionsKeys.forEach((key) => {
            if (key in missCoords) {
                delete prevOptions[key];
            } else {
                adjSquare = [Number(key[0]), Number(key[2])];
            }
        });
    });
    return adjSquare;
}


/***/ }),

/***/ "./src/checkLength.js":
/*!****************************!*\
  !*** ./src/checkLength.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkLength)
/* harmony export */ });
function checkLength(options, length) {
    const coords = [];
    for (let i = 0; i < length; i += 1) {
        coords.push(options[i]);
    }
    return coords;
}


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
/* harmony import */ var _checkAdjacent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkAdjacent */ "./src/checkAdjacent.js");
/* harmony import */ var _attack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attack */ "./src/attack.js");
/* harmony import */ var _randomAttack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./randomAttack */ "./src/randomAttack.js");




class Computer {
    constructor(gameboard) {
        this.coords = {};
        this.gameboard = gameboard;
        this.createCoords();
    }

    createCoords() {
        for (let i = 0; i < 10; i += 1) {
            for (let j = 0; j < 10; j += 1) {
                this.coords[[i, j]] = null;
            }
        }
    }

    returnCoords() {
        return this.coords;
    }

    compAttack(player1, player2) {
        let attackCoords = [];
        const hitCoords = Object.keys(player2.gameBoard.hitAttacks);
        const missCoords = player2.gameBoard.missedAttacks;
        if (hitCoords.length) {
            const adjacent = (0,_checkAdjacent__WEBPACK_IMPORTED_MODULE_0__["default"])(hitCoords, missCoords);
            if (adjacent) {
                attackCoords = adjacent;
            } else {
                attackCoords = (0,_randomAttack__WEBPACK_IMPORTED_MODULE_2__["default"])(this.coords);
            }
        } else {
            attackCoords = (0,_randomAttack__WEBPACK_IMPORTED_MODULE_2__["default"])(this.coords);
        }
        const enemyCell =
            player1.gameBoard.grid[attackCoords[0]][attackCoords[1]];
        delete this.coords[attackCoords];
        (0,_attack__WEBPACK_IMPORTED_MODULE_1__["default"])(player2, player1, enemyCell);
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



class Gameboard {
    constructor() {
        this.grid = (0,_createGrid__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.missedAttacks = {};
        this.hitAttacks = {};
        this.shipsSunk = 0;
        this.latestSunk = '';
        this.allSunk = false;
        this.ships = [];
        this.shipLocations = {};
        this.placeShips();
    }

    resetShipsSunk() {
        this.latestSunk = '';
    }

    showGrid() {
        return this.grid;
    }

    getShipLocs() {
        return this.shipLocations;
    }

    placeShips() {
        const ships = [
            {
                name: 'carrier',
                length: 5,
            },
            {
                name: 'battleship',
                length: 4,
            },
            {
                name: 'destroyer',
                length: 3,
            },
            {
                name: 'submarine',
                length: 3,
            },
            {
                name: 'patrol boat',
                length: 2,
            },
        ];

        ships.forEach((element) => {
            const ship = new _ship__WEBPACK_IMPORTED_MODULE_1__["default"](element.name, element.length, this);
            this.ships.push(ship);
        });
    }

    occupy(coords) {
        this.shipLocations[coords] = null;
        this.grid[coords[0]][coords[1]].occupied = true;
    }

    receiveAttack(attackCoords) {
        for (let i = 0; i < this.ships.length; i += 1) {
            const ship = this.ships[i];
            if (attackCoords in ship.coords) {
                ship.hit();
                if (ship.sunk) {
                    this.latestSunk = ship.name;
                    this.shipsSunk += 1;
                    if (this.shipsSunk === 5) this.allSunk = true;
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
    // player1.gameBoard.placeShips();
    // player2.gameBoard.placeShips();
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
/* harmony import */ var _player1grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player1grid */ "./src/player1grid.js");
/* harmony import */ var _player2grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player2grid */ "./src/player2grid.js");



function main(player1, player2) {
    const mainDiv = document.createElement('main');
    const p2grid = (0,_player2grid__WEBPACK_IMPORTED_MODULE_1__["default"])(player1, player2);
    const p1grid = (0,_player1grid__WEBPACK_IMPORTED_MODULE_0__["default"])(player1);
    mainDiv.appendChild(p2grid);
    mainDiv.appendChild(p1grid);
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

    // 3 different returns, miss, hit, or already attacked
    attack(cell) {
        if (cell.occupied === false) {
            this.gameBoard.missedAttacks[cell.coords] = null;
            // ensures comp doesn't attack same square twice
            // if (this.comp) this.gameBoard.missedAttacks[cell.coords] = null;
            return 0;
        }
        if (cell.coords in this.gameBoard.hitAttacks) {
            // if (this.comp) this.gameBoard.missedAttacks[cell.coords] = null;
            return 1;
        }
        this.gameBoard.hitAttacks[cell.coords] = null;
        // if (this.comp) this.gameBoard.missedAttacks[cell.coords] = null;
        return 2;
    }
}


/***/ }),

/***/ "./src/player1grid.js":
/*!****************************!*\
  !*** ./src/player1grid.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ player1grid)
/* harmony export */ });
function player1grid(player1) {
    const container = document.createElement('div');
    const p1info = document.createElement('div');
    p1info.innerText = 'Your ships';
    p1info.className = 'info';
    const p1grid = player1.gameBoard.grid;

    const div = document.createElement('div');
    div.className = 'player1-grid';
    p1grid.forEach((element) => {
        element.forEach((e) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = e.coords;
            if (e.coords in player1.gameBoard.shipLocations)
                cell.style.backgroundColor = 'grey';
            div.appendChild(cell);
        });
    });

    container.appendChild(p1info);
    container.appendChild(div);
    return container;
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
/* harmony import */ var _attack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attack */ "./src/attack.js");
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./status */ "./src/status.js");



function player2grid(player1, player2) {
    const container = document.createElement('div');
    const p2info = document.createElement('div');
    p2info.innerText = 'Enemy ships';
    p2info.className = 'info';
    const p2grid = player2.gameBoard.grid;
    const div = document.createElement('div');
    div.className = 'player2-grid';
    const statusDiv = (0,_status__WEBPACK_IMPORTED_MODULE_1__["default"])();
    p2grid.forEach((element) => {
        element.forEach((e) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = e.name;
            cell.addEventListener('click', () => (0,_attack__WEBPACK_IMPORTED_MODULE_0__["default"])(player1, player2, e));
            div.appendChild(cell);
        });
    });
    container.appendChild(p2info);
    container.appendChild(div);
    container.appendChild(statusDiv);
    return container;
}


/***/ }),

/***/ "./src/randomAttack.js":
/*!*****************************!*\
  !*** ./src/randomAttack.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ randomAttack)
/* harmony export */ });
function randomAttack(coords) {
    const keys = Object.keys(coords);
    const randomCoords = keys[Math.floor(Math.random() * keys.length)];
    return [randomCoords[0], randomCoords[2]];
}


/***/ }),

/***/ "./src/randomLocations.js":
/*!********************************!*\
  !*** ./src/randomLocations.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ randomLocations)
/* harmony export */ });
/* harmony import */ var _checkLength__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkLength */ "./src/checkLength.js");
// checks to see if ship length could fit in given coordinates range



function randomLocations(coords, usedCoords, length) {
    const vertOptions = [coords];
    const horizOptions = [coords];
    for (let i = 1; i < length; i += 1) {
        // check vertical doesn't go off the board and hasnt already been used
        if (
            coords[0] + length - 1 <= 9 &&
            !([coords[0] + i, coords[1]] in usedCoords)
        ) {
            vertOptions.push([coords[0] + i, coords[1]]);
        }
        if (
            coords[0] - length + 1 >= 0 &&
            !([coords[0] - i, coords[1]] in usedCoords)
        ) {
            vertOptions.push([coords[0] - i, coords[1]]);
        }
        // check horizontal doesn't go off board and hasnt already been used
        if (
            coords[1] + length - 1 <= 9 &&
            !([coords[0], coords[1] + i] in usedCoords)
        ) {
            horizOptions.push([coords[0], coords[1] + i]);
        }
        if (
            coords[1] - length + 1 >= 0 &&
            !([coords[0], coords[1] - i] in usedCoords)
        ) {
            horizOptions.push([coords[0], coords[1] - i]);
        }
    }
    if (vertOptions.length > horizOptions.length) {
        return (0,_checkLength__WEBPACK_IMPORTED_MODULE_0__["default"])(vertOptions, length);
    }
    if (horizOptions.length > vertOptions.length) {
        return (0,_checkLength__WEBPACK_IMPORTED_MODULE_0__["default"])(horizOptions, length);
    }
    const options = [vertOptions, horizOptions];
    const coinToss = Math.floor(Math.random() * 2);
    return (0,_checkLength__WEBPACK_IMPORTED_MODULE_0__["default"])(options[coinToss], length);
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
/* harmony import */ var _shipRandomizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipRandomizer */ "./src/shipRandomizer.js");


class Ship {
    constructor(name, length, board, numHits = 0, sunk = false) {
        this.name = name;
        this.length = length;
        this.numHits = numHits;
        this.sunk = sunk;
        this.coords = (0,_shipRandomizer__WEBPACK_IMPORTED_MODULE_0__["default"])(length, board);
    }

    hit() {
        this.numHits += 1;
        if (this.numHits === this.length) this.sunk = true;
    }
}


/***/ }),

/***/ "./src/shipRandomizer.js":
/*!*******************************!*\
  !*** ./src/shipRandomizer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shipRandomizer)
/* harmony export */ });
/* harmony import */ var _randomLocations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randomLocations */ "./src/randomLocations.js");


function randomValidNum(min, max) {
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeild) + minCeild);
}

function shipRandomizer(length, board) {
    const usedCoords = board.getShipLocs();
    // console.log(usedCoords);
    // const coords = {};
    const coord1 = randomValidNum(0, 9);
    const coord2 = randomValidNum(0, 9);
    if (!([coord1, coord2] in usedCoords)) {
        const options = (0,_randomLocations__WEBPACK_IMPORTED_MODULE_0__["default"])([coord1, coord2], usedCoords, length);
        if (options.length === length) {
            for (let i = 0; i < options.length; i += 1) {
                board.occupy(options[i]);
            }
            return options;
        }
    }
    // run again if valid coords aren't found
    return shipRandomizer(length, board);
}


/***/ }),

/***/ "./src/status.js":
/*!***********************!*\
  !*** ./src/status.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ status)
/* harmony export */ });
function status() {
    const div = document.createElement('div');
    div.className = 'status';
    div.innerText = '(Click location above to attack)';
    return div;
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

// gameLoop(player1, player2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qiw0REFBZTtBQUN2QztBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDekJlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ0pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDa0M7QUFDSjtBQUNBO0FBQ0o7QUFDTDs7QUFFckIsb0JBQW9CLCtDQUFNO0FBQzFCLG9CQUFvQiwrQ0FBTTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbURBQU07QUFDMUIsb0JBQW9CLGlEQUFJO0FBQ3hCOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2F0dGFjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NoZWNrQWRqYWNlbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jaGVja0xlbmd0aC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3JlYXRlR3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2VuZXJhdGVPcHRpb25zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVhZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcjFncmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyMmdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9yYW5kb21BdHRhY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9yYW5kb21Mb2NhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcFJhbmRvbWl6ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdGF0dXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy90cmFuc2xhdGVDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gaW1wb3J0IGVuZFR1cm4gZnJvbSAnLi9lbmRUdXJuJztcblxuLy8gdGFrZXMgYSBjbGlja2VkIGNlbGwgYW5kIHVwZGF0ZXMgdGhlIGJvYXJkIGFuZCBzdGF0dXMgYmFyIGFjY29yZGluZ2x5IGFzIHdlbGwgYXMgZW5kcyB0aGUgdHVyblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXR0YWNrKHBsYXllcjEsIHBsYXllcjIsIGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXIxLmNvbXApO1xuICAgIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICBsZXQgY2VsbCA9ICcnO1xuICAgIGlmIChwbGF5ZXIxLmNvbXApIHtcbiAgICAgICAgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUuY29vcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS5uYW1lKTtcbiAgICB9XG4gICAgaWYgKHBsYXllcjEuYXR0YWNrKGUpID09PSAyKSB7XG4gICAgICAgIHBsYXllcjIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soZS5uYW1lKTtcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9ICdIaXQhJztcbiAgICAgICAgY29uc3Qgc3VuayA9IHBsYXllcjIuZ2FtZUJvYXJkLmxhdGVzdFN1bms7XG4gICAgICAgIGlmIChzdW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9IGBZb3Ugc3VuayB0aGVpciAke3N1bmt9IWA7XG4gICAgICAgICAgICBwbGF5ZXIyLmdhbWVCb2FyZC5yZXNldFNoaXBzU3VuaygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXIyLmdhbWVCb2FyZC5hbGxTdW5rKSB7XG4gICAgICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ICs9ICcgR2FtZSBvdmVyISc7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBsYXllcjEuYXR0YWNrKGUpID09PSAxKSB7XG4gICAgICAgIHN0YXR1cy5pbm5lclRleHQgPSAnQWxyZWFkeSBhdHRhY2tlZCEgTWlzcyEnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXR1cy5pbm5lclRleHQgPSAnTWlzcyEnO1xuICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgfVxuXG4gICAgLy8gZW5kVHVybihwbGF5ZXIxLCBwbGF5ZXIyKTtcbn1cbiIsImltcG9ydCB0cmFuc2xhdGVDb29yZHMgZnJvbSAnLi90cmFuc2xhdGVDb29yZHMnO1xuaW1wb3J0IGdlbmVyYXRlT3B0aW9ucyBmcm9tICcuL2dlbmVyYXRlT3B0aW9ucyc7XG5cbmNvbnN0IHByZXZPcHRpb25zID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrQWRqYWNlbnQoaGl0Q29vcmRzLCBtaXNzQ29vcmRzKSB7XG4gICAgbGV0IGFkalNxdWFyZSA9ICcnO1xuICAgIGhpdENvb3Jkcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWQgPSB0cmFuc2xhdGVDb29yZHMoZSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBnZW5lcmF0ZU9wdGlvbnModHJhbnNsYXRlZCk7XG4gICAgICAgIC8vIGNoZWNrIGlmIG9wdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGdlbmVyYXRlZCBvciBpcyBhIG1pc3NcbiAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIGlmICghKG9wdGlvbiBpbiBwcmV2T3B0aW9ucykgJiYgIShvcHRpb24gaW4gbWlzc0Nvb3JkcykpXG4gICAgICAgICAgICAgICAgcHJldk9wdGlvbnNbb3B0aW9uXSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcmV2T3B0aW9uc0tleXMgPSBPYmplY3Qua2V5cyhwcmV2T3B0aW9ucyk7XG4gICAgICAgIHByZXZPcHRpb25zS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWlzc0Nvb3Jkcykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcmV2T3B0aW9uc1trZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGpTcXVhcmUgPSBbTnVtYmVyKGtleVswXSksIE51bWJlcihrZXlbMl0pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFkalNxdWFyZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrTGVuZ3RoKG9wdGlvbnMsIGxlbmd0aCkge1xuICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29vcmRzLnB1c2gob3B0aW9uc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjb29yZHM7XG59XG4iLCJpbXBvcnQgY2hlY2tBZGphY2VudCBmcm9tICcuL2NoZWNrQWRqYWNlbnQnO1xuaW1wb3J0IGF0dGFjayBmcm9tICcuL2F0dGFjayc7XG5pbXBvcnQgcmFuZG9tQXR0YWNrIGZyb20gJy4vcmFuZG9tQXR0YWNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcHV0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVib2FyZCkge1xuICAgICAgICB0aGlzLmNvb3JkcyA9IHt9O1xuICAgICAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcbiAgICAgICAgdGhpcy5jcmVhdGVDb29yZHMoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVDb29yZHMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZHNbW2ksIGpdXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm5Db29yZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvb3JkcztcbiAgICB9XG5cbiAgICBjb21wQXR0YWNrKHBsYXllcjEsIHBsYXllcjIpIHtcbiAgICAgICAgbGV0IGF0dGFja0Nvb3JkcyA9IFtdO1xuICAgICAgICBjb25zdCBoaXRDb29yZHMgPSBPYmplY3Qua2V5cyhwbGF5ZXIyLmdhbWVCb2FyZC5oaXRBdHRhY2tzKTtcbiAgICAgICAgY29uc3QgbWlzc0Nvb3JkcyA9IHBsYXllcjIuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3M7XG4gICAgICAgIGlmIChoaXRDb29yZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBhZGphY2VudCA9IGNoZWNrQWRqYWNlbnQoaGl0Q29vcmRzLCBtaXNzQ29vcmRzKTtcbiAgICAgICAgICAgIGlmIChhZGphY2VudCkge1xuICAgICAgICAgICAgICAgIGF0dGFja0Nvb3JkcyA9IGFkamFjZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tDb29yZHMgPSByYW5kb21BdHRhY2sodGhpcy5jb29yZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXR0YWNrQ29vcmRzID0gcmFuZG9tQXR0YWNrKHRoaXMuY29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmVteUNlbGwgPVxuICAgICAgICAgICAgcGxheWVyMS5nYW1lQm9hcmQuZ3JpZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvb3Jkc1thdHRhY2tDb29yZHNdO1xuICAgICAgICBhdHRhY2socGxheWVyMiwgcGxheWVyMSwgZW5lbXlDZWxsKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVHcmlkKCkge1xuICAgIGNvbnN0IGdyaWQgPSBbXTtcbiAgICBjb25zdCByb3dzID0gMTA7XG4gICAgY29uc3QgY29sdW1zID0gMTA7XG4gICAgY29uc3QgbGV0dGVyID0gJ2FiY2RlZmdoaWonO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSArPSAxKSB7XG4gICAgICAgIGdyaWRbaV0gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2x1bXM7IGogKz0gMSkge1xuICAgICAgICAgICAgZ3JpZFtpXVtqXSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBsZXR0ZXJbaV0gKyAoaiArIDEpLFxuICAgICAgICAgICAgICAgIGNvb3JkczogW2ksIGpdLFxuICAgICAgICAgICAgICAgIG9jY3VwaWVkOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG59XG4iLCJpbXBvcnQgY3JlYXRlR3JpZCBmcm9tICcuL2NyZWF0ZUdyaWQnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gY3JlYXRlR3JpZCgpO1xuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5oaXRBdHRhY2tzID0ge307XG4gICAgICAgIHRoaXMuc2hpcHNTdW5rID0gMDtcbiAgICAgICAgdGhpcy5sYXRlc3RTdW5rID0gJyc7XG4gICAgICAgIHRoaXMuYWxsU3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNoaXBzID0gW107XG4gICAgICAgIHRoaXMuc2hpcExvY2F0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLnBsYWNlU2hpcHMoKTtcbiAgICB9XG5cbiAgICByZXNldFNoaXBzU3VuaygpIHtcbiAgICAgICAgdGhpcy5sYXRlc3RTdW5rID0gJyc7XG4gICAgfVxuXG4gICAgc2hvd0dyaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyaWQ7XG4gICAgfVxuXG4gICAgZ2V0U2hpcExvY3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaXBMb2NhdGlvbnM7XG4gICAgfVxuXG4gICAgcGxhY2VTaGlwcygpIHtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2NhcnJpZXInLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogNSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2Rlc3Ryb3llcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3VibWFyaW5lJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdwYXRyb2wgYm9hdCcsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBzaGlwcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoZWxlbWVudC5uYW1lLCBlbGVtZW50Lmxlbmd0aCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9jY3VweShjb29yZHMpIHtcbiAgICAgICAgdGhpcy5zaGlwTG9jYXRpb25zW2Nvb3Jkc10gPSBudWxsO1xuICAgICAgICB0aGlzLmdyaWRbY29vcmRzWzBdXVtjb29yZHNbMV1dLm9jY3VwaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3Jkcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW2ldO1xuICAgICAgICAgICAgaWYgKGF0dGFja0Nvb3JkcyBpbiBzaGlwLmNvb3Jkcykge1xuICAgICAgICAgICAgICAgIHNoaXAuaGl0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuc3Vuaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdGVzdFN1bmsgPSBzaGlwLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcHNTdW5rICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaXBzU3VuayA9PT0gNSkgdGhpcy5hbGxTdW5rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lTG9vcChwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgbGV0IHR1cm4gPSAwO1xuICAgIGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuICAgIC8vIHBsYXllcjEuZ2FtZUJvYXJkLnBsYWNlU2hpcHMoKTtcbiAgICAvLyBwbGF5ZXIyLmdhbWVCb2FyZC5wbGFjZVNoaXBzKCk7XG4gICAgd2hpbGUgKGdhbWVPdmVyID09PSBmYWxzZSkge1xuICAgICAgICB0dXJuICs9IDE7XG4gICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHR1cm47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZU9wdGlvbnMoY29vcmRzKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGlmIChjb29yZHNbMF0gLSAxID49IDApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gLSAxLCBjb29yZHNbMV1dKTtcbiAgICB9XG4gICAgaWYgKGNvb3Jkc1swXSArIDEgPD0gMTApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gKyAxLCBjb29yZHNbMV1dKTtcbiAgICB9XG4gICAgaWYgKGNvb3Jkc1sxXSAtIDEgPj0gMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gMV0pO1xuICAgIH1cbiAgICBpZiAoY29vcmRzWzFdICsgMSA8PSAxMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgMV0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBkaXYuaW5uZXJUZXh0ID0gJ0JhdHRsZXNoaXAnO1xuICAgIHJldHVybiBkaXY7XG59XG4iLCJpbXBvcnQgcGxheWVyMWdyaWQgZnJvbSAnLi9wbGF5ZXIxZ3JpZCc7XG5pbXBvcnQgcGxheWVyMmdyaWQgZnJvbSAnLi9wbGF5ZXIyZ3JpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1haW4ocGxheWVyMSwgcGxheWVyMikge1xuICAgIGNvbnN0IG1haW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XG4gICAgY29uc3QgcDJncmlkID0gcGxheWVyMmdyaWQocGxheWVyMSwgcGxheWVyMik7XG4gICAgY29uc3QgcDFncmlkID0gcGxheWVyMWdyaWQocGxheWVyMSk7XG4gICAgbWFpbkRpdi5hcHBlbmRDaGlsZChwMmdyaWQpO1xuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQocDFncmlkKTtcbiAgICByZXR1cm4gbWFpbkRpdjtcbn1cbiIsImltcG9ydCBDb21wdXRlciBmcm9tICcuL2NvbXB1dGVyJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lQm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbXAgPSBmYWxzZSwgZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpKSB7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkO1xuICAgICAgICBpZiAoY29tcCkgdGhpcy5jb21wID0gbmV3IENvbXB1dGVyKGdhbWVCb2FyZCk7XG4gICAgfVxuXG4gICAgLy8gMyBkaWZmZXJlbnQgcmV0dXJucywgbWlzcywgaGl0LCBvciBhbHJlYWR5IGF0dGFja2VkXG4gICAgYXR0YWNrKGNlbGwpIHtcbiAgICAgICAgaWYgKGNlbGwub2NjdXBpZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgICAgICAvLyBlbnN1cmVzIGNvbXAgZG9lc24ndCBhdHRhY2sgc2FtZSBzcXVhcmUgdHdpY2VcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmNvbXApIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3NbY2VsbC5jb29yZHNdID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZWxsLmNvb3JkcyBpbiB0aGlzLmdhbWVCb2FyZC5oaXRBdHRhY2tzKSB7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5jb21wKSB0aGlzLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdhbWVCb2FyZC5oaXRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgIC8vIGlmICh0aGlzLmNvbXApIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3NbY2VsbC5jb29yZHNdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxheWVyMWdyaWQocGxheWVyMSkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHAxaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHAxaW5mby5pbm5lclRleHQgPSAnWW91ciBzaGlwcyc7XG4gICAgcDFpbmZvLmNsYXNzTmFtZSA9ICdpbmZvJztcbiAgICBjb25zdCBwMWdyaWQgPSBwbGF5ZXIxLmdhbWVCb2FyZC5ncmlkO1xuXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSA9ICdwbGF5ZXIxLWdyaWQnO1xuICAgIHAxZ3JpZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG4gICAgICAgICAgICBjZWxsLmlkID0gZS5jb29yZHM7XG4gICAgICAgICAgICBpZiAoZS5jb29yZHMgaW4gcGxheWVyMS5nYW1lQm9hcmQuc2hpcExvY2F0aW9ucylcbiAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmV5JztcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocDFpbmZvKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuIiwiaW1wb3J0IGF0dGFjayBmcm9tICcuL2F0dGFjayc7XG5pbXBvcnQgc3RhdHVzIGZyb20gJy4vc3RhdHVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxheWVyMmdyaWQocGxheWVyMSwgcGxheWVyMikge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHAyaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHAyaW5mby5pbm5lclRleHQgPSAnRW5lbXkgc2hpcHMnO1xuICAgIHAyaW5mby5jbGFzc05hbWUgPSAnaW5mbyc7XG4gICAgY29uc3QgcDJncmlkID0gcGxheWVyMi5nYW1lQm9hcmQuZ3JpZDtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gJ3BsYXllcjItZ3JpZCc7XG4gICAgY29uc3Qgc3RhdHVzRGl2ID0gc3RhdHVzKCk7XG4gICAgcDJncmlkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgICAgIGNlbGwuaWQgPSBlLm5hbWU7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gYXR0YWNrKHBsYXllcjEsIHBsYXllcjIsIGUpKTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHAyaW5mbyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXR1c0Rpdik7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUF0dGFjayhjb29yZHMpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY29vcmRzKTtcbiAgICBjb25zdCByYW5kb21Db29yZHMgPSBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV07XG4gICAgcmV0dXJuIFtyYW5kb21Db29yZHNbMF0sIHJhbmRvbUNvb3Jkc1syXV07XG59XG4iLCIvLyBjaGVja3MgdG8gc2VlIGlmIHNoaXAgbGVuZ3RoIGNvdWxkIGZpdCBpbiBnaXZlbiBjb29yZGluYXRlcyByYW5nZVxuXG5pbXBvcnQgY2hlY2tMZW5ndGggZnJvbSAnLi9jaGVja0xlbmd0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUxvY2F0aW9ucyhjb29yZHMsIHVzZWRDb29yZHMsIGxlbmd0aCkge1xuICAgIGNvbnN0IHZlcnRPcHRpb25zID0gW2Nvb3Jkc107XG4gICAgY29uc3QgaG9yaXpPcHRpb25zID0gW2Nvb3Jkc107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAvLyBjaGVjayB2ZXJ0aWNhbCBkb2Vzbid0IGdvIG9mZiB0aGUgYm9hcmQgYW5kIGhhc250IGFscmVhZHkgYmVlbiB1c2VkXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvb3Jkc1swXSArIGxlbmd0aCAtIDEgPD0gOSAmJlxuICAgICAgICAgICAgIShbY29vcmRzWzBdICsgaSwgY29vcmRzWzFdXSBpbiB1c2VkQ29vcmRzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZlcnRPcHRpb25zLnB1c2goW2Nvb3Jkc1swXSArIGksIGNvb3Jkc1sxXV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvb3Jkc1swXSAtIGxlbmd0aCArIDEgPj0gMCAmJlxuICAgICAgICAgICAgIShbY29vcmRzWzBdIC0gaSwgY29vcmRzWzFdXSBpbiB1c2VkQ29vcmRzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZlcnRPcHRpb25zLnB1c2goW2Nvb3Jkc1swXSAtIGksIGNvb3Jkc1sxXV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIGhvcml6b250YWwgZG9lc24ndCBnbyBvZmYgYm9hcmQgYW5kIGhhc250IGFscmVhZHkgYmVlbiB1c2VkXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvb3Jkc1sxXSArIGxlbmd0aCAtIDEgPD0gOSAmJlxuICAgICAgICAgICAgIShbY29vcmRzWzBdLCBjb29yZHNbMV0gKyBpXSBpbiB1c2VkQ29vcmRzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGhvcml6T3B0aW9ucy5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSArIGldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb29yZHNbMV0gLSBsZW5ndGggKyAxID49IDAgJiZcbiAgICAgICAgICAgICEoW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gaV0gaW4gdXNlZENvb3JkcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBob3Jpek9wdGlvbnMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gLSBpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZlcnRPcHRpb25zLmxlbmd0aCA+IGhvcml6T3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrTGVuZ3RoKHZlcnRPcHRpb25zLCBsZW5ndGgpO1xuICAgIH1cbiAgICBpZiAoaG9yaXpPcHRpb25zLmxlbmd0aCA+IHZlcnRPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gY2hlY2tMZW5ndGgoaG9yaXpPcHRpb25zLCBsZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zID0gW3ZlcnRPcHRpb25zLCBob3Jpek9wdGlvbnNdO1xuICAgIGNvbnN0IGNvaW5Ub3NzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgcmV0dXJuIGNoZWNrTGVuZ3RoKG9wdGlvbnNbY29pblRvc3NdLCBsZW5ndGgpO1xufVxuIiwiaW1wb3J0IHNoaXBSYW5kb21pemVyIGZyb20gJy4vc2hpcFJhbmRvbWl6ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgsIGJvYXJkLCBudW1IaXRzID0gMCwgc3VuayA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm51bUhpdHMgPSBudW1IaXRzO1xuICAgICAgICB0aGlzLnN1bmsgPSBzdW5rO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IHNoaXBSYW5kb21pemVyKGxlbmd0aCwgYm9hcmQpO1xuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5udW1IaXRzICs9IDE7XG4gICAgICAgIGlmICh0aGlzLm51bUhpdHMgPT09IHRoaXMubGVuZ3RoKSB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIH1cbn1cbiIsImltcG9ydCByYW5kb21Mb2NhdGlvbnMgZnJvbSAnLi9yYW5kb21Mb2NhdGlvbnMnO1xuXG5mdW5jdGlvbiByYW5kb21WYWxpZE51bShtaW4sIG1heCkge1xuICAgIGNvbnN0IG1pbkNlaWxkID0gTWF0aC5jZWlsKG1pbik7XG4gICAgY29uc3QgbWF4Rmxvb3JlZCA9IE1hdGguZmxvb3IobWF4KTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heEZsb29yZWQgLSBtaW5DZWlsZCkgKyBtaW5DZWlsZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXBSYW5kb21pemVyKGxlbmd0aCwgYm9hcmQpIHtcbiAgICBjb25zdCB1c2VkQ29vcmRzID0gYm9hcmQuZ2V0U2hpcExvY3MoKTtcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VkQ29vcmRzKTtcbiAgICAvLyBjb25zdCBjb29yZHMgPSB7fTtcbiAgICBjb25zdCBjb29yZDEgPSByYW5kb21WYWxpZE51bSgwLCA5KTtcbiAgICBjb25zdCBjb29yZDIgPSByYW5kb21WYWxpZE51bSgwLCA5KTtcbiAgICBpZiAoIShbY29vcmQxLCBjb29yZDJdIGluIHVzZWRDb29yZHMpKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSByYW5kb21Mb2NhdGlvbnMoW2Nvb3JkMSwgY29vcmQyXSwgdXNlZENvb3JkcywgbGVuZ3RoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGJvYXJkLm9jY3VweShvcHRpb25zW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJ1biBhZ2FpbiBpZiB2YWxpZCBjb29yZHMgYXJlbid0IGZvdW5kXG4gICAgcmV0dXJuIHNoaXBSYW5kb21pemVyKGxlbmd0aCwgYm9hcmQpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhdHVzKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc05hbWUgPSAnc3RhdHVzJztcbiAgICBkaXYuaW5uZXJUZXh0ID0gJyhDbGljayBsb2NhdGlvbiBhYm92ZSB0byBhdHRhY2spJztcbiAgICByZXR1cm4gZGl2O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNsYXRlQ29vcmRzKGNvb3Jkcykge1xuICAgIGNvbnN0IGxldHRlciA9IGNvb3Jkc1swXS5jaGFyQ29kZUF0KCkgLSA5NztcbiAgICBjb25zdCBudW0gPSBjb29yZHNbMV0gLSAxO1xuICAgIHJldHVybiBbbGV0dGVyLCBudW1dO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGdhbWVMb29wIGZyb20gJy4vZ2FtZUxvb3AnO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL2hlYWRlcic7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBtYWluIGZyb20gJy4vbWFpbic7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoKTtcbmNvbnN0IHBsYXllcjIgPSBuZXcgUGxheWVyKHRydWUpO1xuY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29udGVudC5pZCA9ICdjb250ZW50JztcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5jb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcigpKTtcbmNvbnRlbnQuYXBwZW5kQ2hpbGQobWFpbihwbGF5ZXIxLCBwbGF5ZXIyKSk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4vLyBnYW1lTG9vcChwbGF5ZXIxLCBwbGF5ZXIyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==