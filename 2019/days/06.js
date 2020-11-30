const { calculateOrbits, calculateOrbitalTransfers } = require('../src/calculateOrbits');
const fs = require('fs');

let input = fs.readFileSync('G:/Projects/aoc_2019/inputs/six.txt').toString();

console.log(calculateOrbits(input));

console.log(calculateOrbitalTransfers(input, 'YOU', 'SAN'));
