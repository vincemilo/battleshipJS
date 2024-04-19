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
function checkLength(vert, horiz) {
    let options = [vert, horiz];
    if (vert.length > horiz.length) {
        options = vert;
    } else if (vert.length < horiz.length) {
        options = horiz;
    } else {
        const coinToss = Math.floor(Math.random() * 2);
        options = options[coinToss];
    }
    return options;
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
/* harmony import */ var _shipRandomizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipRandomizer */ "./src/shipRandomizer.js");




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

    placeShips() {
        console.log('blah');
        const ships = [
            {
                name: 'carrier',
                length: 5,
                coords: (0,_shipRandomizer__WEBPACK_IMPORTED_MODULE_2__["default"])(5, this),
            },
            {
                name: 'battleship',
                length: 4,
                coords: (0,_shipRandomizer__WEBPACK_IMPORTED_MODULE_2__["default"])(4, this),
            },
            // {
            //     name: 'destroyer',
            //     length: 3,
            //     coords: shipRandomizer(3),
            // },
            // {
            //     name: 'submarine',
            //     length: 3,
            //     coords: shipRandomizer(3),
            // },
            // {
            //     name: 'patrol boat',
            //     length: 2,
            //     coords: shipRandomizer(2),
            // },
        ];

        ships.forEach((element) => {
            const ship = new _ship__WEBPACK_IMPORTED_MODULE_1__["default"](element.name, element.length, element.coords);
            this.ships.push(ship);
            // console.log(ship.coords);
            // takes ship coords and applies them to board
            // Object.keys(ship.coords).forEach((e) => this.occupy(e));
        });
    }

    occupy(coords) {
        console.log(coords);
        // this.shipLocations[coords] = null;
        // this.grid[coords[0]][coords[2]].occupied = true;
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
// checks to see if ship length could fit in given coordinates range

function randomLocations(coords, usedCoords, length) {
    const vertOptions = [];
    const horizOptions = [];
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
    return { vertOptions, horizOptions };
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

/***/ "./src/shipRandomizer.js":
/*!*******************************!*\
  !*** ./src/shipRandomizer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shipRandomizer)
/* harmony export */ });
/* harmony import */ var _checkLength__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkLength */ "./src/checkLength.js");
/* harmony import */ var _randomLocations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./randomLocations */ "./src/randomLocations.js");



function randomValidNum(min, max) {
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeild) + minCeild);
}

