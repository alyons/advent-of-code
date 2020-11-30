const validCommands = [1, 2, 3, 4, 5, 6, 7, 8, 99];

// 1 = Add
function add(array, optCode, input, output, shouldLog) {
    let params = ('' + array[optCode]).slice(0, -2);
    while (params.length < 3) params = '0' + params;
    params = params.split('');

    let param1 = (params[2] == '0') ? array[array[optCode + 1]] : array[optCode + 1];
    let param2 = (params[1] == '0') ? array[array[optCode + 2]] : array[optCode + 2];
    let result = param1 + param2;
    array.splice(array[optCode + 3], 1, result);

    if (shouldLog) {
        console.log(`Adding: ${param1} + ${param2} = ${result}. Setting array[${array[optCode + 3]}]: ${array[array[optCode + 3]]}`);
    }

    return [array, optCode + 4, input, output, shouldLog];
}

// 2 = Multiply
function multiply(array, optCode, input, output, shouldLog) {
    let params = ('' + array[optCode]).slice(0, -2);
    while (params.length < 3) params = '0' + params;
    params = params.split('');

    let param1 = (params[2] == '0') ? array[array[optCode + 1]] : array[optCode + 1];
    let param2 = (params[1] == '0') ? array[array[optCode + 2]] : array[optCode + 2];
    let result = param1 * param2;
    array.splice(array[optCode + 3], 1, result);

    if (shouldLog) {
        console.log(`Multiplying: ${param1} * ${param2} = ${result}. Setting array[${array[optCode + 3]}]: ${array[array[optCode + 3]]}`);
    }

    return [array, optCode + 4, input, output, shouldLog];
}

// 3 = Get Input
function getInput(array, optCode, input, output, shouldLog) {
    let value = input.shift();
    if (value == undefined) value = output;
    array.splice(array[optCode + 1], 1, value);
    if (shouldLog) {
        console.log(`Placing value ${value} at index ${array[optCode + 1]}: ${array[array[optCode + 1]]}`);
    }
    return [array, optCode + 2, input, output, shouldLog];
}

// 4 = Place Output
function putOutput(array, optCode, input, output, shouldLog) {
    let params = ('' + array[optCode]).slice(0, -2);
    while (params.length < 1) params = '0' + params;
    output = (params == '0') ? array[array[optCode + 1]] : array[optCode + 1];

    if (shouldLog) console.log(`Output set to: ${output}`);

    return [array, optCode + 2, input, output, shouldLog];
}

// 5 = Jump If True
function jumpIfTrue(array, optCode, input, output, shouldLog) {
    let params = ('' + array[optCode]).slice(0, -2);
    while (params.length < 2) params = '0' + params;
    params = params.split('');
    let param1 = (params[1] == '0') ? array[array[optCode + 1]] : array[optCode + 1];
    let param2 = (params[0] == '0') ? array[array[optCode + 2]] : array[optCode + 2];

    if (shouldLog) {
        console.log(`Jump if True: If ${param1} is non-zero, jump to instruction ${param2}`);
    }

    if (param1 !== 0) {
        optCode = param2;
    } else {
        optCode += 3;
    }

    return [array, optCode, input, output, shouldLog];
}

// 6 = Jump If False
function jumpIfFalse(array, optCode, input, output, shouldLog) {
    if (shouldLog) console.log('Jump If False');

    let params = ('' + array[optCode]).slice(0, -2);
    while (params.length < 2) params = '0' + params;
    params = params.split('');
    let param1 = (params[1] == '0') ? array[array[optCode + 1]] : array[optCode + 1];
    let param2 = (params[0] == '0') ? array[array[optCode + 2]] : array[optCode + 2];

    if (shouldLog) {
        console.log(`Jump if False: If ${param1} is zero, jump to instruction ${param2}`);
    }

    if (param1 == 0) {
        optCode = param2;
    } else {
        optCode += 3
    }

    return [array, optCode, input, output, shouldLog];
}

