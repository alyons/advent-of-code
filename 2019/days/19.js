const intCode = require('../src/intCode.v3');
const program = require('../inputs/19.json');
const { printSameLine } = require('../src/utils');

const input = [];
let output = [];
let maxSquare = 250;

for(let y = 0; y < maxSquare; y++) {
    for(let x = 0; x < maxSquare; x++)  { 
        input.push(x);
        input.push(y);
    }
}

do {
    intCode(program.slice(), input, output, 0, 0);
    printSameLine(`Inputs remaining: ${input.length}`);
} while (input.length > 0);
console.log('\n');
console.log(`Output Length: ${output.length}`);

let hits = output.filter(t => t == 1);
console.log(`Tractored Spaces: ${hits.length}`);

// let toPrint = '';
// if (maxSquare <= 100) {
//     for(let i = 0; i < maxSquare; i++) {
//         output.slice(i * maxSquare, (i + 1) * maxSquare).forEach(o => toPrint += (o == 0) ? '.' : '#');
//     }
// } else {
//     for(let y = maxSquare - 100; y < maxSquare; y++) {
//         for(let x = maxSquare - 100; x < maxSquare; x++) {
//             toPrint += (output[y * maxSquare + x] == 0) ? '.' : '#';
//         }
//         toPrint += '\n';
//     }
// }
// console.log(toPrint);

let rightTopMost = { x: Number.MIN_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER };
let lowerLeftMost = { x: Number.MAX_SAFE_INTEGER, y: Number.MIN_SAFE_INTEGER };

for(let y = 0; y < maxSquare; y++) {
    for(let x = 0; x < maxSquare; x++) {
        if (output[y * maxSquare + x] == 1) {
            if (x > rightTopMost.x) {
                rightTopMost = { x, y };
            }
            
            if (y > lowerLeftMost.y) {
                lowerLeftMost = { x, y };
            }
        }
    }
}

// console.log(`Right Top: [${rightTopMost.x}, ${rightTopMost.y}]`);
// console.log(`Lower Left: [${lowerLeftMost.x}, ${lowerLeftMost.y}]`);

const f = (x) => Math.floor((rightTopMost.y) / parseFloat(rightTopMost.x) * x);
const g = (x) => Math.floor((lowerLeftMost.y) / parseFloat(lowerLeftMost.x) * x);

let x = 0;
let squareSize = 99;
let xA = lowerLeftMost.x, yA = lowerLeftMost.y, xB = 100, yB = 0;

console.log('Checking via formula...');
do {
    printSameLine(`Checking: ${x}...`);
    if (f(x + squareSize) == g(x) - squareSize) break;
    x++;
} while(x < 1000);
console.log('\n');

console.log(`Expected point: [${x},${g(x)-squareSize}]`);

do {
    let loopOutput = [];
    intCode(program.slice(), [xA, yA], loopOutput, 0, 0);
    let tractor = loopOutput.shift();
    while (tractor == 0) {
        xA++;
        intCode(program.slice(), [xA, yA], loopOutput, 0, 0);
        tractor = loopOutput.shift();
    }

    xB = xA + squareSize;
    yB = yA - squareSize;

    printSameLine(`Checking: [${xA}, ${yB}]`);

    intCode(program.slice(), [xB,yB], loopOutput, 0, 0);
    let tractorB = loopOutput.shift();

    if (tractorB == 1) {
        console.log('\n');
        console.log(`Point found at ${xA, yB}`);
        break;
    }
    yA++;
} while(true);
