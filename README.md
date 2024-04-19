# BattleshipJS

Battleship Game using test driven development

Live preview: TBD

Assignment: https://www.theodinproject.com/lessons/javascript-battleship

## Features:

-   Ship class keeps track of length, hits, and if sunk
-   Gameboard class places ships at specific coordinates, receiveAttack function determines if ship is hit or not, keeps track of missed attacks, reports if all ships sunk
-   Player class takes turns attacking the enemy Gameboard
-   Computer class takes into account missed attacks and hit attacks and attacks adjacently as appropriate
-   Human player attacks via click, computer attacks via checking previous hits and misses and attacking adjacently or randomly as appropriate

### Process

-   Set up of initial classes, functions, and 2d grid array using test driven development

-   Created translateCoords to take letter/number coordinates and relate them to the grid array, later deemed unncessary as raw coords was easier to use for computer AI

-   checkAdjacent function takes hit coords and selects an adjacent square for the computer

-   Created initial DOM UI for enemy gameboard and event listener to allow clicks to attack

-   Bug where computer kept attacking same target after a miss following a hit fixed by adding hit attacks to previous attacks

-   Bug with shipRandomizer that was causing collisions, requiring a refactor of the entire ship placement and targeting system as well as corresponding tests

#### To Do

-   Add 2 human player option
-   Drag and drop placement of ships