// 7 = Less Than
function lessThan(array, optCode, input, output, shouldLog) {
    if (shouldLog) console.log('Less Than');
    let params = ('' + array[optCode]).slice(0, -2);
    while (params.length < 3) params = '0' + params;
    params = params.split('');

    let param1 = (params[2] == '0') ? array[array[optCode + 1]] : array[optCode + 1];
    let param2 = (params[1] == '0') ? array[array[optCode + 2]] : array[optCode + 2];
    let result = (param1 < param2) ? 1 : 0;
    array.splice(array[optCode + 3], 1, result);

    if (shouldLog) {
        console.log(`Less than: ${param1} < ${param2} = ${result}. Setting array[${array[optCode + 3]}]: ${array[array[optCode + 3]]}`);
    }

    return [array, optCode + 4, input, output, shouldLog];
}

// 8 = EqualTo
function equalTo(array, optCode, input, output, shouldLog) {
    let params = ('' + array[optCode]).slice(0, -2);
    while (params.length < 3) params = '0' + params;
    params = params.split('');

    let param1 = (params[2] == '0') ? array[array[optCode + 1]] : array[optCode + 1];
    let param2 = (params[1] == '0') ? array[array[optCode + 2]] : array[optCode + 2];
    let result = (param1 == param2) ? 1 : 0;
    array.splice(array[optCode + 3], 1, result);

    if (shouldLog) {
        console.log(`Equal to: ${param1} == ${param2} = ${result}. Setting array[${array[optCode + 3]}]: ${array[array[optCode + 3]]}`);
    }

    return [array, optCode + 4, input, output, shouldLog];
}

function intCode(array, optCode = 0, input = [], output = 0, shouldLog = false) {

    let shouldExit = false;
    let currentValues = [array, optCode, input, output, shouldLog];
    let fullCommand = 0;

    do {
        if (shouldLog) console.log(`Opt Code: ${optCode}`);

        fullCommand = array[optCode];
        let command = Number.parseInt(('' + fullCommand).slice(-2));

        if (validCommands.indexOf(command) < 0) throw new Error(`Invalid command found: ${command}`);

        switch(command) {
            case 1: currentValues = add(array, optCode, input, output, shouldLog); break;
            case 2: currentValues = multiply(array, optCode, input, output, shouldLog); break;
            case 3: currentValues = getInput(array, optCode, input, output, shouldLog); break;
            case 4: currentValues = putOutput(array, optCode, input, output, shouldLog); shouldExit = true; break;
            case 5: currentValues = jumpIfTrue(array, optCode, input, output, shouldLog); break;
            case 6: currentValues = jumpIfFalse(array, optCode, input, output, shouldLog); break;
            case 7: currentValues = lessThan(array, optCode, input, output, shouldLog); break;
            case 8: currentValues = equalTo(array, optCode, input, output, shouldLog); break;
            case 99: shouldExit = true; break;
        }

        array = currentValues[0];
        optCode = currentValues[1];
        input = currentValues[2];
        output = currentValues[3];
        shouldLog = currentValues[4];

    } while(!shouldExit);

    return (fullCommand == 99) ? output : [output, optCode];
}

function runThrusters(code, phaseSequence, shouldLog) {
    let amps = [];
    let executionState = [];
    let shouldExit = false;
    let output = 0;

    for(let i = 0; i < phaseSequence.length; i += 1) {
        let input = (i == 0) ? [phaseSequence[i], 0] : [phaseSequence[i]];
        let program = [code.slice(0), 0, input, 0, shouldLog];
        amps.push(program);
        executionState.push(0);
    }

    let currentAmp = 0;

    do {
        if (shouldLog) console.log(`Running Amp[${currentAmp}]: Opt Code: ${amps[currentAmp][1]} Input: ${amps[currentAmp][2]}`);
        let value = intCode(amps[currentAmp][0], amps[currentAmp][1], amps[currentAmp][2], amps[currentAmp][3], amps[currentAmp][4]);
        if (Array.isArray(value)) {
            if (shouldLog) console.log(`Soft stop for Amp[${currentAmp}]: ${value}`);
            amps[currentAmp][1] = value[1];
            if (currentAmp < amps.length - 1) currentAmp += 1; else currentAmp = 0;
            amps[currentAmp][2].push(value[0]);
            output = value[0];
        } else {
            if (shouldLog) console.log(`Final output for Amp[${currentAmp}]: ${value}`);
            if (currentAmp < amps.length - 1) {
                currentAmp += 1;
                amps[currentAmp][2].push(value);
            } else {
                shouldExit = true;
            }
        }
    } while(!shouldExit);

    return output;
}

module.exports = {
    intCode,
    runThrusters
};
