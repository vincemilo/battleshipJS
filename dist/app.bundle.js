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
/* harmony import */ var _endTurn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endTurn */ "./src/endTurn.js");


// takes a clicked cell and updates the board and status bar accordingly as well as ends the turn
function attack(player1, player2, e) {
    // console.log(player1.comp);
    let status = '';
    let cell = '';
    if (player1.comp) {
        cell = document.getElementById(e.coords);
        status = document.querySelector('.status2');
    } else {
        cell = document.getElementById(e.name);
        status = document.querySelector('.status');
    }
    const attackStatus = player1.attack(e);
    if (attackStatus === 2) {
        player2.gameBoard.receiveAttack(e.coords);
        cell.style.backgroundColor = 'red';
        status.innerText = 'Hit!';
        const sunk = player2.gameBoard.latestSunk;
        if (sunk.length) {
            if (player1.comp) {
                status.innerText = `They sunk your ${sunk}!`;
            } else {
                status.innerText = `You sunk their ${sunk}!`;
            }
            player2.gameBoard.resetShipsSunk();
        }
        if (player2.gameBoard.allSunk) {
            if (player1.comp) {
                status.innerText += ' Game over! You lose!';
            } else {
                status.innerText += ' Game over! You win!';
            }
            const main = document.querySelector('main');
            const newMain = main.cloneNode(true);
            const content = document.getElementById('content');
            main.remove();
            content.appendChild(newMain);
        }
    } else if (attackStatus === 1) {
        status.innerText = 'Already attacked! Miss!';
    } else {
        status.innerText = 'Miss!';
        cell.style.backgroundColor = 'white';
    }

    (0,_endTurn__WEBPACK_IMPORTED_MODULE_0__["default"])(player1, player2);
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
/* harmony import */ var _generateOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateOptions */ "./src/generateOptions.js");


const prevOptions = {};

