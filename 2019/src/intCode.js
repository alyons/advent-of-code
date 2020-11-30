const validCommands = [1, 2, 99];

function add(array, optCode) {
    let param1 = array[array[optCode + 1]];
    let param2 = array[array[optCode + 2]];
    let output = param1 + param2;
    array.splice(array[optCode + 3], 1, output);
    return intCode(array, optCode + 4);
}

function multiply(array, optCode) {
    let param1 = array[array[optCode + 1]];
    let param2 = array[array[optCode + 2]];
    let output = param1 * param2;
    array.splice(array[optCode + 3], 1, output);
    return intCode(array, optCode + 4);
}

function intCode(array, optCode = 0) {
    let command = array[optCode];

    if (validCommands.indexOf(command) < 0) {
        console.error(`Invalid command: ${command}`);
        return array;
    }

    if (command == 99) return array;

    switch(command) {
        case 1: return add(array, optCode);
        case 2: return multiply(array, optCode);
    }
}

module.exports = intCode;
