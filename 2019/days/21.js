const fs = require('fs');
const intCode = require('../src/intCode.v3');
const program = require('../inputs/21.json');
const springscript = fs.readFileSync('G:/Projects/aoc_2019/inputs/springscript2.txt').toString();

let state = { index: 0, rIndex: 0 };
let input = springscript.split('').map(c => c.charCodeAt(0));
let output = [];

while (state.index != 'HALT') state = intCode(program, input, output, state.index, state.rIndex);

let picture = String.fromCharCode.apply(this, output);
console.log(picture);
console.log(output[output.length - 1]);
