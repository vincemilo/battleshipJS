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
/* harmony import */ var _gameOver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameOver */ "./src/gameOver.js");



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
            return (0,_gameOver__WEBPACK_IMPORTED_MODULE_1__["default"])();
        }
    } else if (attackStatus === 1) {
        status.innerText = 'Already attacked! Miss!';
    } else {
        status.innerText = 'Miss!';
        cell.style.backgroundColor = 'white';
    }

    return (0,_endTurn__WEBPACK_IMPORTED_MODULE_0__["default"])(player1, player2);
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

/***/ "./src/gameOver.js":
/*!*************************!*\
  !*** ./src/gameOver.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameOver)
/* harmony export */ });
/* harmony import */ var _newGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newGame */ "./src/newGame.js");


function gameOver() {
    const main = document.querySelector('main');
    const newMain = main.cloneNode(true);
    const content = document.getElementById('content');
    main.remove();
    content.appendChild(newMain);
    const newGameBtn = document.createElement('button');
    newGameBtn.innerText = 'Play again';
    newGameBtn.id = 'new-game';
    newGameBtn.addEventListener('click', () => (0,_newGame__WEBPACK_IMPORTED_MODULE_0__["default"])());
    newMain.appendChild(newGameBtn);
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

/***/ "./src/newGame.js":
/*!************************!*\
  !*** ./src/newGame.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ newGame)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ "./src/main.js");



function newGame() {
    const player1 = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const player2 = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](true);
    const mainDiv = document.querySelector('main');
    const content = document.getElementById('content');
    mainDiv.remove();
    content.appendChild((0,_main__WEBPACK_IMPORTED_MODULE_1__["default"])(player1, player2));
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
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main */ "./src/main.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
// import _ from 'lodash';





const player1 = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]();
const player2 = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](true);
const content = document.createElement('div');
content.id = 'content';
const body = document.querySelector('body');
content.appendChild((0,_header__WEBPACK_IMPORTED_MODULE_0__["default"])());
content.appendChild((0,_main__WEBPACK_IMPORTED_MODULE_2__["default"])(player1, player2));
body.appendChild(content);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFvQixtREFBTTtBQUMxQixvQkFBb0IsaURBQUk7QUFDeEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2F0dGFjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NoZWNrQWRqYWNlbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jaGVja0xlbmd0aC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3JlYXRlR3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2VuZFR1cm4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lT3Zlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dlbmVyYXRlT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9uZXdHYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyMWdyaWQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIyZ3JpZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3JhbmRvbUF0dGFjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3JhbmRvbUxvY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwUmFuZG9taXplci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0YXR1cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgZW5kVHVybiBmcm9tICcuL2VuZFR1cm4nO1xuaW1wb3J0IGdhbWVPdmVyIGZyb20gJy4vZ2FtZU92ZXInO1xuXG4vLyB0YWtlcyBhIGNsaWNrZWQgY2VsbCBhbmQgdXBkYXRlcyB0aGUgYm9hcmQgYW5kIHN0YXR1cyBiYXIgYWNjb3JkaW5nbHkgYXMgd2VsbCBhcyBlbmRzIHRoZSB0dXJuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhdHRhY2socGxheWVyMSwgcGxheWVyMiwgZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKHBsYXllcjEuY29tcCk7XG4gICAgbGV0IHN0YXR1cyA9ICcnO1xuICAgIGxldCBjZWxsID0gJyc7XG4gICAgaWYgKHBsYXllcjEuY29tcCkge1xuICAgICAgICBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS5jb29yZHMpO1xuICAgICAgICBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzMicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLm5hbWUpO1xuICAgICAgICBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgfVxuICAgIGNvbnN0IGF0dGFja1N0YXR1cyA9IHBsYXllcjEuYXR0YWNrKGUpO1xuICAgIGlmIChhdHRhY2tTdGF0dXMgPT09IDIpIHtcbiAgICAgICAgcGxheWVyMi5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhlLmNvb3Jkcyk7XG4gICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgICAgIHN0YXR1cy5pbm5lclRleHQgPSAnSGl0ISc7XG4gICAgICAgIGNvbnN0IHN1bmsgPSBwbGF5ZXIyLmdhbWVCb2FyZC5sYXRlc3RTdW5rO1xuICAgICAgICBpZiAoc3Vuay5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChwbGF5ZXIxLmNvbXApIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gYFRoZXkgc3VuayB5b3VyICR7c3Vua30hYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmlubmVyVGV4dCA9IGBZb3Ugc3VuayB0aGVpciAke3N1bmt9IWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwbGF5ZXIyLmdhbWVCb2FyZC5yZXNldFNoaXBzU3VuaygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXIyLmdhbWVCb2FyZC5hbGxTdW5rKSB7XG4gICAgICAgICAgICBpZiAocGxheWVyMS5jb21wKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmlubmVyVGV4dCArPSAnIEdhbWUgb3ZlciEgWW91IGxvc2UhJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmlubmVyVGV4dCArPSAnIEdhbWUgb3ZlciEgWW91IHdpbiEnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVPdmVyKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGF0dGFja1N0YXR1cyA9PT0gMSkge1xuICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gJ0FscmVhZHkgYXR0YWNrZWQhIE1pc3MhJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXMuaW5uZXJUZXh0ID0gJ01pc3MhJztcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIH1cblxuICAgIHJldHVybiBlbmRUdXJuKHBsYXllcjEsIHBsYXllcjIpO1xufVxuIiwiaW1wb3J0IGdlbmVyYXRlT3B0aW9ucyBmcm9tICcuL2dlbmVyYXRlT3B0aW9ucyc7XG5cbmNvbnN0IHByZXZPcHRpb25zID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrQWRqYWNlbnQoaGl0Q29vcmRzLCBtaXNzQ29vcmRzKSB7XG4gICAgbGV0IGFkalNxdWFyZSA9ICcnO1xuICAgIGhpdENvb3Jkcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIC8vIGNvbnN0IHRyYW5zbGF0ZWQgPSB0cmFuc2xhdGVDb29yZHMoZSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBnZW5lcmF0ZU9wdGlvbnMoW051bWJlcihlWzBdKSwgTnVtYmVyKGVbMl0pXSk7XG4gICAgICAgIC8vIGNoZWNrIGlmIG9wdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGdlbmVyYXRlZCBvciBpcyBhIG1pc3NcbiAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgIGlmICghKG9wdGlvbiBpbiBwcmV2T3B0aW9ucykgJiYgIShvcHRpb24gaW4gbWlzc0Nvb3JkcykpXG4gICAgICAgICAgICAgICAgcHJldk9wdGlvbnNbb3B0aW9uXSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcmV2T3B0aW9uc0tleXMgPSBPYmplY3Qua2V5cyhwcmV2T3B0aW9ucyk7XG4gICAgICAgIHByZXZPcHRpb25zS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWlzc0Nvb3Jkcykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcmV2T3B0aW9uc1trZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGpTcXVhcmUgPSBbTnVtYmVyKGtleVswXSksIE51bWJlcihrZXlbMl0pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFkalNxdWFyZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrTGVuZ3RoKG9wdGlvbnMsIGxlbmd0aCkge1xuICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29vcmRzLnB1c2gob3B0aW9uc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjb29yZHM7XG59XG4iLCJpbXBvcnQgY2hlY2tBZGphY2VudCBmcm9tICcuL2NoZWNrQWRqYWNlbnQnO1xuaW1wb3J0IGF0dGFjayBmcm9tICcuL2F0dGFjayc7XG5pbXBvcnQgcmFuZG9tQXR0YWNrIGZyb20gJy4vcmFuZG9tQXR0YWNrJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcHV0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGdhbWVib2FyZCkge1xuICAgICAgICB0aGlzLmNvb3JkcyA9IHt9O1xuICAgICAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcbiAgICAgICAgdGhpcy5jcmVhdGVDb29yZHMoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVDb29yZHMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZHNbW2ksIGpdXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm5Db29yZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvb3JkcztcbiAgICB9XG5cbiAgICBjb21wQXR0YWNrKHBsYXllcjEsIHBsYXllcjIpIHtcbiAgICAgICAgbGV0IGF0dGFja0Nvb3JkcyA9IFtdO1xuICAgICAgICBjb25zdCBoaXRDb29yZHMgPSBPYmplY3Qua2V5cyhwbGF5ZXIyLmdhbWVCb2FyZC5oaXRBdHRhY2tzKTtcbiAgICAgICAgY29uc3QgbWlzc0Nvb3JkcyA9IHBsYXllcjIuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3M7XG4gICAgICAgIGlmIChoaXRDb29yZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBhZGphY2VudCA9IGNoZWNrQWRqYWNlbnQoaGl0Q29vcmRzLCBtaXNzQ29vcmRzKTtcbiAgICAgICAgICAgIGlmIChhZGphY2VudCkge1xuICAgICAgICAgICAgICAgIGF0dGFja0Nvb3JkcyA9IGFkamFjZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tDb29yZHMgPSByYW5kb21BdHRhY2sodGhpcy5jb29yZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXR0YWNrQ29vcmRzID0gcmFuZG9tQXR0YWNrKHRoaXMuY29vcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmVteUNlbGwgPVxuICAgICAgICAgICAgcGxheWVyMS5nYW1lQm9hcmQuZ3JpZFthdHRhY2tDb29yZHNbMF1dW2F0dGFja0Nvb3Jkc1sxXV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvb3Jkc1thdHRhY2tDb29yZHNdO1xuICAgICAgICBhdHRhY2socGxheWVyMiwgcGxheWVyMSwgZW5lbXlDZWxsKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVHcmlkKCkge1xuICAgIGNvbnN0IGdyaWQgPSBbXTtcbiAgICBjb25zdCByb3dzID0gMTA7XG4gICAgY29uc3QgY29sdW1zID0gMTA7XG4gICAgY29uc3QgbGV0dGVyID0gJ2FiY2RlZmdoaWonO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSArPSAxKSB7XG4gICAgICAgIGdyaWRbaV0gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2x1bXM7IGogKz0gMSkge1xuICAgICAgICAgICAgZ3JpZFtpXVtqXSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBsZXR0ZXJbaV0gKyAoaiArIDEpLFxuICAgICAgICAgICAgICAgIGNvb3JkczogW2ksIGpdLFxuICAgICAgICAgICAgICAgIG9jY3VwaWVkOiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG59XG4iLCJsZXQgdHVybiA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuZFR1cm4ocGxheWVyMSwgcGxheWVyMikge1xuICAgIGlmIChwbGF5ZXIyLmNvbXApIHtcbiAgICAgICAgcGxheWVyMi5jb21wLmNvbXBBdHRhY2socGxheWVyMSwgcGxheWVyMik7XG4gICAgfVxuXG4gICAgdHVybiArPSAxO1xuICAgIHR1cm4gJT0gMjtcbiAgICByZXR1cm4gdHVybjtcbn1cbiIsImltcG9ydCBjcmVhdGVHcmlkIGZyb20gJy4vY3JlYXRlR3JpZCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHNoaXBSYW5kb21pemVyIGZyb20gJy4vc2hpcFJhbmRvbWl6ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdyaWQgPSBjcmVhdGVHcmlkKCk7XG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IHt9O1xuICAgICAgICB0aGlzLmhpdEF0dGFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5zaGlwc1N1bmsgPSAwO1xuICAgICAgICB0aGlzLmxhdGVzdFN1bmsgPSAnJztcbiAgICAgICAgdGhpcy5hbGxTdW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICAgICAgdGhpcy5zaGlwTG9jYXRpb25zID0ge307XG4gICAgICAgIHRoaXMucGxhY2VTaGlwcygpO1xuICAgIH1cblxuICAgIHJlc2V0U2hpcHNTdW5rKCkge1xuICAgICAgICB0aGlzLmxhdGVzdFN1bmsgPSAnJztcbiAgICB9XG5cbiAgICBzaG93R3JpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JpZDtcbiAgICB9XG5cbiAgICBnZXRTaGlwTG9jcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpcExvY2F0aW9ucztcbiAgICB9XG5cbiAgICBwbGFjZVNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2FycmllcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiA1LFxuICAgICAgICAgICAgICAgIGNvb3Jkczogc2hpcFJhbmRvbWl6ZXIoNSwgdGhpcyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdiYXR0bGVzaGlwJyxcbiAgICAgICAgICAgICAgICBsZW5ndGg6IDQsXG4gICAgICAgICAgICAgICAgY29vcmRzOiBzaGlwUmFuZG9taXplcig0LCB0aGlzKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2Rlc3Ryb3llcicsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiAzLFxuICAgICAgICAgICAgICAgIGNvb3Jkczogc2hpcFJhbmRvbWl6ZXIoMywgdGhpcyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzdWJtYXJpbmUnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMyxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHNoaXBSYW5kb21pemVyKDMsIHRoaXMpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncGF0cm9sIGJvYXQnLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgICAgICAgICBjb29yZHM6IHNoaXBSYW5kb21pemVyKDIsIHRoaXMpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBzaGlwcy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoZWxlbWVudC5uYW1lLCBlbGVtZW50Lmxlbmd0aCwgZWxlbWVudC5jb29yZHMpO1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvY2N1cHkoY29vcmRzKSB7XG4gICAgICAgIHRoaXMuc2hpcExvY2F0aW9uc1tjb29yZHNdID0gbnVsbDtcbiAgICAgICAgdGhpcy5ncmlkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5vY2N1cGllZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gdGhpcy5zaGlwc1tpXTtcbiAgICAgICAgICAgIGlmIChhdHRhY2tDb29yZHMgaW4gc2hpcC5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICBzaGlwLmhpdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzaGlwLnN1bmspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXRlc3RTdW5rID0gc2hpcC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXBzU3VuayArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGlwc1N1bmsgPT09IDUpIHRoaXMuYWxsU3VuayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IG5ld0dhbWUgZnJvbSAnLi9uZXdHYW1lJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICBjb25zdCBuZXdNYWluID0gbWFpbi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG4gICAgbWFpbi5yZW1vdmUoKTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKG5ld01haW4pO1xuICAgIGNvbnN0IG5ld0dhbWVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXdHYW1lQnRuLmlubmVyVGV4dCA9ICdQbGF5IGFnYWluJztcbiAgICBuZXdHYW1lQnRuLmlkID0gJ25ldy1nYW1lJztcbiAgICBuZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbmV3R2FtZSgpKTtcbiAgICBuZXdNYWluLmFwcGVuZENoaWxkKG5ld0dhbWVCdG4pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVPcHRpb25zKGNvb3Jkcykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBpZiAoY29vcmRzWzBdIC0gMSA+PSAwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdIC0gMSwgY29vcmRzWzFdXSk7XG4gICAgfVxuICAgIGlmIChjb29yZHNbMF0gKyAxIDw9IDEwKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaChbY29vcmRzWzBdICsgMSwgY29vcmRzWzFdXSk7XG4gICAgfVxuICAgIGlmIChjb29yZHNbMV0gLSAxID49IDApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSAtIDFdKTtcbiAgICB9XG4gICAgaWYgKGNvb3Jkc1sxXSArIDEgPD0gMTApIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSArIDFdKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoZWFkZXIoKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgZGl2LmlubmVyVGV4dCA9ICdCYXR0bGVzaGlwJztcbiAgICByZXR1cm4gZGl2O1xufVxuIiwiaW1wb3J0IHBsYXllcjFncmlkIGZyb20gJy4vcGxheWVyMWdyaWQnO1xuaW1wb3J0IHBsYXllcjJncmlkIGZyb20gJy4vcGxheWVyMmdyaWQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWluKHBsYXllcjEsIHBsYXllcjIpIHtcbiAgICBjb25zdCBtYWluRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuICAgIGNvbnN0IHAyZ3JpZCA9IHBsYXllcjJncmlkKHBsYXllcjEsIHBsYXllcjIpO1xuICAgIGNvbnN0IHAxZ3JpZCA9IHBsYXllcjFncmlkKHBsYXllcjEpO1xuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQocDJncmlkKTtcbiAgICBtYWluRGl2LmFwcGVuZENoaWxkKHAxZ3JpZCk7XG4gICAgcmV0dXJuIG1haW5EaXY7XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBtYWluIGZyb20gJy4vbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5ld0dhbWUoKSB7XG4gICAgY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoKTtcbiAgICBjb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcih0cnVlKTtcbiAgICBjb25zdCBtYWluRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuICAgIG1haW5EaXYucmVtb3ZlKCk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChtYWluKHBsYXllcjEsIHBsYXllcjIpKTtcbn1cbiIsImltcG9ydCBDb21wdXRlciBmcm9tICcuL2NvbXB1dGVyJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lQm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbXAgPSBmYWxzZSwgZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpKSB7XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkID0gZ2FtZUJvYXJkO1xuICAgICAgICBpZiAoY29tcCkgdGhpcy5jb21wID0gbmV3IENvbXB1dGVyKGdhbWVCb2FyZCk7XG4gICAgfVxuXG4gICAgLy8gMyBkaWZmZXJlbnQgcmV0dXJucywgbWlzcywgaGl0LCBvciBhbHJlYWR5IGF0dGFja2VkXG4gICAgYXR0YWNrKGNlbGwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2VsbC5vY2N1cGllZCA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgICEoY2VsbC5jb29yZHMgaW4gdGhpcy5nYW1lQm9hcmQubWlzc2VkQXR0YWNrcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjZWxsLmNvb3JkcyBpbiB0aGlzLmdhbWVCb2FyZC5oaXRBdHRhY2tzIHx8XG4gICAgICAgICAgICBjZWxsLmNvb3JkcyBpbiB0aGlzLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy8gZW5zdXJlcyBjb21wIGRvZXNuJ3QgYXR0YWNrIHNhbWUgc3F1YXJlIHR3aWNlXG4gICAgICAgICAgICBpZiAodGhpcy5jb21wKSB0aGlzLmdhbWVCb2FyZC5taXNzZWRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdhbWVCb2FyZC5oaXRBdHRhY2tzW2NlbGwuY29vcmRzXSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmNvbXApIHRoaXMuZ2FtZUJvYXJkLm1pc3NlZEF0dGFja3NbY2VsbC5jb29yZHNdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHN0YXR1cyBmcm9tICcuL3N0YXR1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBsYXllcjFncmlkKHBsYXllcjEpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBwMWluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwMWluZm8uaW5uZXJUZXh0ID0gJ1lvdXIgc2hpcHM6JztcbiAgICBwMWluZm8uY2xhc3NOYW1lID0gJ2luZm8nO1xuICAgIGNvbnN0IHAxZ3JpZCA9IHBsYXllcjEuZ2FtZUJvYXJkLmdyaWQ7XG4gICAgY29uc3Qgc3RhdHVzRGl2ID0gc3RhdHVzKCdzdGF0dXMyJyk7XG5cbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gJ3BsYXllcjEtZ3JpZCc7XG4gICAgcDFncmlkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgICAgIGNlbGwuaWQgPSBlLmNvb3JkcztcbiAgICAgICAgICAgIGlmIChlLmNvb3JkcyBpbiBwbGF5ZXIxLmdhbWVCb2FyZC5zaGlwTG9jYXRpb25zKVxuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZXknO1xuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwMWluZm8pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGF0dXNEaXYpO1xuICAgIHJldHVybiBjb250YWluZXI7XG59XG4iLCJpbXBvcnQgYXR0YWNrIGZyb20gJy4vYXR0YWNrJztcbmltcG9ydCBzdGF0dXMgZnJvbSAnLi9zdGF0dXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbGF5ZXIyZ3JpZChwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcDJpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcDJpbmZvLmlubmVyVGV4dCA9ICdFbmVteSBzaGlwczonO1xuICAgIHAyaW5mby5jbGFzc05hbWUgPSAnaW5mbyc7XG4gICAgY29uc3QgcDJncmlkID0gcGxheWVyMi5nYW1lQm9hcmQuZ3JpZDtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gJ3BsYXllcjItZ3JpZCc7XG4gICAgY29uc3Qgc3RhdHVzRGl2ID0gc3RhdHVzKCk7XG4gICAgc3RhdHVzRGl2LmlubmVyVGV4dCA9ICcoQ2xpY2sgbG9jYXRpb24gYWJvdmUgdG8gYXR0YWNrKSc7XG4gICAgcDJncmlkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgICAgIGNlbGwuaWQgPSBlLm5hbWU7XG4gICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gYXR0YWNrKHBsYXllcjEsIHBsYXllcjIsIGUpKTtcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHAyaW5mbyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN0YXR1c0Rpdik7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUF0dGFjayhjb29yZHMpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY29vcmRzKTtcbiAgICBjb25zdCByYW5kb21Db29yZHMgPSBrZXlzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGtleXMubGVuZ3RoKV07XG4gICAgcmV0dXJuIFtyYW5kb21Db29yZHNbMF0sIHJhbmRvbUNvb3Jkc1syXV07XG59XG4iLCIvLyBjaGVja3MgdG8gc2VlIGlmIHNoaXAgbGVuZ3RoIGNvdWxkIGZpdCBpbiBnaXZlbiBjb29yZGluYXRlcyByYW5nZVxuXG5pbXBvcnQgY2hlY2tMZW5ndGggZnJvbSAnLi9jaGVja0xlbmd0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUxvY2F0aW9ucyhjb29yZHMsIHVzZWRDb29yZHMsIGxlbmd0aCkge1xuICAgIGNvbnN0IHZlcnRPcHRpb25zID0gW2Nvb3Jkc107XG4gICAgY29uc3QgaG9yaXpPcHRpb25zID0gW2Nvb3Jkc107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAvLyBjaGVjayB2ZXJ0aWNhbCBkb2Vzbid0IGdvIG9mZiB0aGUgYm9hcmQgYW5kIGhhc250IGFscmVhZHkgYmVlbiB1c2VkXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvb3Jkc1swXSArIGxlbmd0aCAtIDEgPD0gOSAmJlxuICAgICAgICAgICAgIShbY29vcmRzWzBdICsgaSwgY29vcmRzWzFdXSBpbiB1c2VkQ29vcmRzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZlcnRPcHRpb25zLnB1c2goW2Nvb3Jkc1swXSArIGksIGNvb3Jkc1sxXV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvb3Jkc1swXSAtIGxlbmd0aCArIDEgPj0gMCAmJlxuICAgICAgICAgICAgIShbY29vcmRzWzBdIC0gaSwgY29vcmRzWzFdXSBpbiB1c2VkQ29vcmRzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZlcnRPcHRpb25zLnB1c2goW2Nvb3Jkc1swXSAtIGksIGNvb3Jkc1sxXV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIGhvcml6b250YWwgZG9lc24ndCBnbyBvZmYgYm9hcmQgYW5kIGhhc250IGFscmVhZHkgYmVlbiB1c2VkXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvb3Jkc1sxXSArIGxlbmd0aCAtIDEgPD0gOSAmJlxuICAgICAgICAgICAgIShbY29vcmRzWzBdLCBjb29yZHNbMV0gKyBpXSBpbiB1c2VkQ29vcmRzKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGhvcml6T3B0aW9ucy5wdXNoKFtjb29yZHNbMF0sIGNvb3Jkc1sxXSArIGldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb29yZHNbMV0gLSBsZW5ndGggKyAxID49IDAgJiZcbiAgICAgICAgICAgICEoW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gaV0gaW4gdXNlZENvb3JkcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBob3Jpek9wdGlvbnMucHVzaChbY29vcmRzWzBdLCBjb29yZHNbMV0gLSBpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZlcnRPcHRpb25zLmxlbmd0aCA+IGhvcml6T3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrTGVuZ3RoKHZlcnRPcHRpb25zLCBsZW5ndGgpO1xuICAgIH1cbiAgICBpZiAoaG9yaXpPcHRpb25zLmxlbmd0aCA+IHZlcnRPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gY2hlY2tMZW5ndGgoaG9yaXpPcHRpb25zLCBsZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zID0gW3ZlcnRPcHRpb25zLCBob3Jpek9wdGlvbnNdO1xuICAgIGNvbnN0IGNvaW5Ub3NzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgcmV0dXJuIGNoZWNrTGVuZ3RoKG9wdGlvbnNbY29pblRvc3NdLCBsZW5ndGgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoLCBjb29yZHMsIG51bUhpdHMgPSAwLCBzdW5rID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMubnVtSGl0cyA9IG51bUhpdHM7XG4gICAgICAgIHRoaXMuc3VuayA9IHN1bms7XG4gICAgICAgIHRoaXMuY29vcmRzID0gY29vcmRzO1xuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5udW1IaXRzICs9IDE7XG4gICAgICAgIGlmICh0aGlzLm51bUhpdHMgPT09IHRoaXMubGVuZ3RoKSB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIH1cbn1cbiIsImltcG9ydCByYW5kb21Mb2NhdGlvbnMgZnJvbSAnLi9yYW5kb21Mb2NhdGlvbnMnO1xuXG5mdW5jdGlvbiByYW5kb21WYWxpZE51bShtaW4sIG1heCkge1xuICAgIGNvbnN0IG1pbkNlaWxkID0gTWF0aC5jZWlsKG1pbik7XG4gICAgY29uc3QgbWF4Rmxvb3JlZCA9IE1hdGguZmxvb3IobWF4KTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heEZsb29yZWQgLSBtaW5DZWlsZCkgKyBtaW5DZWlsZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXBSYW5kb21pemVyKGxlbmd0aCwgYm9hcmQpIHtcbiAgICBjb25zdCBjb29yZHMgPSB7fTtcbiAgICBjb25zdCB1c2VkQ29vcmRzID0gYm9hcmQuZ2V0U2hpcExvY3MoKTtcbiAgICBjb25zdCBjb29yZDEgPSByYW5kb21WYWxpZE51bSgwLCA5KTtcbiAgICBjb25zdCBjb29yZDIgPSByYW5kb21WYWxpZE51bSgwLCA5KTtcbiAgICBpZiAoIShbY29vcmQxLCBjb29yZDJdIGluIHVzZWRDb29yZHMpKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSByYW5kb21Mb2NhdGlvbnMoW2Nvb3JkMSwgY29vcmQyXSwgdXNlZENvb3JkcywgbGVuZ3RoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGJvYXJkLm9jY3VweShvcHRpb25zW2ldKTtcbiAgICAgICAgICAgICAgICBjb29yZHNbb3B0aW9uc1tpXV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvb3JkcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBydW4gYWdhaW4gaWYgdmFsaWQgY29vcmRzIGFyZW4ndCBmb3VuZFxuICAgIHJldHVybiBzaGlwUmFuZG9taXplcihsZW5ndGgsIGJvYXJkKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXR1cyhuYW1lID0gJ3N0YXR1cycpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NOYW1lID0gbmFtZTtcbiAgICByZXR1cm4gZGl2O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuL2hlYWRlcic7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBtYWluIGZyb20gJy4vbWFpbic7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoKTtcbmNvbnN0IHBsYXllcjIgPSBuZXcgUGxheWVyKHRydWUpO1xuY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29udGVudC5pZCA9ICdjb250ZW50JztcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5jb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcigpKTtcbmNvbnRlbnQuYXBwZW5kQ2hpbGQobWFpbihwbGF5ZXIxLCBwbGF5ZXIyKSk7XG5ib2R5LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9