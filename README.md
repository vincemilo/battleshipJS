# jsTodo

Image Carousel app using Webpack

Assignment: https://www.theodinproject.com/lessons/javascript-dynamic-user-interface-interactions

## Features:

- Next and previous buttons to advance the image, smooth transitions using css

- Navigation dots below the window that link to each individual image

- Timeout which advances the slides every 5 seconds


### Process

-   Configuring ESLint and Prettier with VSCode

-   Tinkering with webpack production/development modes and plugins

-   Added display window with images in an array along with forward and next nav buttons with logic to advance the image and update the window

-   Added nav dots below image that update as image scrolls. Put these in an image array that correspond to the image array index

-   Broke up functions and arrays into modules, probably should have done this first as there were some issues getting them to play nicely again once sepaerated.

-   Made the nav dots clickable by assigning each image an id and then an event listener that pulls up that image from its respective array. Had a bug where I didn't realize target.id was a string and had to convert it back to a number.

-   In order to create the automatic advance feature had to create an index module that kept track of where the pointer was at any given time so that it would advance properly even if another navdot was selected.
