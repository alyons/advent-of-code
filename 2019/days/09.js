const intCode = require('../src/intCode.v3');
const program = require('../inputs/nine');

let input = [2];
let state = { index: 0, rIndex: 0, output: [] };

while(state.index != 'HALT') { state = intCode(program, input, state.output, state.index, state.rIndex); }

console.log(state);
