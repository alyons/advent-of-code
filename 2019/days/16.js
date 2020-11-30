const { calculateFFTWithRepeat, parseInput } = require('../src/frequency');
const input = require('../inputs/16.json').value;
let offset = parseInt(input.substring(0, 8));
let fullInput = '';

const pattern = [0, 1, 0, -1];
for (let i = 0; i < 10000; i++) fullInput += input;

console.log('Creating signal...');
let signal = parseInput(fullInput);
console.log('Beginning sequencing...');
calculateFFTWithRepeat(signal, pattern, 100);
console.log('Reading output now...')
console.log(offset);
console.log(signal.slice(offset, offset+8));