function shipRandomizer(length, board) {
    const usedCoords = board.shipLocations;
    const coords = {};
    const coord1 = randomValidNum(0, 9);
    const coord2 = randomValidNum(0, 10 - length);
    if (!([coord1, coord2] in usedCoords)) {
        const options = (0,_randomLocations__WEBPACK_IMPORTED_MODULE_1__["default"])([coord1, coord2], usedCoords, length);
        coords[[coord1, coord2]] = null;
        console.log([coord1, coord2]);
        board.occupy([coord1, coord2]);
        const adjSquares = (0,_checkLength__WEBPACK_IMPORTED_MODULE_0__["default"])(
            options.vertOptions,
            options.horizOptions
        );
        for (let i = 0; i < adjSquares.length; i += 1) {
            coords[adjSquares[i]] = null;
            console.log(adjSquares[i]);
            board.occupy([adjSquares[i]]);
            if (Object.keys(coords).length === length) {
                return coords;
            }
        }
    }
    // run again if valid coords aren't found
    console.log('again');
    // return shipRandomizer(length, usedCoords);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHdEQUFXO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNMZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNrQztBQUNKO0FBQ0E7QUFDSjtBQUNMOztBQUVyQixvQkFBb0IsK0NBQU07QUFDMUIsb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtREFBTTtBQUMxQixvQkFBb0IsaURBQUk7QUFDeEI7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2F0dGFjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NoZWNrQWRqYWNlbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jaGVja0xlbmd0aC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3JlYXRlR3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2VuZXJhdGVPcHRpb25zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVhZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcjFncmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyMmdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9yYW5kb21BdHRhY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9yYW5kb21Mb2NhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcFJhbmRvbWl6ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdGF0dXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy90cmFuc2xhdGVDb29yZHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gaW1wb3J0IGVuZFR1cm4gZnJvbSAnLi9lbmRUdXJuJztcblxuLy8gdGFrZXMgYSBjbGlja2VkIGNlbGwgYW5kIHVwZGF0ZXMgdGhlIGJvYXJkIGFuZCBzdGF0dXMgYmFyIGFjY29yZGluZ2x5IGFzIHdlbGwgYXMgZW5kcyB0aGUgdHVyblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXR0YWNrKHBsYXllcjEsIHBsYXllcjIsIGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXIxLmNvbXApO1xuICAgIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICBsZXQgY2VsbCA9ICcnO1xuICAgIGlmIChwbGF5ZXIxLmNvbXApIHtcbiAgICAgICAgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUuY29vcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS5uYW1lKTtcbiAgICB9XG4gICAgaWYgKHBsYXllcjEuYXR0YWNrKGUpID09PSAyKSB7XG4gICAgICAgIHBsYXllcjIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soZS5uYW1lKTtcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9ICdIaXQhJztcbiAgICAgICAgY29uc3Qgc3VuayA9IHBsYXllcjIuZ2FtZUJvYXJkLmxhdGVzdFN1bms7XG4gICAgICAgIGlmIChzdW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9IGBZb3Ugc3VuayB0aGVpciAke3N1bmt9IWA7XG4gICAgICAgICAgICBwbGF5ZXIyLmdhbWVCb2FyZC5yZXNldFNoaXBzU3VuaygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXIyLmdhbWVCb2FyZC5hbGxTdW5rKSB7XG4gICAgICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ICs9ICcgR2FtZSBvdmVyISc7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBsYXllcjEuYXR0YWNrKGUpID09PSAxKSB7XG4gICAgICAgIHN0YXR1cy5pbm5lclRleHQgPSAnQWxyZWFkeSBhdHRhY2tlZCEgTWlzcyEnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXR1cy5pbm5lclRleHQgPSAnTWlzcyEnO1xuICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgfVxuXG4gICAgLy8gZW5kVHVybihwbGF5ZXIxLCBwbGF5ZXIyKTtcbn1cbiIsImltcG9ydCB0cmFuc2xhdGVDb29yZHMgZnJvbSAnLi90cmFuc2xhdGVDb29yZHMnO1xuaW1wb3J0IGdlbmVyYXRlT3B0aW9ucyBmcm9tICcuL2dlbmVyYXRlT3B0aW9ucyc7XG5cbmNvbnN0IHByZXZPcHRpb25zID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrQWRqYWNlbnQoaGl0Q29vcmRzLCBtaXNzQ29vcmRzKSB7XG4gICAgbGV0IGFkalNxdWFyZSA9ICcnO1xuICAgIGhpdENvb3Jkcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWQgPSB0cmFuc2xhdGVDb29yZHMoZSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBnZW5lcmF0ZU9wdGlvbnModHJhbnNsYXRlZCk7XG4gICAgICAgIC8vIGNoZWNrIGlmIG9wdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGdlbmVyYXRlZCBvciBpcyBhIG1pc3NcbiAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIGlmICghKG9wdGlvbiBpbiBwcmV2T3B0aW9ucykgJiYgIShvcHRpb24gaW4gbWlzc0Nvb3JkcykpXG4gICAgICAgICAgICAgICAgcHJldk9wdGlvbnNbb3B0aW9uXSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcmV2T3B0aW9uc0tleXMgPSBPYmplY3Qua2V5cyhwcmV2T3B0aW9ucyk7XG4gICAgICAgIHByZXZPcHRpb25zS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWlzc0Nvb3Jkcykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcmV2T3B0aW9uc1trZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGpTcXVhcmUgPSBbTnVtYmVyKGtleVswXSksIE51bWJlcihrZXlbMl0pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFkalNxdWFyZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrTGVuZ3RoKHZlcnQsIGhvcml6KSB7XG4gICAgbGV0IG9wdGlvbnMgPSBbdmVydCwgaG9yaXpdO1xuICAgIGlmICh2ZXJ0Lmxlbmd0aCA+IGhvcml6Lmxlbmd0aCkge1xuICAgICAgICBvcHRpb25zID0gdmVydDtcbiAgICB9IGVsc2UgaWYgKHZlcnQubGVuZ3RoIDwgaG9yaXoubGVuZ3RoKSB7XG4gICAgICAgIG9wdGlvbnMgPSBob3JpejtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjb2luVG9zcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9uc1tjb2luVG9zc107XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuIiwiaW1wb3J0IGNoZWNrQWRqYWNlbnQgZnJvbSAnLi9jaGVja0FkamFjZW50JztcbmltcG9ydCBhdHRhY2sgZnJvbSAnLi9hdHRhY2snO1xuaW1wb3J0IHJhbmRvbUF0dGFjayBmcm9tICcuL3JhbmRvbUF0dGFjayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXB1dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lYm9hcmQpIHtcbiAgICAgICAgdGhpcy5jb29yZHMgPSB7fTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gICAgICAgIHRoaXMuY3JlYXRlQ29vcmRzKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlQ29vcmRzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzW1tpLCBqXV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuQ29vcmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb29yZHM7XG4gICAgfVxuXG4gICAgY29tcEF0dGFjayhwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgICAgIGxldCBhdHRhY2tDb29yZHMgPSBbXTtcbiAgICAgICAgY29uc3QgaGl0Q29vcmRzID0gT2JqZWN0LmtleXMocGxheWVyMi5nYW1lQm9hcmQuaGl0QXR0YWNrcyk7XG4gICAgICAgIGNvbnN0IG1pc3NDb29yZHMgPSBwbGF5ZXIyLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzO1xuICAgICAgICBpZiAoaGl0Q29vcmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgYWRqYWNlbnQgPSBjaGVja0FkamFjZW50KGhpdENvb3JkcywgbWlzc0Nvb3Jkcyk7XG4gICAgICAgICAgICBpZiAoYWRqYWNlbnQpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tDb29yZHMgPSBhZGphY2VudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0YWNrQ29vcmRzID0gcmFuZG9tQXR0YWNrKHRoaXMuY29vcmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF0dGFja0Nvb3JkcyA9IHJhbmRvbUF0dGFjayh0aGlzLmNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5lbXlDZWxsID1cbiAgICAgICAgICAgIHBsYXllcjEuZ2FtZUJvYXJkLmdyaWRbYXR0YWNrQ29vcmRzWzBdXVthdHRhY2tDb29yZHNbMV1dO1xuICAgICAgICBkZWxldGUgdGhpcy5jb29yZHNbYXR0YWNrQ29vcmRzXTtcbiAgICAgICAgYXR0YWNrKHBsYXllcjIsIHBsYXllcjEsIGVuZW15Q2VsbCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcbiAgICBjb25zdCBncmlkID0gW107XG4gICAgY29uc3Qgcm93cyA9IDEwO1xuICAgIGNvbnN0IGNvbHVtcyA9IDEwO1xuICAgIGNvbnN0IGxldHRlciA9ICdhYmNkZWZnaGlqJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkgKz0gMSkge1xuICAgICAgICBncmlkW2ldID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1zOyBqICs9IDEpIHtcbiAgICAgICAgICAgIGdyaWRbaV1bal0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogbGV0dGVyW2ldICsgKGogKyAxKSxcbiAgICAgICAgICAgICAgICBjb29yZHM6IFtpLCBqXSxcbiAgICAgICAgICAgICAgICBvY2N1cGllZDogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSAnLi9jcmVhdGVHcmlkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgc2hpcFJhbmRvbWl6ZXIgZnJvbSAnLi9zaGlwUmFuZG9taXplcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ3JpZCA9IGNyZWF0ZUdyaWQoKTtcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzID0ge307XG4gICAgICAgIHRoaXMuaGl0QXR0YWNrcyA9IHt9O1xuICAgICAgICB0aGlzLnNoaXBzU3VuayA9IDA7XG4gICAgICAgIHRoaXMubGF0ZXN0U3VuayA9ICcnO1xuICAgICAgICB0aGlzLmFsbFN1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgICAgICB0aGlzLnNoaXBMb2NhdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy5wbGFjZVNoaXBzKCk7XG4gICAgfVxuXG4gICAgcmVzZXRTaGlwc1N1bmsoKSB7XG4gICAgICAgIHRoaXMubGF0ZXN0U3VuayA9ICcnO1xuICAgIH1cblxuICAgIHNob3dHcmlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ncmlkO1xuICAgIH1cblxuICAgIHBsYWNlU2hpcHMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdibGFoJyk7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdjYXJyaWVyJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDUsXG4gICAgICAgICAgICAgICAgY29vcmRzOiBzaGlwUmFuZG9taXplcig1LCB0aGlzKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHNoaXBSYW5kb21pemVyKDQsIHRoaXMpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgICBuYW1lOiAnZGVzdHJveWVyJyxcbiAgICAgICAgICAgIC8vICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgICAvLyAgICAgY29vcmRzOiBzaGlwUmFuZG9taXplcigzKSxcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICAgbmFtZTogJ3N1Ym1hcmluZScsXG4gICAgICAgICAgICAvLyAgICAgbGVuZ3RoOiAzLFxuICAgICAgICAgICAgLy8gICAgIGNvb3Jkczogc2hpcFJhbmRvbWl6ZXIoMyksXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAgIG5hbWU6ICdwYXRyb2wgYm9hdCcsXG4gICAgICAgICAgICAvLyAgICAgbGVuZ3RoOiAyLFxuICAgICAgICAgICAgLy8gICAgIGNvb3Jkczogc2hpcFJhbmRvbWl6ZXIoMiksXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHNoaXBzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChlbGVtZW50Lm5hbWUsIGVsZW1lbnQubGVuZ3RoLCBlbGVtZW50LmNvb3Jkcyk7XG4gICAgICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzaGlwLmNvb3Jkcyk7XG4gICAgICAgICAgICAvLyB0YWtlcyBzaGlwIGNvb3JkcyBhbmQgYXBwbGllcyB0aGVtIHRvIGJvYXJkXG4gICAgICAgICAgICAvLyBPYmplY3Qua2V5cyhzaGlwLmNvb3JkcykuZm9yRWFjaCgoZSkgPT4gdGhpcy5vY2N1cHkoZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvY2N1cHkoY29vcmRzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3Jkcyk7XG4gICAgICAgIC8vIHRoaXMuc2hpcExvY2F0aW9uc1tjb29yZHNdID0gbnVsbDtcbiAgICAgICAgLy8gdGhpcy5ncmlkW2Nvb3Jkc1swXV1bY29vcmRzWzJdXS5vY2N1cGllZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tpXTtcbiAgICAgICAgICAgIGlmIChhdHRhY2tDb29yZHMgaW4gc2hpcC5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICBzaGlwLmhpdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzaGlwLnN1bmspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXRlc3RTdW5rID0gc2hpcC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXBzU3VuayArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGlwc1N1bmsgPT09IDUpIHRoaXMuYWxsU3VuayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZUxvb3AocGxheWVyMSwgcGxheWVyMikge1xuICAgIGxldCB0dXJuID0gMDtcbiAgICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICB3aGlsZSAoZ2FtZU92ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIHR1cm4gKz0gMTtcbiAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdHVybjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlT3B0aW9ucyhjb29yZHMpIHtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgaWYgKGNvb3Jkc1swXSAtIDEgPj0gMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSAtIDEsIGNvb3Jkc1sxXV0pO1xuICAgIH1cbiAgICBpZiAoY29vcmRzWzBdICsgMSA8PSAxMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSArIDEsIGNvb3Jkc1sxXV0pO1xuICAgIH1cbiAgICBpZiAoY29vcmRzWzFdIC0gMSA+PSAwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gLSAxXSk7XG4gICAgfVxuICAgIGlmIChjb29yZHNbMV0gKyAxIDw9IDEwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gKyAxXSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVhZGVyKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGRpdi5pbm5lclRleHQgPSAnQmF0dGxlc2hpcCc7XG4gICAgcmV0dXJuIGRpdjtcbn1cbiIsImltcG9ydCBwbGF5ZXIxZ3JpZCBmcm9tICcuL3BsYXllcjFncmlkJztcbmltcG9ydCBwbGF5ZXIyZ3JpZCBmcm9tICcuL3BsYXllcjJncmlkJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFpbihwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgY29uc3QgbWFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgICBjb25zdCBwMmdyaWQgPSBwbGF5ZXIyZ3JpZChwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgICBjb25zdCBwMWdyaWQgPSBwbGF5ZXIxZ3JpZChwbGF5ZXIxKTtcbiAgICBtYWluRGl2LmFwcGVuZENoaWxkKHAyZ3JpZCk7XG4gICAgbWFpbkRpdi5hcHBlbmRDaGlsZChwMWdyaWQpO1xuICAgIHJldHVybiBtYWluRGl2O1xufVxuIiwiaW1wb3J0IENvbXB1dGVyIGZyb20gJy4vY29tcHV0ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVCb2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoY29tcCA9IGZhbHNlLCBnYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCkpIHtcbiAgICAgICAgdGhpcy5nYW1lQm9hcmQgPSBnYW1lQm9hcmQ7XG4gICAgICAgIGlmIChjb21wKSB0aGlzLmNvbXAgPSBuZXcgQ29tcHV0ZXIoZ2FtZUJvYXJkKTtcbiAgICB9XG5cbiAgICAvLyAzIGRpZmZlcmVudCByZXR1cm5zLCBtaXNzLCBoaXQsIG9yIGFscmVhZHkgYXR0YWNrZWRcbiAgICBhdHRhY2soY2VsbCkge1xuICAgICAgICBpZiAoY2VsbC5vY2N1cGllZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3NbY2VsbC5jb29yZHNdID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGVuc3VyZXMgY29tcCBkb2Vzbid0IGF0dGFjayBzYW1lIHNxdWFyZSB0d2ljZVxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuY29tcCkgdGhpcy5nYW1lQm9hcmQubWlzc2VkQXR0YWNrc1tjZWxsLmNvb3Jkc10gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNlbGwuY29vcmRzIGluIHRoaXMuZ2FtZUJvYXJkLmhpdEF0dGFja3MpIHtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmNvbXApIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3NbY2VsbC5jb29yZHNdID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkLmhpdEF0dGFja3NbY2VsbC5jb29yZHNdID0gbnVsbDtcbiAgICAgICAgLy8gaWYgKHRoaXMuY29tcCkgdGhpcy5nYW1lQm9hcmQubWlzc2VkQXR0YWNrc1tjZWxsLmNvb3Jkc10gPSBudWxsO1xuICAgICAgICByZXR1cm4gMjtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbGF5ZXIxZ3JpZChwbGF5ZXIxKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcDFpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcDFpbmZvLmlubmVyVGV4dCA9ICdZb3VyIHNoaXBzJztcbiAgICBwMWluZm8uY2xhc3NOYW1lID0gJ2luZm8nO1xuICAgIGNvbnN0IHAxZ3JpZCA9IHBsYXllcjEuZ2FtZUJvYXJkLmdyaWQ7XG5cbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gJ3BsYXllcjEtZ3JpZCc7XG4gICAgcDFncmlkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgICAgIGNlbGwuaWQgPSBlLmNvb3JkcztcbiAgICAgICAgICAgIGlmIChlLmNvb3JkcyBpbiBwbGF5ZXIxLmdhbWVCb2FyZC5zaGlwTG9jYXRpb25zKVxuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZXknO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwMWluZm8pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHJldHVybiBjb250YWluZXI7XG59XG4iLCJpbXBvcnQgYXR0YWNrIGZyb20gJy4vYXR0YWNrJztcbmltcG9ydCBzdGF0dXMgZnJvbSAnLi9zdGF0dXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbGF5ZXIyZ3JpZChwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcDJpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcDJpbmZvLmlubmVyVGV4dCA9ICdFbmVteSBzaGlwcyc7XG4gICAgcDJpbmZvLmNsYXNzTmFtZSA9ICdpbmZvJztcbiAgICBjb25zdCBwMmdyaWQgPSBwbGF5ZXIyLmdhbWVCb2FyZC5ncmlkO1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc05hbWUgPSAncGxheWVyMi1ncmlkJztcbiAgICBjb25zdCBzdGF0dXNEaXYgPSBzdGF0dXMoKTtcbiAgICBwMmdyaWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ2NlbGwnO1xuICAgICAgICAgICAgY2VsbC5pZCA9IGUubmFtZTtcbiAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBhdHRhY2socGxheWVyMSwgcGxheWVyMiwgZSkpO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocDJpbmZvKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdHVzRGl2KTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFuZG9tQXR0YWNrKGNvb3Jkcykge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjb29yZHMpO1xuICAgIGNvbnN0IHJhbmRvbUNvb3JkcyA9IGtleXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICoga2V5cy5sZW5ndGgpXTtcbiAgICByZXR1cm4gW3JhbmRvbUNvb3Jkc1swXSwgcmFuZG9tQ29vcmRzWzJdXTtcbn1cbiIsIi8vIGNoZWNrcyB0byBzZWUgaWYgc2hpcCBsZW5ndGggY291bGQgZml0IGluIGdpdmVuIGNvb3JkaW5hdGVzIHJhbmdlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUxvY2F0aW9ucyhjb29yZHMsIHVzZWRDb29yZHMsIGxlbmd0aCkge1xuICAgIGNvbnN0IHZlcnRPcHRpb25zID0gW107XG4gICAgY29uc3QgaG9yaXpPcHRpb25zID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAvLyBjaGVjayB2ZXJ0aWNhbCBkb2Vzbid0IGdvIG9mZiB0aGUgYm9hcmQgYW5kIGhhc250IGFscmVhZHkgYmVlbiB1c2VkXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvb3Jkc1swXSArIGxlbmd0aCAtIDEgPD0gOSAmJlxuICAgICAgICAgICAgIShbY29vcmRzWzBdICsgaSwgY29vcmRzWzFdXSBpbiB1c2VkQ29vcmRzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZlcnRPcHRpb25zLnB1c2goW2Nvb3Jkc1swXSArIGksIGNvb3Jkc1sxXV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvb3Jkc1swXSAtIGxlbmd0aCArIDEgPj0gMCAmJlxuICAgICAgICAgICAgIShbY29vcmRzWzBdIC0gaSwgY29vcmRzWzFdXSBpbiB1c2VkQ29vcmRzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZlcnRPcHRpb25zLnB1c2goW2Nvb3Jkc1swXSAtIGksIGNvb3Jkc1sxXV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIGhvcml6b250YWwgZG9lc24ndCBnbyBvZmYgYm9hcmQgYW5kIGhhc250IGFscmVhZHkgYmVlbiB1c2VkXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvb3Jkc1sxXSArIGxlbmd0aCAtIDEgPD0gOSAmJlxuICAgICAgICAgICAgIShbY29vcmRzWzBdLCBjb29yZHNbMV0gKyBpXSBpbiB1c2VkQ29vcmRzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGhvcml6T3B0aW9ucy5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSArIGldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb29yZHNbMV0gLSBsZW5ndGggKyAxID49IDAgJiZcbiAgICAgICAgICAgICEoW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gaV0gaW4gdXNlZENvb3JkcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBob3Jpek9wdGlvbnMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gLSBpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmVydE9wdGlvbnMsIGhvcml6T3B0aW9ucyB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoLCBjb29yZHMgPSBbXSwgbnVtSGl0cyA9IDAsIHN1bmsgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5jb29yZHMgPSBjb29yZHM7XG4gICAgICAgIHRoaXMubnVtSGl0cyA9IG51bUhpdHM7XG4gICAgICAgIHRoaXMuc3VuayA9IHN1bms7XG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLm51bUhpdHMgKz0gMTtcbiAgICAgICAgaWYgKHRoaXMubnVtSGl0cyA9PT0gdGhpcy5sZW5ndGgpIHRoaXMuc3VuayA9IHRydWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IGNoZWNrTGVuZ3RoIGZyb20gJy4vY2hlY2tMZW5ndGgnO1xuaW1wb3J0IHJhbmRvbUxvY2F0aW9ucyBmcm9tICcuL3JhbmRvbUxvY2F0aW9ucyc7XG5cbmZ1bmN0aW9uIHJhbmRvbVZhbGlkTnVtKG1pbiwgbWF4KSB7XG4gICAgY29uc3QgbWluQ2VpbGQgPSBNYXRoLmNlaWwobWluKTtcbiAgICBjb25zdCBtYXhGbG9vcmVkID0gTWF0aC5mbG9vcihtYXgpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4Rmxvb3JlZCAtIG1pbkNlaWxkKSArIG1pbkNlaWxkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hpcFJhbmRvbWl6ZXIobGVuZ3RoLCBib2FyZCkge1xuICAgIGNvbnN0IHVzZWRDb29yZHMgPSBib2FyZC5zaGlwTG9jYXRpb25zO1xuICAgIGNvbnN0IGNvb3JkcyA9IHt9O1xuICAgIGNvbnN0IGNvb3JkMSA9IHJhbmRvbVZhbGlkTnVtKDAsIDkpO1xuICAgIGNvbnN0IGNvb3JkMiA9IHJhbmRvbVZhbGlkTnVtKDAsIDEwIC0gbGVuZ3RoKTtcbiAgICBpZiAoIShbY29vcmQxLCBjb29yZDJdIGluIHVzZWRDb29yZHMpKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSByYW5kb21Mb2NhdGlvbnMoW2Nvb3JkMSwgY29vcmQyXSwgdXNlZENvb3JkcywgbGVuZ3RoKTtcbiAgICAgICAgY29vcmRzW1tjb29yZDEsIGNvb3JkMl1dID0gbnVsbDtcbiAgICAgICAgY29uc29sZS5sb2coW2Nvb3JkMSwgY29vcmQyXSk7XG4gICAgICAgIGJvYXJkLm9jY3VweShbY29vcmQxLCBjb29yZDJdKTtcbiAgICAgICAgY29uc3QgYWRqU3F1YXJlcyA9IGNoZWNrTGVuZ3RoKFxuICAgICAgICAgICAgb3B0aW9ucy52ZXJ0T3B0aW9ucyxcbiAgICAgICAgICAgIG9wdGlvbnMuaG9yaXpPcHRpb25zXG4gICAgICAgICk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRqU3F1YXJlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29vcmRzW2FkalNxdWFyZXNbaV1dID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFkalNxdWFyZXNbaV0pO1xuICAgICAgICAgICAgYm9hcmQub2NjdXB5KFthZGpTcXVhcmVzW2ldXSk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY29vcmRzKS5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb29yZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcnVuIGFnYWluIGlmIHZhbGlkIGNvb3JkcyBhcmVuJ3QgZm91bmRcbiAgICBjb25zb2xlLmxvZygnYWdhaW4nKTtcbiAgICAvLyByZXR1cm4gc2hpcFJhbmRvbWl6ZXIobGVuZ3RoLCB1c2VkQ29vcmRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXR1cygpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gJ3N0YXR1cyc7XG4gICAgZGl2LmlubmVyVGV4dCA9ICcoQ2xpY2sgbG9jYXRpb24gYWJvdmUgdG8gYXR0YWNrKSc7XG4gICAgcmV0dXJuIGRpdjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zbGF0ZUNvb3Jkcyhjb29yZHMpIHtcbiAgICBjb25zdCBsZXR0ZXIgPSBjb29yZHNbMF0uY2hhckNvZGVBdCgpIC0gOTc7XG4gICAgY29uc3QgbnVtID0gY29vcmRzWzFdIC0gMTtcbiAgICByZXR1cm4gW2xldHRlciwgbnVtXTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBnYW1lTG9vcCBmcm9tICcuL2dhbWVMb29wJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgbWFpbiBmcm9tICcuL21haW4nO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmNvbnN0IHBsYXllcjEgPSBuZXcgUGxheWVyKCk7XG5jb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcih0cnVlKTtcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnRlbnQuaWQgPSAnY29udGVudCc7XG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIoKSk7XG5jb250ZW50LmFwcGVuZENoaWxkKG1haW4ocGxheWVyMSwgcGxheWVyMikpO1xuYm9keS5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuLy8gZ2FtZUxvb3AocGxheWVyMSwgcGxheWVyMik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=