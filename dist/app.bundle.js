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
function checkLength(vert, horiz, board) {
    let options = [vert, horiz];
    console.log(vert);
    if (vert.length > horiz.length) {
        options = vert;
    } else if (vert.length < horiz.length) {
        options = horiz;
    } else {
        const coinToss = Math.floor(Math.random() * 2);
        options = options[coinToss];
    }
    console.log(board.getShipLocs());
    console.log(options);
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
        // this.placeShips();
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
    let usedCoords = board.shipLocations;
    console.log(usedCoords);
    const coords = {};
    const coord1 = randomValidNum(0, 9);
    const coord2 = randomValidNum(0, 10 - length);
    if (!([coord1, coord2] in usedCoords)) {
        const options = (0,_randomLocations__WEBPACK_IMPORTED_MODULE_1__["default"])([coord1, coord2], usedCoords, length);
        coords[[coord1, coord2]] = null;
        board.occupy([coord1, coord2]);
        const adjSquares = (0,_checkLength__WEBPACK_IMPORTED_MODULE_0__["default"])(
            options.vertOptions,
            options.horizOptions,
            board
        );
        usedCoords = board.getShipLocs();
        for (let i = 0; i < adjSquares.length; i += 1) {
            console.log(coords[adjSquares[i]] in usedCoords);
            coords[adjSquares[i]] = null;
            board.occupy(adjSquares[i]);
            if (Object.keys(coords).length === length) {
                return coords;
            }
        }
    }
    // run again if valid coords aren't found
    console.log('again');

    usedCoords = board.getShipLocs();
    return shipRandomizer(length, usedCoords);
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

(0,_gameLoop__WEBPACK_IMPORTED_MODULE_0__["default"])(player1, player2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSx3QkFBd0IsNERBQWU7QUFDdkM7QUFDQTtBQUNBLDJCQUEyQix3REFBVztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0xlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ2tDO0FBQ0o7QUFDQTtBQUNKO0FBQ0w7O0FBRXJCLG9CQUFvQiwrQ0FBTTtBQUMxQixvQkFBb0IsK0NBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1EQUFNO0FBQzFCLG9CQUFvQixpREFBSTtBQUN4Qjs7QUFFQSxxREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXR0YWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2hlY2tBZGphY2VudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NoZWNrTGVuZ3RoLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nZW5lcmF0ZU9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyMWdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIyZ3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3JhbmRvbUF0dGFjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3JhbmRvbUxvY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwUmFuZG9taXplci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0YXR1cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3RyYW5zbGF0ZUNvb3Jkcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBpbXBvcnQgZW5kVHVybiBmcm9tICcuL2VuZFR1cm4nO1xuXG4vLyB0YWtlcyBhIGNsaWNrZWQgY2VsbCBhbmQgdXBkYXRlcyB0aGUgYm9hcmQgYW5kIHN0YXR1cyBiYXIgYWNjb3JkaW5nbHkgYXMgd2VsbCBhcyBlbmRzIHRoZSB0dXJuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhdHRhY2socGxheWVyMSwgcGxheWVyMiwgZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKHBsYXllcjEuY29tcCk7XG4gICAgY29uc3Qgc3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgIGxldCBjZWxsID0gJyc7XG4gICAgaWYgKHBsYXllcjEuY29tcCkge1xuICAgICAgICBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS5jb29yZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLm5hbWUpO1xuICAgIH1cbiAgICBpZiAocGxheWVyMS5hdHRhY2soZSkgPT09IDIpIHtcbiAgICAgICAgcGxheWVyMi5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhlLm5hbWUpO1xuICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gJ0hpdCEnO1xuICAgICAgICBjb25zdCBzdW5rID0gcGxheWVyMi5nYW1lQm9hcmQubGF0ZXN0U3VuaztcbiAgICAgICAgaWYgKHN1bmsubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gYFlvdSBzdW5rIHRoZWlyICR7c3Vua30hYDtcbiAgICAgICAgICAgIHBsYXllcjIuZ2FtZUJvYXJkLnJlc2V0U2hpcHNTdW5rKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXllcjIuZ2FtZUJvYXJkLmFsbFN1bmspIHtcbiAgICAgICAgICAgIHN0YXR1cy5pbm5lclRleHQgKz0gJyBHYW1lIG92ZXIhJztcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGxheWVyMS5hdHRhY2soZSkgPT09IDEpIHtcbiAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9ICdBbHJlYWR5IGF0dGFja2VkISBNaXNzISc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9ICdNaXNzISc7XG4gICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9XG5cbiAgICAvLyBlbmRUdXJuKHBsYXllcjEsIHBsYXllcjIpO1xufVxuIiwiaW1wb3J0IHRyYW5zbGF0ZUNvb3JkcyBmcm9tICcuL3RyYW5zbGF0ZUNvb3Jkcyc7XG5pbXBvcnQgZ2VuZXJhdGVPcHRpb25zIGZyb20gJy4vZ2VuZXJhdGVPcHRpb25zJztcblxuY29uc3QgcHJldk9wdGlvbnMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tBZGphY2VudChoaXRDb29yZHMsIG1pc3NDb29yZHMpIHtcbiAgICBsZXQgYWRqU3F1YXJlID0gJyc7XG4gICAgaGl0Q29vcmRzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlZCA9IHRyYW5zbGF0ZUNvb3JkcyhlKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGdlbmVyYXRlT3B0aW9ucyh0cmFuc2xhdGVkKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgb3B0aW9uIGhhcyBhbHJlYWR5IGJlZW4gZ2VuZXJhdGVkIG9yIGlzIGEgbWlzc1xuICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKCEob3B0aW9uIGluIHByZXZPcHRpb25zKSAmJiAhKG9wdGlvbiBpbiBtaXNzQ29vcmRzKSlcbiAgICAgICAgICAgICAgICBwcmV2T3B0aW9uc1tvcHRpb25dID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHByZXZPcHRpb25zS2V5cyA9IE9iamVjdC5rZXlzKHByZXZPcHRpb25zKTtcbiAgICAgICAgcHJldk9wdGlvbnNLZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiBtaXNzQ29vcmRzKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHByZXZPcHRpb25zW2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkalNxdWFyZSA9IFtOdW1iZXIoa2V5WzBdKSwgTnVtYmVyKGtleVsyXSldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWRqU3F1YXJlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tMZW5ndGgodmVydCwgaG9yaXosIGJvYXJkKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBbdmVydCwgaG9yaXpdO1xuICAgIGNvbnNvbGUubG9nKHZlcnQpO1xuICAgIGlmICh2ZXJ0Lmxlbmd0aCA+IGhvcml6Lmxlbmd0aCkge1xuICAgICAgICBvcHRpb25zID0gdmVydDtcbiAgICB9IGVsc2UgaWYgKHZlcnQubGVuZ3RoIDwgaG9yaXoubGVuZ3RoKSB7XG4gICAgICAgIG9wdGlvbnMgPSBob3JpejtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjb2luVG9zcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9uc1tjb2luVG9zc107XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGJvYXJkLmdldFNoaXBMb2NzKCkpO1xuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuICAgIHJldHVybiBvcHRpb25zO1xufVxuIiwiaW1wb3J0IGNoZWNrQWRqYWNlbnQgZnJvbSAnLi9jaGVja0FkamFjZW50JztcbmltcG9ydCBhdHRhY2sgZnJvbSAnLi9hdHRhY2snO1xuaW1wb3J0IHJhbmRvbUF0dGFjayBmcm9tICcuL3JhbmRvbUF0dGFjayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXB1dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lYm9hcmQpIHtcbiAgICAgICAgdGhpcy5jb29yZHMgPSB7fTtcbiAgICAgICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gICAgICAgIHRoaXMuY3JlYXRlQ29vcmRzKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlQ29vcmRzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzW1tpLCBqXV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuQ29vcmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb29yZHM7XG4gICAgfVxuXG4gICAgY29tcEF0dGFjayhwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgICAgIGxldCBhdHRhY2tDb29yZHMgPSBbXTtcbiAgICAgICAgY29uc3QgaGl0Q29vcmRzID0gT2JqZWN0LmtleXMocGxheWVyMi5nYW1lQm9hcmQuaGl0QXR0YWNrcyk7XG4gICAgICAgIGNvbnN0IG1pc3NDb29yZHMgPSBwbGF5ZXIyLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzO1xuICAgICAgICBpZiAoaGl0Q29vcmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgYWRqYWNlbnQgPSBjaGVja0FkamFjZW50KGhpdENvb3JkcywgbWlzc0Nvb3Jkcyk7XG4gICAgICAgICAgICBpZiAoYWRqYWNlbnQpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tDb29yZHMgPSBhZGphY2VudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0YWNrQ29vcmRzID0gcmFuZG9tQXR0YWNrKHRoaXMuY29vcmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF0dGFja0Nvb3JkcyA9IHJhbmRvbUF0dGFjayh0aGlzLmNvb3Jkcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5lbXlDZWxsID1cbiAgICAgICAgICAgIHBsYXllcjEuZ2FtZUJvYXJkLmdyaWRbYXR0YWNrQ29vcmRzWzBdXVthdHRhY2tDb29yZHNbMV1dO1xuICAgICAgICBkZWxldGUgdGhpcy5jb29yZHNbYXR0YWNrQ29vcmRzXTtcbiAgICAgICAgYXR0YWNrKHBsYXllcjIsIHBsYXllcjEsIGVuZW15Q2VsbCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcbiAgICBjb25zdCBncmlkID0gW107XG4gICAgY29uc3Qgcm93cyA9IDEwO1xuICAgIGNvbnN0IGNvbHVtcyA9IDEwO1xuICAgIGNvbnN0IGxldHRlciA9ICdhYmNkZWZnaGlqJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkgKz0gMSkge1xuICAgICAgICBncmlkW2ldID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1zOyBqICs9IDEpIHtcbiAgICAgICAgICAgIGdyaWRbaV1bal0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogbGV0dGVyW2ldICsgKGogKyAxKSxcbiAgICAgICAgICAgICAgICBjb29yZHM6IFtpLCBqXSxcbiAgICAgICAgICAgICAgICBvY2N1cGllZDogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuIiwiaW1wb3J0IGNyZWF0ZUdyaWQgZnJvbSAnLi9jcmVhdGVHcmlkJztcbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgc2hpcFJhbmRvbWl6ZXIgZnJvbSAnLi9zaGlwUmFuZG9taXplcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ3JpZCA9IGNyZWF0ZUdyaWQoKTtcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzID0ge307XG4gICAgICAgIHRoaXMuaGl0QXR0YWNrcyA9IHt9O1xuICAgICAgICB0aGlzLnNoaXBzU3VuayA9IDA7XG4gICAgICAgIHRoaXMubGF0ZXN0U3VuayA9ICcnO1xuICAgICAgICB0aGlzLmFsbFN1bmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgICAgICB0aGlzLnNoaXBMb2NhdGlvbnMgPSB7fTtcbiAgICAgICAgLy8gdGhpcy5wbGFjZVNoaXBzKCk7XG4gICAgfVxuXG4gICAgcmVzZXRTaGlwc1N1bmsoKSB7XG4gICAgICAgIHRoaXMubGF0ZXN0U3VuayA9ICcnO1xuICAgIH1cblxuICAgIHNob3dHcmlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ncmlkO1xuICAgIH1cblxuICAgIGdldFNoaXBMb2NzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGlwTG9jYXRpb25zO1xuICAgIH1cblxuICAgIHBsYWNlU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdjYXJyaWVyJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDUsXG4gICAgICAgICAgICAgICAgY29vcmRzOiBzaGlwUmFuZG9taXplcig1LCB0aGlzKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogNCxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHNoaXBSYW5kb21pemVyKDQsIHRoaXMpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgICBuYW1lOiAnZGVzdHJveWVyJyxcbiAgICAgICAgICAgIC8vICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgICAvLyAgICAgY29vcmRzOiBzaGlwUmFuZG9taXplcigzKSxcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICAgbmFtZTogJ3N1Ym1hcmluZScsXG4gICAgICAgICAgICAvLyAgICAgbGVuZ3RoOiAzLFxuICAgICAgICAgICAgLy8gICAgIGNvb3Jkczogc2hpcFJhbmRvbWl6ZXIoMyksXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICAgIG5hbWU6ICdwYXRyb2wgYm9hdCcsXG4gICAgICAgICAgICAvLyAgICAgbGVuZ3RoOiAyLFxuICAgICAgICAgICAgLy8gICAgIGNvb3Jkczogc2hpcFJhbmRvbWl6ZXIoMiksXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHNoaXBzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChlbGVtZW50Lm5hbWUsIGVsZW1lbnQubGVuZ3RoLCBlbGVtZW50LmNvb3Jkcyk7XG4gICAgICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9jY3VweShjb29yZHMpIHtcbiAgICAgICAgdGhpcy5zaGlwTG9jYXRpb25zW2Nvb3Jkc10gPSBudWxsO1xuICAgICAgICB0aGlzLmdyaWRbY29vcmRzWzBdXVtjb29yZHNbMV1dLm9jY3VwaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3Jkcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLnNoaXBzW2ldO1xuICAgICAgICAgICAgaWYgKGF0dGFja0Nvb3JkcyBpbiBzaGlwLmNvb3Jkcykge1xuICAgICAgICAgICAgICAgIHNoaXAuaGl0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuc3Vuaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdGVzdFN1bmsgPSBzaGlwLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcHNTdW5rICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaXBzU3VuayA9PT0gNSkgdGhpcy5hbGxTdW5rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lTG9vcChwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgbGV0IHR1cm4gPSAwO1xuICAgIGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuICAgIC8vIHBsYXllcjEuZ2FtZUJvYXJkLnBsYWNlU2hpcHMoKTtcbiAgICAvLyBwbGF5ZXIyLmdhbWVCb2FyZC5wbGFjZVNoaXBzKCk7XG4gICAgd2hpbGUgKGdhbWVPdmVyID09PSBmYWxzZSkge1xuICAgICAgICB0dXJuICs9IDE7XG4gICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHR1cm47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZU9wdGlvbnMoY29vcmRzKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGlmIChjb29yZHNbMF0gLSAxID49IDApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gLSAxLCBjb29yZHNbMV1dKTtcbiAgICB9XG4gICAgaWYgKGNvb3Jkc1swXSArIDEgPD0gMTApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gKyAxLCBjb29yZHNbMV1dKTtcbiAgICB9XG4gICAgaWYgKGNvb3Jkc1sxXSAtIDEgPj0gMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gMV0pO1xuICAgIH1cbiAgICBpZiAoY29vcmRzWzFdICsgMSA8PSAxMCkge1xuICAgICAgICBvcHRpb25zLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgMV0pO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBkaXYuaW5uZXJUZXh0ID0gJ0JhdHRsZXNoaXAnO1xuICAgIHJldHVybiBkaXY7XG59XG4iLCJpbXBvcnQgcGxheWVyMWdyaWQgZnJvbSAnLi9wbGF5ZXIxZ3JpZCc7XG5pbXBvcnQgcGxheWVyMmdyaWQgZnJvbSAnLi9wbGF5ZXIyZ3JpZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1haW4ocGxheWVyMSwgcGxheWVyMikge1xuICAgIGNvbnN0IG1haW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJyk7XG4gICAgY29uc3QgcDJncmlkID0gcGxheWVyMmdyaWQocGxheWVyMSwgcGxheWVyMik7XG4gICAgY29uc3QgcDFncmlkID0gcGxheWVyMWdyaWQocGxheWVyMSk7XG4gICAgbWFpbkRpdi5hcHBlbmRDaGlsZChwMmdyaWQpO1xuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQocDFncmlkKTtcbiAgICByZXR1cm4gbWFpbkRpdjtcbn1cbiIsImltcG9ydCBDb21wdXRlciBmcm9tICcuL2NvbXB1dGVyJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lQm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbXAgPSBmYWxzZSwgZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpKSB7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkO1xuICAgICAgICBpZiAoY29tcCkgdGhpcy5jb21wID0gbmV3IENvbXB1dGVyKGdhbWVCb2FyZCk7XG4gICAgfVxuXG4gICAgLy8gMyBkaWZmZXJlbnQgcmV0dXJucywgbWlzcywgaGl0LCBvciBhbHJlYWR5IGF0dGFja2VkXG4gICAgYXR0YWNrKGNlbGwpIHtcbiAgICAgICAgaWYgKGNlbGwub2NjdXBpZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgICAgICAvLyBlbnN1cmVzIGNvbXAgZG9lc24ndCBhdHRhY2sgc2FtZSBzcXVhcmUgdHdpY2VcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmNvbXApIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3NbY2VsbC5jb29yZHNdID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZWxsLmNvb3JkcyBpbiB0aGlzLmdhbWVCb2FyZC5oaXRBdHRhY2tzKSB7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5jb21wKSB0aGlzLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdhbWVCb2FyZC5oaXRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgIC8vIGlmICh0aGlzLmNvbXApIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3NbY2VsbC5jb29yZHNdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxheWVyMWdyaWQocGxheWVyMSkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHAxaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHAxaW5mby5pbm5lclRleHQgPSAnWW91ciBzaGlwcyc7XG4gICAgcDFpbmZvLmNsYXNzTmFtZSA9ICdpbmZvJztcbiAgICBjb25zdCBwMWdyaWQgPSBwbGF5ZXIxLmdhbWVCb2FyZC5ncmlkO1xuXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSA9ICdwbGF5ZXIxLWdyaWQnO1xuICAgIHAxZ3JpZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG4gICAgICAgICAgICBjZWxsLmlkID0gZS5jb29yZHM7XG4gICAgICAgICAgICBpZiAoZS5jb29yZHMgaW4gcGxheWVyMS5nYW1lQm9hcmQuc2hpcExvY2F0aW9ucylcbiAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmV5JztcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocDFpbmZvKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuIiwiaW1wb3J0IGF0dGFjayBmcm9tICcuL2F0dGFjayc7XG5pbXBvcnQgc3RhdHVzIGZyb20gJy4vc3RhdHVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxheWVyMmdyaWQocGxheWVyMSwgcGxheWVyMikge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHAyaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHAyaW5mby5pbm5lclRleHQgPSAnRW5lbXkgc2hpcHMnO1xuICAgIHAyaW5mby5jbGFzc05hbWUgPSAnaW5mbyc7XG4gICAgY29uc3QgcDJncmlkID0gcGxheWVyMi5nYW1lQm9hcmQuZ3JpZDtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gJ3BsYXllcjItZ3JpZCc7XG4gICAgY29uc3Qgc3RhdHVzRGl2ID0gc3RhdHVzKCk7XG4gICAgcDJncmlkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgICAgIGNlbGwuaWQgPSBlLm5hbWU7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gYXR0YWNrKHBsYXllcjEsIHBsYXllcjIsIGUpKTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHAyaW5mbyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXR1c0Rpdik7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUF0dGFjayhjb29yZHMpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY29vcmRzKTtcbiAgICBjb25zdCByYW5kb21Db29yZHMgPSBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV07XG4gICAgcmV0dXJuIFtyYW5kb21Db29yZHNbMF0sIHJhbmRvbUNvb3Jkc1syXV07XG59XG4iLCIvLyBjaGVja3MgdG8gc2VlIGlmIHNoaXAgbGVuZ3RoIGNvdWxkIGZpdCBpbiBnaXZlbiBjb29yZGluYXRlcyByYW5nZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21Mb2NhdGlvbnMoY29vcmRzLCB1c2VkQ29vcmRzLCBsZW5ndGgpIHtcbiAgICBjb25zdCB2ZXJ0T3B0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGhvcml6T3B0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgLy8gY2hlY2sgdmVydGljYWwgZG9lc24ndCBnbyBvZmYgdGhlIGJvYXJkIGFuZCBoYXNudCBhbHJlYWR5IGJlZW4gdXNlZFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb29yZHNbMF0gKyBsZW5ndGggLSAxIDw9IDkgJiZcbiAgICAgICAgICAgICEoW2Nvb3Jkc1swXSArIGksIGNvb3Jkc1sxXV0gaW4gdXNlZENvb3JkcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB2ZXJ0T3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gKyBpLCBjb29yZHNbMV1dKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb29yZHNbMF0gLSBsZW5ndGggKyAxID49IDAgJiZcbiAgICAgICAgICAgICEoW2Nvb3Jkc1swXSAtIGksIGNvb3Jkc1sxXV0gaW4gdXNlZENvb3JkcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB2ZXJ0T3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gLSBpLCBjb29yZHNbMV1dKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayBob3Jpem9udGFsIGRvZXNuJ3QgZ28gb2ZmIGJvYXJkIGFuZCBoYXNudCBhbHJlYWR5IGJlZW4gdXNlZFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb29yZHNbMV0gKyBsZW5ndGggLSAxIDw9IDkgJiZcbiAgICAgICAgICAgICEoW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgaV0gaW4gdXNlZENvb3JkcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBob3Jpek9wdGlvbnMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gKyBpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29vcmRzWzFdIC0gbGVuZ3RoICsgMSA+PSAwICYmXG4gICAgICAgICAgICAhKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSAtIGldIGluIHVzZWRDb29yZHMpXG4gICAgICAgICkge1xuICAgICAgICAgICAgaG9yaXpPcHRpb25zLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IHZlcnRPcHRpb25zLCBob3Jpek9wdGlvbnMgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCwgY29vcmRzID0gW10sIG51bUhpdHMgPSAwLCBzdW5rID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuY29vcmRzID0gY29vcmRzO1xuICAgICAgICB0aGlzLm51bUhpdHMgPSBudW1IaXRzO1xuICAgICAgICB0aGlzLnN1bmsgPSBzdW5rO1xuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5udW1IaXRzICs9IDE7XG4gICAgICAgIGlmICh0aGlzLm51bUhpdHMgPT09IHRoaXMubGVuZ3RoKSB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIH1cbn1cbiIsImltcG9ydCBjaGVja0xlbmd0aCBmcm9tICcuL2NoZWNrTGVuZ3RoJztcbmltcG9ydCByYW5kb21Mb2NhdGlvbnMgZnJvbSAnLi9yYW5kb21Mb2NhdGlvbnMnO1xuXG5mdW5jdGlvbiByYW5kb21WYWxpZE51bShtaW4sIG1heCkge1xuICAgIGNvbnN0IG1pbkNlaWxkID0gTWF0aC5jZWlsKG1pbik7XG4gICAgY29uc3QgbWF4Rmxvb3JlZCA9IE1hdGguZmxvb3IobWF4KTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heEZsb29yZWQgLSBtaW5DZWlsZCkgKyBtaW5DZWlsZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXBSYW5kb21pemVyKGxlbmd0aCwgYm9hcmQpIHtcbiAgICBsZXQgdXNlZENvb3JkcyA9IGJvYXJkLnNoaXBMb2NhdGlvbnM7XG4gICAgY29uc29sZS5sb2codXNlZENvb3Jkcyk7XG4gICAgY29uc3QgY29vcmRzID0ge307XG4gICAgY29uc3QgY29vcmQxID0gcmFuZG9tVmFsaWROdW0oMCwgOSk7XG4gICAgY29uc3QgY29vcmQyID0gcmFuZG9tVmFsaWROdW0oMCwgMTAgLSBsZW5ndGgpO1xuICAgIGlmICghKFtjb29yZDEsIGNvb3JkMl0gaW4gdXNlZENvb3JkcykpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHJhbmRvbUxvY2F0aW9ucyhbY29vcmQxLCBjb29yZDJdLCB1c2VkQ29vcmRzLCBsZW5ndGgpO1xuICAgICAgICBjb29yZHNbW2Nvb3JkMSwgY29vcmQyXV0gPSBudWxsO1xuICAgICAgICBib2FyZC5vY2N1cHkoW2Nvb3JkMSwgY29vcmQyXSk7XG4gICAgICAgIGNvbnN0IGFkalNxdWFyZXMgPSBjaGVja0xlbmd0aChcbiAgICAgICAgICAgIG9wdGlvbnMudmVydE9wdGlvbnMsXG4gICAgICAgICAgICBvcHRpb25zLmhvcml6T3B0aW9ucyxcbiAgICAgICAgICAgIGJvYXJkXG4gICAgICAgICk7XG4gICAgICAgIHVzZWRDb29yZHMgPSBib2FyZC5nZXRTaGlwTG9jcygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkalNxdWFyZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvb3Jkc1thZGpTcXVhcmVzW2ldXSBpbiB1c2VkQ29vcmRzKTtcbiAgICAgICAgICAgIGNvb3Jkc1thZGpTcXVhcmVzW2ldXSA9IG51bGw7XG4gICAgICAgICAgICBib2FyZC5vY2N1cHkoYWRqU3F1YXJlc1tpXSk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY29vcmRzKS5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb29yZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcnVuIGFnYWluIGlmIHZhbGlkIGNvb3JkcyBhcmVuJ3QgZm91bmRcbiAgICBjb25zb2xlLmxvZygnYWdhaW4nKTtcblxuICAgIHVzZWRDb29yZHMgPSBib2FyZC5nZXRTaGlwTG9jcygpO1xuICAgIHJldHVybiBzaGlwUmFuZG9taXplcihsZW5ndGgsIHVzZWRDb29yZHMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhdHVzKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc05hbWUgPSAnc3RhdHVzJztcbiAgICBkaXYuaW5uZXJUZXh0ID0gJyhDbGljayBsb2NhdGlvbiBhYm92ZSB0byBhdHRhY2spJztcbiAgICByZXR1cm4gZGl2O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNsYXRlQ29vcmRzKGNvb3Jkcykge1xuICAgIGNvbnN0IGxldHRlciA9IGNvb3Jkc1swXS5jaGFyQ29kZUF0KCkgLSA5NztcbiAgICBjb25zdCBudW0gPSBjb29yZHNbMV0gLSAxO1xuICAgIHJldHVybiBbbGV0dGVyLCBudW1dO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGdhbWVMb29wIGZyb20gJy4vZ2FtZUxvb3AnO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL2hlYWRlcic7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBtYWluIGZyb20gJy4vbWFpbic7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoKTtcbmNvbnN0IHBsYXllcjIgPSBuZXcgUGxheWVyKHRydWUpO1xuY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29udGVudC5pZCA9ICdjb250ZW50JztcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5jb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcigpKTtcbmNvbnRlbnQuYXBwZW5kQ2hpbGQobWFpbihwbGF5ZXIxLCBwbGF5ZXIyKSk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG5nYW1lTG9vcChwbGF5ZXIxLCBwbGF5ZXIyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==