function checkAdjacent(hitCoords, missCoords) {
    let adjSquare = '';
    hitCoords.forEach((e) => {
        // const translated = translateCoords(e);
        const options = (0,_generateOptions__WEBPACK_IMPORTED_MODULE_0__["default"])([Number(e[0]), Number(e[2])]);
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

/***/ "./src/endTurn.js":
/*!************************!*\
  !*** ./src/endTurn.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ endTurn)
/* harmony export */ });
let turn = 0;

function endTurn(player1, player2) {
    if (player2.comp) {
        player2.comp.compAttack(player1, player2);
    }

    turn += 1;
    turn %= 2;
    return turn;
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
            {
                name: 'destroyer',
                length: 3,
                coords: (0,_shipRandomizer__WEBPACK_IMPORTED_MODULE_2__["default"])(3, this),
            },
            {
                name: 'submarine',
                length: 3,
                coords: (0,_shipRandomizer__WEBPACK_IMPORTED_MODULE_2__["default"])(3, this),
            },
            {
                name: 'patrol boat',
                length: 2,
                coords: (0,_shipRandomizer__WEBPACK_IMPORTED_MODULE_2__["default"])(2, this),
            },
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
        if (
            cell.occupied === false &&
            !(cell.coords in this.gameBoard.missedAttacks)
        ) {
            this.gameBoard.missedAttacks[cell.coords] = null;
            return 0;
        }
        if (
            cell.coords in this.gameBoard.hitAttacks ||
            cell.coords in this.gameBoard.missedAttacks
        ) {
            // ensures comp doesn't attack same square twice
            if (this.comp) this.gameBoard.missedAttacks[cell.coords] = null;
            return 1;
        }
        this.gameBoard.hitAttacks[cell.coords] = null;
        if (this.comp) this.gameBoard.missedAttacks[cell.coords] = null;
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
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./status */ "./src/status.js");


function player1grid(player1) {
    const container = document.createElement('div');
    const p1info = document.createElement('div');
    p1info.innerText = 'Your ships:';
    p1info.className = 'info';
    const p1grid = player1.gameBoard.grid;
    const statusDiv = (0,_status__WEBPACK_IMPORTED_MODULE_0__["default"])('status2');

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
    container.appendChild(statusDiv);
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
    p2info.innerText = 'Enemy ships:';
    p2info.className = 'info';
    const p2grid = player2.gameBoard.grid;
    const div = document.createElement('div');
    div.className = 'player2-grid';
    const statusDiv = (0,_status__WEBPACK_IMPORTED_MODULE_1__["default"])();
    statusDiv.innerText = '(Click location above to attack)';
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
class Ship {
    constructor(name, length, coords, numHits = 0, sunk = false) {
        this.name = name;
        this.length = length;
        this.numHits = numHits;
        this.sunk = sunk;
        this.coords = coords;
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
    const coords = {};
    const usedCoords = board.getShipLocs();
    const coord1 = randomValidNum(0, 9);
    const coord2 = randomValidNum(0, 9);
    if (!([coord1, coord2] in usedCoords)) {
        const options = (0,_randomLocations__WEBPACK_IMPORTED_MODULE_0__["default"])([coord1, coord2], usedCoords, length);
        if (options.length === length) {
            for (let i = 0; i < options.length; i += 1) {
                board.occupy(options[i]);
                coords[options[i]] = null;
            }
            return coords;
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
function status(name = 'status') {
    const div = document.createElement('div');
    div.className = name;
    return div;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsd0RBQVc7QUFDMUI7QUFDQTtBQUNBLGVBQWUsd0RBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsV0FBVyx3REFBVztBQUN0Qjs7Ozs7Ozs7Ozs7Ozs7O0FDNUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2JnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNERBQWU7QUFDdkM7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDekJlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ2tDO0FBQ0o7QUFDQTtBQUNKO0FBQ0w7O0FBRXJCLG9CQUFvQiwrQ0FBTTtBQUMxQixvQkFBb0IsK0NBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1EQUFNO0FBQzFCLG9CQUFvQixpREFBSTtBQUN4Qjs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXR0YWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY2hlY2tBZGphY2VudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NoZWNrTGVuZ3RoLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZW5kVHVybi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2VuZXJhdGVPcHRpb25zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVhZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcjFncmlkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyMmdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9yYW5kb21BdHRhY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9yYW5kb21Mb2NhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcFJhbmRvbWl6ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdGF0dXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IGVuZFR1cm4gZnJvbSAnLi9lbmRUdXJuJztcblxuLy8gdGFrZXMgYSBjbGlja2VkIGNlbGwgYW5kIHVwZGF0ZXMgdGhlIGJvYXJkIGFuZCBzdGF0dXMgYmFyIGFjY29yZGluZ2x5IGFzIHdlbGwgYXMgZW5kcyB0aGUgdHVyblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXR0YWNrKHBsYXllcjEsIHBsYXllcjIsIGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXIxLmNvbXApO1xuICAgIGxldCBzdGF0dXMgPSAnJztcbiAgICBsZXQgY2VsbCA9ICcnO1xuICAgIGlmIChwbGF5ZXIxLmNvbXApIHtcbiAgICAgICAgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUuY29vcmRzKTtcbiAgICAgICAgc3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1czInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS5uYW1lKTtcbiAgICAgICAgc3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgIH1cbiAgICBjb25zdCBhdHRhY2tTdGF0dXMgPSBwbGF5ZXIxLmF0dGFjayhlKTtcbiAgICBpZiAoYXR0YWNrU3RhdHVzID09PSAyKSB7XG4gICAgICAgIHBsYXllcjIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soZS5jb29yZHMpO1xuICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gJ0hpdCEnO1xuICAgICAgICBjb25zdCBzdW5rID0gcGxheWVyMi5nYW1lQm9hcmQubGF0ZXN0U3VuaztcbiAgICAgICAgaWYgKHN1bmsubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAocGxheWVyMS5jb21wKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9IGBUaGV5IHN1bmsgeW91ciAke3N1bmt9IWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5pbm5lclRleHQgPSBgWW91IHN1bmsgdGhlaXIgJHtzdW5rfSFgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheWVyMi5nYW1lQm9hcmQucmVzZXRTaGlwc1N1bmsoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxheWVyMi5nYW1lQm9hcmQuYWxsU3Vuaykge1xuICAgICAgICAgICAgaWYgKHBsYXllcjEuY29tcCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5pbm5lclRleHQgKz0gJyBHYW1lIG92ZXIhIFlvdSBsb3NlISc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5pbm5lclRleHQgKz0gJyBHYW1lIG92ZXIhIFlvdSB3aW4hJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgICAgICBjb25zdCBuZXdNYWluID0gbWFpbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcbiAgICAgICAgICAgIG1haW4ucmVtb3ZlKCk7XG4gICAgICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld01haW4pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChhdHRhY2tTdGF0dXMgPT09IDEpIHtcbiAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9ICdBbHJlYWR5IGF0dGFja2VkISBNaXNzISc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9ICdNaXNzISc7XG4gICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9XG5cbiAgICBlbmRUdXJuKHBsYXllcjEsIHBsYXllcjIpO1xufVxuIiwiaW1wb3J0IGdlbmVyYXRlT3B0aW9ucyBmcm9tICcuL2dlbmVyYXRlT3B0aW9ucyc7XG5cbmNvbnN0IHByZXZPcHRpb25zID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrQWRqYWNlbnQoaGl0Q29vcmRzLCBtaXNzQ29vcmRzKSB7XG4gICAgbGV0IGFkalNxdWFyZSA9ICcnO1xuICAgIGhpdENvb3Jkcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIC8vIGNvbnN0IHRyYW5zbGF0ZWQgPSB0cmFuc2xhdGVDb29yZHMoZSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBnZW5lcmF0ZU9wdGlvbnMoW051bWJlcihlWzBdKSwgTnVtYmVyKGVbMl0pXSk7XG4gICAgICAgIC8vIGNoZWNrIGlmIG9wdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGdlbmVyYXRlZCBvciBpcyBhIG1pc3NcbiAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIGlmICghKG9wdGlvbiBpbiBwcmV2T3B0aW9ucykgJiYgIShvcHRpb24gaW4gbWlzc0Nvb3JkcykpXG4gICAgICAgICAgICAgICAgcHJldk9wdGlvbnNbb3B0aW9uXSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcmV2T3B0aW9uc0tleXMgPSBPYmplY3Qua2V5cyhwcmV2T3B0aW9ucyk7XG4gICAgICAgIHByZXZPcHRpb25zS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWlzc0Nvb3Jkcykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcmV2T3B0aW9uc1trZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGpTcXVhcmUgPSBbTnVtYmVyKGtleVswXSksIE51bWJlcihrZXlbMl0pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFkalNxdWFyZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrTGVuZ3RoKG9wdGlvbnMsIGxlbmd0aCkge1xuICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29vcmRzLnB1c2gob3B0aW9uc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjb29yZHM7XG59XG4iLCJpbXBvcnQgY2hlY2tBZGphY2VudCBmcm9tICcuL2NoZWNrQWRqYWNlbnQnO1xuaW1wb3J0IGF0dGFjayBmcm9tICcuL2F0dGFjayc7XG5pbXBvcnQgcmFuZG9tQXR0YWNrIGZyb20gJy4vcmFuZG9tQXR0YWNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcHV0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVib2FyZCkge1xuICAgICAgICB0aGlzLmNvb3JkcyA9IHt9O1xuICAgICAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcbiAgICAgICAgdGhpcy5jcmVhdGVDb29yZHMoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVDb29yZHMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZHNbW2ksIGpdXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm5Db29yZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvb3JkcztcbiAgICB9XG5cbiAgICBjb21wQXR0YWNrKHBsYXllcjEsIHBsYXllcjIpIHtcbiAgICAgICAgbGV0IGF0dGFja0Nvb3JkcyA9IFtdO1xuICAgICAgICBjb25zdCBoaXRDb29yZHMgPSBPYmplY3Qua2V5cyhwbGF5ZXIyLmdhbWVCb2FyZC5oaXRBdHRhY2tzKTtcbiAgICAgICAgY29uc3QgbWlzc0Nvb3JkcyA9IHBsYXllcjIuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3M7XG4gICAgICAgIGlmIChoaXRDb29yZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBhZGphY2VudCA9IGNoZWNrQWRqYWNlbnQoaGl0Q29vcmRzLCBtaXNzQ29vcmRzKTtcbiAgICAgICAgICAgIGlmIChhZGphY2VudCkge1xuICAgICAgICAgICAgICAgIGF0dGFja0Nvb3JkcyA9IGFkamFjZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tDb29yZHMgPSByYW5kb21BdHRhY2sodGhpcy5jb29yZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXR0YWNrQ29vcmRzID0gcmFuZG9tQXR0YWNrKHRoaXMuY29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmVteUNlbGwgPVxuICAgICAgICAgICAgcGxheWVyMS5nYW1lQm9hcmQuZ3JpZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvb3Jkc1thdHRhY2tDb29yZHNdO1xuICAgICAgICBhdHRhY2socGxheWVyMiwgcGxheWVyMSwgZW5lbXlDZWxsKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVHcmlkKCkge1xuICAgIGNvbnN0IGdyaWQgPSBbXTtcbiAgICBjb25zdCByb3dzID0gMTA7XG4gICAgY29uc3QgY29sdW1zID0gMTA7XG4gICAgY29uc3QgbGV0dGVyID0gJ2FiY2RlZmdoaWonO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSArPSAxKSB7XG4gICAgICAgIGdyaWRbaV0gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2x1bXM7IGogKz0gMSkge1xuICAgICAgICAgICAgZ3JpZFtpXVtqXSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBsZXR0ZXJbaV0gKyAoaiArIDEpLFxuICAgICAgICAgICAgICAgIGNvb3JkczogW2ksIGpdLFxuICAgICAgICAgICAgICAgIG9jY3VwaWVkOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG59XG4iLCJsZXQgdHVybiA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuZFR1cm4ocGxheWVyMSwgcGxheWVyMikge1xuICAgIGlmIChwbGF5ZXIyLmNvbXApIHtcbiAgICAgICAgcGxheWVyMi5jb21wLmNvbXBBdHRhY2socGxheWVyMSwgcGxheWVyMik7XG4gICAgfVxuXG4gICAgdHVybiArPSAxO1xuICAgIHR1cm4gJT0gMjtcbiAgICByZXR1cm4gdHVybjtcbn1cbiIsImltcG9ydCBjcmVhdGVHcmlkIGZyb20gJy4vY3JlYXRlR3JpZCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHNoaXBSYW5kb21pemVyIGZyb20gJy4vc2hpcFJhbmRvbWl6ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdyaWQgPSBjcmVhdGVHcmlkKCk7XG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IHt9O1xuICAgICAgICB0aGlzLmhpdEF0dGFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5zaGlwc1N1bmsgPSAwO1xuICAgICAgICB0aGlzLmxhdGVzdFN1bmsgPSAnJztcbiAgICAgICAgdGhpcy5hbGxTdW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICAgICAgdGhpcy5zaGlwTG9jYXRpb25zID0ge307XG4gICAgICAgIHRoaXMucGxhY2VTaGlwcygpO1xuICAgIH1cblxuICAgIHJlc2V0U2hpcHNTdW5rKCkge1xuICAgICAgICB0aGlzLmxhdGVzdFN1bmsgPSAnJztcbiAgICB9XG5cbiAgICBzaG93R3JpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZDtcbiAgICB9XG5cbiAgICBnZXRTaGlwTG9jcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpcExvY2F0aW9ucztcbiAgICB9XG5cbiAgICBwbGFjZVNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2FycmllcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA1LFxuICAgICAgICAgICAgICAgIGNvb3Jkczogc2hpcFJhbmRvbWl6ZXIoNSwgdGhpcyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdiYXR0bGVzaGlwJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgICAgICAgICAgY29vcmRzOiBzaGlwUmFuZG9taXplcig0LCB0aGlzKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2Rlc3Ryb3llcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAzLFxuICAgICAgICAgICAgICAgIGNvb3Jkczogc2hpcFJhbmRvbWl6ZXIoMywgdGhpcyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzdWJtYXJpbmUnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMyxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHNoaXBSYW5kb21pemVyKDMsIHRoaXMpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncGF0cm9sIGJvYXQnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgICAgICAgICBjb29yZHM6IHNoaXBSYW5kb21pemVyKDIsIHRoaXMpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBzaGlwcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoZWxlbWVudC5uYW1lLCBlbGVtZW50Lmxlbmd0aCwgZWxlbWVudC5jb29yZHMpO1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvY2N1cHkoY29vcmRzKSB7XG4gICAgICAgIHRoaXMuc2hpcExvY2F0aW9uc1tjb29yZHNdID0gbnVsbDtcbiAgICAgICAgdGhpcy5ncmlkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5vY2N1cGllZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tpXTtcbiAgICAgICAgICAgIGlmIChhdHRhY2tDb29yZHMgaW4gc2hpcC5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICBzaGlwLmhpdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzaGlwLnN1bmspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXRlc3RTdW5rID0gc2hpcC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXBzU3VuayArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGlwc1N1bmsgPT09IDUpIHRoaXMuYWxsU3VuayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZUxvb3AocGxheWVyMSwgcGxheWVyMikge1xuICAgIGxldCB0dXJuID0gMDtcbiAgICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAvLyBwbGF5ZXIxLmdhbWVCb2FyZC5wbGFjZVNoaXBzKCk7XG4gICAgLy8gcGxheWVyMi5nYW1lQm9hcmQucGxhY2VTaGlwcygpO1xuICAgIHdoaWxlIChnYW1lT3ZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgdHVybiArPSAxO1xuICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0dXJuO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVPcHRpb25zKGNvb3Jkcykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBpZiAoY29vcmRzWzBdIC0gMSA+PSAwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdIC0gMSwgY29vcmRzWzFdXSk7XG4gICAgfVxuICAgIGlmIChjb29yZHNbMF0gKyAxIDw9IDEwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdICsgMSwgY29vcmRzWzFdXSk7XG4gICAgfVxuICAgIGlmIChjb29yZHNbMV0gLSAxID49IDApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSAtIDFdKTtcbiAgICB9XG4gICAgaWYgKGNvb3Jkc1sxXSArIDEgPD0gMTApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSArIDFdKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoZWFkZXIoKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgZGl2LmlubmVyVGV4dCA9ICdCYXR0bGVzaGlwJztcbiAgICByZXR1cm4gZGl2O1xufVxuIiwiaW1wb3J0IHBsYXllcjFncmlkIGZyb20gJy4vcGxheWVyMWdyaWQnO1xuaW1wb3J0IHBsYXllcjJncmlkIGZyb20gJy4vcGxheWVyMmdyaWQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWluKHBsYXllcjEsIHBsYXllcjIpIHtcbiAgICBjb25zdCBtYWluRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuICAgIGNvbnN0IHAyZ3JpZCA9IHBsYXllcjJncmlkKHBsYXllcjEsIHBsYXllcjIpO1xuICAgIGNvbnN0IHAxZ3JpZCA9IHBsYXllcjFncmlkKHBsYXllcjEpO1xuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQocDJncmlkKTtcbiAgICBtYWluRGl2LmFwcGVuZENoaWxkKHAxZ3JpZCk7XG4gICAgcmV0dXJuIG1haW5EaXY7XG59XG4iLCJpbXBvcnQgQ29tcHV0ZXIgZnJvbSAnLi9jb21wdXRlcic7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZUJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb21wID0gZmFsc2UsIGdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKSkge1xuICAgICAgICB0aGlzLmdhbWVCb2FyZCA9IGdhbWVCb2FyZDtcbiAgICAgICAgaWYgKGNvbXApIHRoaXMuY29tcCA9IG5ldyBDb21wdXRlcihnYW1lQm9hcmQpO1xuICAgIH1cblxuICAgIC8vIDMgZGlmZmVyZW50IHJldHVybnMsIG1pc3MsIGhpdCwgb3IgYWxyZWFkeSBhdHRhY2tlZFxuICAgIGF0dGFjayhjZWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNlbGwub2NjdXBpZWQgPT09IGZhbHNlICYmXG4gICAgICAgICAgICAhKGNlbGwuY29vcmRzIGluIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3MpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5nYW1lQm9hcmQubWlzc2VkQXR0YWNrc1tjZWxsLmNvb3Jkc10gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2VsbC5jb29yZHMgaW4gdGhpcy5nYW1lQm9hcmQuaGl0QXR0YWNrcyB8fFxuICAgICAgICAgICAgY2VsbC5jb29yZHMgaW4gdGhpcy5nYW1lQm9hcmQubWlzc2VkQXR0YWNrc1xuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGVuc3VyZXMgY29tcCBkb2Vzbid0IGF0dGFjayBzYW1lIHNxdWFyZSB0d2ljZVxuICAgICAgICAgICAgaWYgKHRoaXMuY29tcCkgdGhpcy5nYW1lQm9hcmQubWlzc2VkQXR0YWNrc1tjZWxsLmNvb3Jkc10gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lQm9hcmQuaGl0QXR0YWNrc1tjZWxsLmNvb3Jkc10gPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5jb21wKSB0aGlzLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgIHJldHVybiAyO1xuICAgIH1cbn1cbiIsImltcG9ydCBzdGF0dXMgZnJvbSAnLi9zdGF0dXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbGF5ZXIxZ3JpZChwbGF5ZXIxKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcDFpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcDFpbmZvLmlubmVyVGV4dCA9ICdZb3VyIHNoaXBzOic7XG4gICAgcDFpbmZvLmNsYXNzTmFtZSA9ICdpbmZvJztcbiAgICBjb25zdCBwMWdyaWQgPSBwbGF5ZXIxLmdhbWVCb2FyZC5ncmlkO1xuICAgIGNvbnN0IHN0YXR1c0RpdiA9IHN0YXR1cygnc3RhdHVzMicpO1xuXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSA9ICdwbGF5ZXIxLWdyaWQnO1xuICAgIHAxZ3JpZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG4gICAgICAgICAgICBjZWxsLmlkID0gZS5jb29yZHM7XG4gICAgICAgICAgICBpZiAoZS5jb29yZHMgaW4gcGxheWVyMS5nYW1lQm9hcmQuc2hpcExvY2F0aW9ucylcbiAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmV5JztcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocDFpbmZvKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhdHVzRGl2KTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuIiwiaW1wb3J0IGF0dGFjayBmcm9tICcuL2F0dGFjayc7XG5pbXBvcnQgc3RhdHVzIGZyb20gJy4vc3RhdHVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxheWVyMmdyaWQocGxheWVyMSwgcGxheWVyMikge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHAyaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHAyaW5mby5pbm5lclRleHQgPSAnRW5lbXkgc2hpcHM6JztcbiAgICBwMmluZm8uY2xhc3NOYW1lID0gJ2luZm8nO1xuICAgIGNvbnN0IHAyZ3JpZCA9IHBsYXllcjIuZ2FtZUJvYXJkLmdyaWQ7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSA9ICdwbGF5ZXIyLWdyaWQnO1xuICAgIGNvbnN0IHN0YXR1c0RpdiA9IHN0YXR1cygpO1xuICAgIHN0YXR1c0Rpdi5pbm5lclRleHQgPSAnKENsaWNrIGxvY2F0aW9uIGFib3ZlIHRvIGF0dGFjayknO1xuICAgIHAyZ3JpZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG4gICAgICAgICAgICBjZWxsLmlkID0gZS5uYW1lO1xuICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGF0dGFjayhwbGF5ZXIxLCBwbGF5ZXIyLCBlKSk7XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwMmluZm8pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGF0dXNEaXYpO1xuICAgIHJldHVybiBjb250YWluZXI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21BdHRhY2soY29vcmRzKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNvb3Jkcyk7XG4gICAgY29uc3QgcmFuZG9tQ29vcmRzID0ga2V5c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBrZXlzLmxlbmd0aCldO1xuICAgIHJldHVybiBbcmFuZG9tQ29vcmRzWzBdLCByYW5kb21Db29yZHNbMl1dO1xufVxuIiwiLy8gY2hlY2tzIHRvIHNlZSBpZiBzaGlwIGxlbmd0aCBjb3VsZCBmaXQgaW4gZ2l2ZW4gY29vcmRpbmF0ZXMgcmFuZ2VcblxuaW1wb3J0IGNoZWNrTGVuZ3RoIGZyb20gJy4vY2hlY2tMZW5ndGgnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21Mb2NhdGlvbnMoY29vcmRzLCB1c2VkQ29vcmRzLCBsZW5ndGgpIHtcbiAgICBjb25zdCB2ZXJ0T3B0aW9ucyA9IFtjb29yZHNdO1xuICAgIGNvbnN0IGhvcml6T3B0aW9ucyA9IFtjb29yZHNdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgLy8gY2hlY2sgdmVydGljYWwgZG9lc24ndCBnbyBvZmYgdGhlIGJvYXJkIGFuZCBoYXNudCBhbHJlYWR5IGJlZW4gdXNlZFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb29yZHNbMF0gKyBsZW5ndGggLSAxIDw9IDkgJiZcbiAgICAgICAgICAgICEoW2Nvb3Jkc1swXSArIGksIGNvb3Jkc1sxXV0gaW4gdXNlZENvb3JkcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB2ZXJ0T3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gKyBpLCBjb29yZHNbMV1dKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb29yZHNbMF0gLSBsZW5ndGggKyAxID49IDAgJiZcbiAgICAgICAgICAgICEoW2Nvb3Jkc1swXSAtIGksIGNvb3Jkc1sxXV0gaW4gdXNlZENvb3JkcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB2ZXJ0T3B0aW9ucy5wdXNoKFtjb29yZHNbMF0gLSBpLCBjb29yZHNbMV1dKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayBob3Jpem9udGFsIGRvZXNuJ3QgZ28gb2ZmIGJvYXJkIGFuZCBoYXNudCBhbHJlYWR5IGJlZW4gdXNlZFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb29yZHNbMV0gKyBsZW5ndGggLSAxIDw9IDkgJiZcbiAgICAgICAgICAgICEoW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgaV0gaW4gdXNlZENvb3JkcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBob3Jpek9wdGlvbnMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gKyBpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29vcmRzWzFdIC0gbGVuZ3RoICsgMSA+PSAwICYmXG4gICAgICAgICAgICAhKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSAtIGldIGluIHVzZWRDb29yZHMpXG4gICAgICAgICkge1xuICAgICAgICAgICAgaG9yaXpPcHRpb25zLnB1c2goW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh2ZXJ0T3B0aW9ucy5sZW5ndGggPiBob3Jpek9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBjaGVja0xlbmd0aCh2ZXJ0T3B0aW9ucywgbGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKGhvcml6T3B0aW9ucy5sZW5ndGggPiB2ZXJ0T3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrTGVuZ3RoKGhvcml6T3B0aW9ucywgbGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9ucyA9IFt2ZXJ0T3B0aW9ucywgaG9yaXpPcHRpb25zXTtcbiAgICBjb25zdCBjb2luVG9zcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgIHJldHVybiBjaGVja0xlbmd0aChvcHRpb25zW2NvaW5Ub3NzXSwgbGVuZ3RoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCwgY29vcmRzLCBudW1IaXRzID0gMCwgc3VuayA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm51bUhpdHMgPSBudW1IaXRzO1xuICAgICAgICB0aGlzLnN1bmsgPSBzdW5rO1xuICAgICAgICB0aGlzLmNvb3JkcyA9IGNvb3JkcztcbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMubnVtSGl0cyArPSAxO1xuICAgICAgICBpZiAodGhpcy5udW1IaXRzID09PSB0aGlzLmxlbmd0aCkgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgcmFuZG9tTG9jYXRpb25zIGZyb20gJy4vcmFuZG9tTG9jYXRpb25zJztcblxuZnVuY3Rpb24gcmFuZG9tVmFsaWROdW0obWluLCBtYXgpIHtcbiAgICBjb25zdCBtaW5DZWlsZCA9IE1hdGguY2VpbChtaW4pO1xuICAgIGNvbnN0IG1heEZsb29yZWQgPSBNYXRoLmZsb29yKG1heCk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhGbG9vcmVkIC0gbWluQ2VpbGQpICsgbWluQ2VpbGQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaGlwUmFuZG9taXplcihsZW5ndGgsIGJvYXJkKSB7XG4gICAgY29uc3QgY29vcmRzID0ge307XG4gICAgY29uc3QgdXNlZENvb3JkcyA9IGJvYXJkLmdldFNoaXBMb2NzKCk7XG4gICAgY29uc3QgY29vcmQxID0gcmFuZG9tVmFsaWROdW0oMCwgOSk7XG4gICAgY29uc3QgY29vcmQyID0gcmFuZG9tVmFsaWROdW0oMCwgOSk7XG4gICAgaWYgKCEoW2Nvb3JkMSwgY29vcmQyXSBpbiB1c2VkQ29vcmRzKSkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gcmFuZG9tTG9jYXRpb25zKFtjb29yZDEsIGNvb3JkMl0sIHVzZWRDb29yZHMsIGxlbmd0aCk7XG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBib2FyZC5vY2N1cHkob3B0aW9uc1tpXSk7XG4gICAgICAgICAgICAgICAgY29vcmRzW29wdGlvbnNbaV1dID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb29yZHM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcnVuIGFnYWluIGlmIHZhbGlkIGNvb3JkcyBhcmVuJ3QgZm91bmRcbiAgICByZXR1cm4gc2hpcFJhbmRvbWl6ZXIobGVuZ3RoLCBib2FyZCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGF0dXMobmFtZSA9ICdzdGF0dXMnKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTmFtZSA9IG5hbWU7XG4gICAgcmV0dXJuIGRpdjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBnYW1lTG9vcCBmcm9tICcuL2dhbWVMb29wJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi9oZWFkZXInO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgbWFpbiBmcm9tICcuL21haW4nO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmNvbnN0IHBsYXllcjEgPSBuZXcgUGxheWVyKCk7XG5jb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcih0cnVlKTtcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnRlbnQuaWQgPSAnY29udGVudCc7XG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIoKSk7XG5jb250ZW50LmFwcGVuZENoaWxkKG1haW4ocGxheWVyMSwgcGxheWVyMikpO1xuYm9keS5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuLy8gZ2FtZUxvb3AocGxheWVyMSwgcGxheWVyMik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=