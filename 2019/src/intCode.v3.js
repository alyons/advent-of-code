function readMemory(memory, index, rIndex, mode) {
    let trueIndex = -1;

    switch(mode) {
        case 0: trueIndex = memory[index]; break;
        case 1: trueIndex = index; break;
        case 2: trueIndex = rIndex +  memory[index]; break;
        default: throw new Error(`Invalid read mode ${mode} selected for parameter`);
    }

    while (memory.length < trueIndex + 1) memory.push(0);
    // console.log(`${trueIndex} <= ${memory.length}`);

    return Number(memory[trueIndex]);
}

function writeMemory(memory, index, rIndex, mode, value) {
    let trueIndex = -1;

    switch(mode) {
        case 0: trueIndex = memory[index]; break;
        case 2: trueIndex = rIndex +  memory[index]; break;
        default: throw new Error(`Invalid write mode ${mode} selected for parameter`);
    }

    while (memory.length < trueIndex - 1) memory.push(0);

    memory[trueIndex] = Number(value);
}

function add(memory, command, index, rIndex) {
    let a = readMemory(memory, index + 1, rIndex, command[1]);
    let b = readMemory(memory, index + 2, rIndex, command[2]);
    let value = a + b;
    writeMemory(memory, index + 3, rIndex, command[3], value);

    return index + 4;
}

function multiply(memory, command, index, rIndex) {
    let a = readMemory(memory, index + 1, rIndex, command[1]);
    let b = readMemory(memory, index + 2, rIndex, command[2]);
    let value = a * b;
    writeMemory(memory, index + 3, rIndex, command[3], value);

    return index + 4;
}

function writeInput(memory, command, index, rIndex, input) {
    let value = input.shift();
    writeMemory(memory, index + 1, rIndex, command[1], value);
    return index + 2;
}

function writeOutput(memory, command, index, rIndex, output) {
    let a = readMemory(memory, index + 1, rIndex, command[1]);
    output.push(a);

    return index + 2;
}

function jumpIfTrue(memory, command, index, rIndex) {
    let a = readMemory(memory, index + 1, rIndex, command[1]);
    let b = readMemory(memory, index + 2, rIndex, command[2]);

    return (a !== 0) ? b : index + 3;
}

function jumpIfFalse(memory, command, index, rIndex) {
    let a = readMemory(memory, index + 1, rIndex, command[1]);
    let b = readMemory(memory, index + 2, rIndex, command[2]);

    return (a == 0) ? b : index + 3;
}

function lessThan(memory, command, index, rIndex) {
    let a = readMemory(memory, index + 1, rIndex, command[1]);
    let b = readMemory(memory, index + 2, rIndex, command[2]);
    writeMemory(memory, index + 3, rIndex, command[3], (a < b) ? 1 : 0);

    return index + 4;
}

function equalTo(memory, command, index, rIndex) {
    let a = readMemory(memory, index + 1, rIndex, command[1]);
    let b = readMemory(memory, index + 2, rIndex, command[2]);
    writeMemory(memory, index + 3, rIndex, command[3], (a == b) ? 1 : 0);

    return index + 4;
}

function updateRelativeBase(memory, command, index, rIndex) {
    let a = readMemory(memory, index + 1, rIndex, command[1]);

    // console.log(`${a} = readMemory(program, ${index + 1}, ${rIndex}, ${command[1]});`)

    return rIndex + a;
}

function getCommand(rawCommand) {
    let cmdString = ('' + rawCommand);
    while(cmdString.length < 5) cmdString = '0' + cmdString;
    let command = []
    command.push(Number(cmdString.slice(-2)));  // command[0]
    command.push(Number(cmdString[2]));         // command[1]
    command.push(Number(cmdString[1]));         // command[2]
    command.push(Number(cmdString[0]));         // command[3]
    return command;
}

function intCode(memory, input = [], output = [], index = 0, rIndex = 0) {
    let shouldExit = false;

    do {
        let command = getCommand(memory[index]);
        // console.log(command);

        switch(command[0]) {
            case 1: index = add(memory, command, index, rIndex); break;
            case 2: index = multiply(memory, command, index, rIndex); break;
            case 3: index = writeInput(memory, command, index, rIndex, input); break;
            case 4: index = writeOutput(memory, command, index, rIndex, output); return { output, index, rIndex };
            case 5: index = jumpIfTrue(memory, command, index, rIndex); break;
            case 6: index = jumpIfFalse(memory, command, index, rIndex); break;
            case 7: index = lessThan(memory, command, index, rIndex); break;
            case 8: index = equalTo(memory, command, index, rIndex); break;
            case 9: rIndex = updateRelativeBase(memory, command, index, rIndex); index += 2; break;
            case 99: return { output, index: 'HALT', rIndex };
            default: throw new Error(`Error: Invalid command ${command[0]} found at index ${index}`);   
        }
    } while(!shouldExit);
}

module.exports = intCode;
