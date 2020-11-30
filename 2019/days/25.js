const readlineSync = require('readline-sync');
const intCode = require('../src/intCode.v3');
const program = require('../inputs/25.json');
const { printSameLine } = require('../src/utils');

const NORTH = 0, SOUTH = 1, EAST = 2, WEST = 3, TAKE = 4, DROP = 5, INV = 6, EXIT = -1;
const actions = ['North', 'South', 'East', 'West', 'Take', 'Drop', 'Inventory'];

let userInput;
let input = [];
let state = {
    output: [],
    index: 0,
    rIndex: 0
};

function generateInput(command, args = '') {
    let cmdString;
    switch(command) {
        case NORTH: cmdString = 'north'; break;
        case SOUTH: cmdString = 'south'; break;
        case EAST: cmdString = 'east'; break;
        case WEST: cmdString = 'west'; break;
        case TAKE: cmdString = 'take'; break;
        case DROP: cmdString = 'drop'; break;
        case INV: cmdString = 'inv'; break;
    }

    if (args != '' && (command == TAKE || command == DROP)) cmdString += ' ' + args;
    // console.log(`${command} + ${args} = ${cmdString}`);
    cmdString += '\n';

    return cmdString.split('').map(c => c.charCodeAt(0));
}

function needCommand(value) {
    if (value.includes('Command?')) return true;
    if (value.includes('keypad')) return true;
    return false;
}

let breakMainLoop = false;

mainLoop:
do {
    let breakProcessingLoop = false;
    let toDisplay;
    do {
        state = intCode(program, input, state.output, state.index, state.rIndex);
        if (state.output.find(n => n == 10)) {
            toDisplay = String.fromCharCode.apply(null, state.output);
            state.output = [];
            breakProcessingLoop = true;
        }
    } while(!breakProcessingLoop);
    

    if (needCommand(toDisplay)) {
        let command = 0, args = '';
        command = readlineSync.keyInSelect(actions, 'Command?');
        if (command == EXIT) break mainLoop;

        if (command == TAKE || command == DROP) {
            args = readlineSync.question(`What item would you like to ${(command == TAKE) ? 'take' : 'drop'}? `);
        }
        input = generateInput(command, args);
    } else {
        process.stdout.write(toDisplay);
    }
} while(!breakMainLoop);
