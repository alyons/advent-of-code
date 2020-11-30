const intCode = require('../src/intCode.v3');
const program = require('../inputs/fifteen.json');
const { printSameLine } = require('../src/utils');

const NORTH = 1, SOUTH = 2, WEST = 3, EAST = 4;
const WALL = 0, EMPTY = 1, OXYGEN = 2;

let x = 0, y = 0;
let input = 1;
let state = {
    output: [],
    index: 0,
    rIndex: 0
};
let shouldExit = false;
let points = [[x,y,EMPTY]];
let index = 0;
let minX = 0, minY = 0, maxX = 0, maxY = 0; // Screen Size

const lackOxygen = (point) => point[2] == EMPTY;
const equalPoints = (a, b) => a[0] == b[0] && a[1] == b[1];

function getNextDirection(direction, tileType) {
    if (tileType == 0) {
        switch (direction) {
            case NORTH: return WEST;
            case SOUTH: return EAST;
            case WEST: return SOUTH;
            case EAST: return NORTH;
        }
    } else {
        switch (direction) {
            case NORTH: return EAST;
            case SOUTH: return WEST;
            case WEST: return NORTH;
            case EAST: return SOUTH;
        }
    }
}

function returnDirection(direction) {
    switch (direction) {
        case NORTH: return 'north';
        case SOUTH: return 'south';
        case WEST: return 'west';
        case EAST: return 'east';
    }
}

function drawRoom() {
    let output = '';
    for(let y = minY; y <= maxY; y++) {
        for(let x = minX; x <= maxX; x++) {
            let point = points.find(p => equalPoints(p, [x,y]));
            if (point) {
                switch(point[2]) {
                    case WALL: output += '#'; break;
                    case EMPTY: output += '.'; break;
                    case OXYGEN: output += 'O'; break;
                    default: output += ' '; break;
                }
            } else {
                output += ' ';
            }
        }
        output += '\n';
    }
    console.log(output);
}

do {
    // process.stdout.write(`Trying to move ${returnDirection(input)}... `);
    state = intCode(program, [input], state.output, state.index, state.rIndex);
    let data = state.output.shift();
    if (data != 0) {
        switch(input) {
            case NORTH: y-= 1; minY = Math.min(y, minY); break;
            case SOUTH: y+= 1; maxY = Math.max(y, maxY); break;
            case WEST: x-= 1; maxX = Math.max(x, maxX); break;
            case EAST: x+= 1; minX = Math.min(x, minX); break;
        }
        // process.stdout.write(`I moved! My new position is [${x},${y}]`);
        points.push([x,y,data]);
    } else {
        // process.stdout.write(`I was unable to move ${returnDirection(input)}`);
    }
    input = getNextDirection(input, data);
    index++;
    // process.stdout.write('\n');
    if (data == 2) console.log(`I found the oxygen system! It took me ${index}`);
    shouldExit = state.index == 'HALT' || data == 2;
} while (!shouldExit);

/* Find the shortest path to the Oxygen System */
// for(let i = 0; i < points.length - 1; i++) {
//     for(let j = i + 1; j < points.length; j++) {
//         if (points[i][0] == points[j][0] && points[i][1] == points[j][1]) {
//             points.splice(i + 1, j - i);
//             j = i + 1;
//         }
//     }
// }

// console.log(points);
// console.log(points.length - 1);

/* Fill the Space with Oxygen */
function getPointBasedOnDirection(x, y, dir) {
    switch(dir) {
        case NORTH: y-= 1; break;
        case SOUTH: y+= 1; break;
        case WEST: x-= 1; break;
        case EAST: x+= 1; break;
    }
    return [x, y];
}

let minutes = 0;
let spacesToCheck = points.slice(-1);

/* Remove Duplicates */
for(let i = points.length - 1; i > -1; i--) {
    for(let r = i - 1; r > -1; r--) {
        if (equalPoints(points[i], points[r])) {
            points.splice(r, 1);
            r++;
        }
    }
}

do {
    minutes++;
    let nextSpaces = [];
    spacesToCheck.forEach((space) => {
        console.log(`Starting search from ${space}`);
        for(let dir = 1; dir < 5; dir++) {
            let toCheck = getPointBasedOnDirection(space[0], space[1], dir);
            let nextIndex = points.findIndex(p => equalPoints(p, toCheck));
            if (dir == SOUTH) console.log(`To Check: ${toCheck}`);
            if (nextIndex > -1 && points[nextIndex][2] == EMPTY) {
                points[nextIndex][2] = OXYGEN;
                nextSpaces.push(toCheck);
            }
        }
        if (nextSpaces.length == 0) console.log(`Didn't find any new spaces from ${spacesToCheck}`);
    });
    console.log(`Next Spaces: ${nextSpaces}`);

    spacesToCheck.splice(0);
    spacesToCheck = nextSpaces;
    console.log(`Spaces to Check: ${spacesToCheck}`);
} while(points.some(lackOxygen) && minutes < 10000);
process.stdout.write('\n');

if (points.some(lackOxygen)) {
    drawRoom();
    console.log(`I failed to navigate the list after ${minutes} minutes...`);
    console.log(`There are ${points.filter(lackOxygen).length} tiles without oxygen`);
} else {
    console.log(`It took ${minutes} minutes to refill the chamber!`);
}
