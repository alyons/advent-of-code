const intCode = require('../src/intCode.v3');
const program = require('../inputs/seventeen.json');

let x = 0, y = 0;
let input = [];
let output = [];
let state = {
    index: 0,
    rIndex: 0
};
let points = [];
const NEWLINE = 10, SCAFFOLDING = 35, SPACE = 46, NORTH = 94, EAST = 62, SOUTH = 118, WEST = 60;

let directions = [NORTH, EAST, SOUTH, WEST];

const pointIsEqual = (a, b) => a[0] == b[0] && a[1] == b[1];
const isRobot = (r) => r[2] == NORTH || r[2] == SOUTH || r[2] == EAST || r[2] == WEST;
const isScaffolding = (p) => p[2] == SCAFFOLDING || isRobot(p);

do {
    state = intCode(program, [], output, state.index, state.rIndex);
    let data = output.shift();
    if (state.index != 'HALT') {
        points.push([x, y, data]);
        if (data == NEWLINE) {
            x = 0;
            y++;
        } else {
            x++;
        }
    }
} while(state.index != 'HALT');

let scaff = points.filter(p => isScaffolding(p));

console.log(`There are ${points.length} tiles`);
console.log(`There are ${scaff.length} Scaffolding Tiles`);
console.log(`There are ${points.filter(p => p[2] == SPACE).length} Open Tiles`);
console.log(`The last tile is at point ${points.slice(-1)[0]}`);

let mapDisplay = '';
points.forEach(p => {
    mapDisplay += String.fromCharCode(p[2]);
});
console.log(mapDisplay);

function shiftPoint (point, dir) {
    let x = point[0], y = point[1];

    switch(dir) {
        case NORTH: y -= 1; break;
        case SOUTH: y += 1; break;
        case EAST:  x += 1; break;
        case WEST:  x -= 1; break;
    }

    return [x, y];
}

function turnLeft(dir) {
    switch(dir) {
        case NORTH: return WEST;
        case EAST: return NORTH;
        case SOUTH: return EAST;
        case WEST: return SOUTH;
    }
}

function turnRight(dir) {
    switch(dir) {
        case NORTH: return EAST;
        case EAST: return SOUTH;
        case SOUTH: return WEST;
        case WEST: return NORTH;
    }
}

function patternsAreEqual(a, b) {
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] != b[i]) return false;
    return true;
}

/* Calculate Sum */
let sum = 0;
scaff.forEach(p => {
    let getValue = true;

    for (let dir = 0; dir < 4; dir++) {
        let test = shiftPoint(p, directions[dir]);
        if (scaff.findIndex(q => pointIsEqual(test, q)) == -1) {
            getValue = false;
            break;
        }
    }

    if (getValue) sum += p[0] * p[1];
});

console.log(`Sum of intersections is ${sum}`);

/* Calculate Path */
let spaces = 0;
let instructions = [];
let shouldExit = false;
let position = points.find(s => isRobot(s));
let facing = position[2];

do {
    let forward = shiftPoint(position, facing);
    let left = shiftPoint(position, turnLeft(facing));
    let right = shiftPoint(position, turnRight(facing));

    if (scaff.some(s => pointIsEqual(s, forward))) {
        position = forward;
        spaces++;
    } else if (scaff.some(s => pointIsEqual(s, right))) {
        if (spaces > 0) { instructions.push(spaces); spaces = 0; }
        facing = turnRight(facing);
        instructions.push('R');
    } else if (scaff.some(s => pointIsEqual(s, left))) {
        if (spaces > 0) { instructions.push(spaces); spaces = 0; }
        facing = turnLeft(facing);
        instructions.push('L');
    } else {
        if (spaces > 0) { instructions.push(spaces); spaces = 0; }
        shouldExit = true;
    }
} while (!shouldExit);

console.log(instructions);

let patterns = [];

/* Calculate patterns */
for(let i = 2; i < instructions.length; i += 2) {
    for(let j = i + 2; j < instructions.length; j += 2) {
        let pattern = instructions.slice(i, j);
        let patternCount = 1;
        
        for(let k = j; k < instructions.length; k += 2) {
            let testSlice = instructions.slice(k, k + j - i);
            if (patternsAreEqual(pattern, testSlice)) patternCount++;
        }

        patterns.push({
            pattern,
            score: (patternCount == 1) ? patternCount : pattern.length / 2 * patternCount
        });
    }
}

patterns.sort((a, b) => a.score - b.score);
patterns.reverse();

// console.log(patterns);

loopAlpha:
for(let a = 0; a < patterns.length - 2; a++) {
    loopBeta:
    for(let b = a + 1; b < patterns.length - 1; b++) {
        loopGamma:
        for(let c = b + 1; c < patterns.length; c++) {
            let index = 0;
            let patternA = patterns[a];
            let patternB = patterns[b];
            let patternC = patterns[c];
            let sequence = [];

            do {
                if (patternsAreEqual(patternA.pattern, instructions.slice(index, index + patternA.length))) {
                    sequence.push('A');
                    index += patternA.length;
                } else if (patternsAreEqual(patternB.pattern, instructions.slice(index, index + patternB.length))) {
                    sequence.push('B');
                    index += patternB.length;
                } else if (patternsAreEqual(patternC.pattern, instructions.slice(index, index + patternC.length))) {
                    sequence.push('C');
                    index += patternC.length;
                } else {
                    break;
                }
            } while (index < instructions.length);

            if (sequence.length > 0) {// if (index >= instructions.length) {
                console.log(`Pattern A: ${patternA.pattern}`);
                console.log(`Pattern B: ${patternB.pattern}`);
                console.log(`Pattern C: ${patternC.pattern}`);
                console.log(`Sequence: ${sequence}`);
            }
        }
    }
}