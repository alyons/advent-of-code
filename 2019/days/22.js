const fs = require('fs');
const { runProgram, runProgramWithIndex, runProgramExAid } = require('../src/deck');
const { printSameLine } = require('../src/utils');
const BASE_PATH = 'G:/Projects/aoc_2019'; //
const program = fs.readFileSync(`${BASE_PATH}/inputs/22.txt`).toString();

let deck = [];
for (let i = 0; i < 10007; i++) { deck.push(i); }
// deck = runProgram(deck, program);
// console.log(`Index of 2019: ${deck.indexOf(2019)}`);
// console.log(`Vaule at 6326: ${runProgramWithIndex(program, 10007n, 6326n)}`);

// for (let i = 0; i < 9; i++) deck = runProgram(deck, program);
// console.log(`Index of 2020: ${deck.indexOf(2020)}`);
console.log(`Value at 9919: ${runProgramExAid(program, 10007n, 9919n, 10n)}`);


console.log(`Final Value: ${runProgramExAid(program, 119315717514047n, 2020n, 101741582076661n)}`);

// let loopValue = 0;
// let startingIndex = 2020;
// let index = 2020;
// let iterations = 101741582076661;
// let deckSize = 119315717514047;

// do {
//     index = runProgramWithIndex(program, deckSize, index);
//     loopValue++;
//     printSameLine(`Finished Iteration: ${loopValue}`);
// } while(index != startingIndex && loopValue < iterations);
// process.stdout.write('\n');

// console.log(`Final Loop Set: ${loopValue}`);
// console.log(`Final Index: `)
