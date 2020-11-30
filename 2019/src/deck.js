const CUT = 'cut';
const DEAL = 'deal';
const INC = 'increment';

function deal(deck) {
    let output = [];
    while (deck.length > 0) output.splice(0, 0, deck.shift());
    return output;
}

function dealIncrement(deck, increment) {
    let output = deck.map(() => -1);
    let dIndex = 0;
    let oIndex = 0;
    do {
        output[oIndex] = deck[dIndex];
        dIndex++;
        oIndex += increment;
        if (oIndex > deck.length) oIndex -= deck.length;
    } while (deck.length > dIndex);

    return output;
}

function cut(deck, count) {
    let output = [];

    if (count > 0) {
        output = deck.slice(count);
        output = output.concat(deck.slice(0, count));
    } else {
        let otherCount = deck.length + count;
        output = deck.slice(count);
        output = output.concat(deck.slice(0, otherCount));
    }

    return output;
}

function parseProgram(program) {
    let instructions = [];

    program.split('\n').forEach(instruction => {
        let lastWord = instruction.split(' ').pop();
        if (instruction.includes(INC)) {
            instructions.push([INC, parseInt(lastWord)])
        } else if (instruction.includes(CUT)) {
            instructions.push([CUT, parseInt(lastWord)]);
        } else {
            instructions.push([DEAL]);
        }
    });

    return instructions;
}

function runProgram(deck, program) {
    let instructions = parseProgram(program);

    for (let i = 0; i < instructions.length; i++) {
        switch (instructions[i][0]) {
            case CUT:
                deck = cut(deck, instructions[i][1]);
                break;
            case INC:
                deck = dealIncrement(deck, instructions[i][1]);
                break;
            default:
                deck = deal(deck);
                break;
        }
    }

    return deck;
}

function modInverse(a, m) {
    // validate inputs
    // [a, m] = [Number(a), Number(m)]
    // if (Number.isNaN(a) || Number.isNaN(m)) {
    //     throw new Error(`Either a or m is not a number:\na: ${a}\nm: ${m}`);
    // }
    a = (a % m + m) % m
    if (!a || m < 2n) {
        throw new Error(`Invalid Input ${a} and ${m}`);
    }
    // find the gcd
    const s = []
    let b = m
    while (b) {
        [a, b] = [b, a % b]
        s.push({
            a,
            b
        })
    }
    if (a !== 1n) {
        throw new Error(`Inverse Modulo doesn't exist for ${a} and ${m}`);
    }
    // find the inverse
    let x = 1n
    let y = 0n
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * (s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}

function reverseIncrement(length, index, increment) {
    let value = modInverse(increment, length);
    return value * index % length; 
}

// function reverseIncrement(length, index, increment) {
//     let d = 0;
//     let i = 0;
//     do {
//         d++;
//         i += increment;
//         if (i >= length) i -= length;
//     } while (i != index);
//     if (d >= length) d -= length;
//     return d;
// }

// function reverseIncrement(length, index, increment) {
//     let a = parseInt(index / increment);
//     let b = index % increment;
//     let c = (increment - b) * increment + (a + 1);
//     return (b == 0) ? a : c;
// }

function reverseCut(length, index, cut) {
    index += cut;
    if (index < 0) index += length;
    if (index >= length) index -= length;
    return index;
}

function runProgramWithIndex(program, length, index) {
    let instructions = parseProgram(program);

    for (let i = instructions.length - 1; i > -1; i--) {
        switch (instructions[i][0]) {
            case CUT:
                index = reverseCut(length, index, instructions[i][1]);
                break;
            case INC:
                index = reverseIncrement(length, index, instructions[i][1]);
                break;
            default:
                index = (length - 1) - index;
                break;
        }
    }

    return index;
}

function parseProgramExAid(program) {
    let instructions = [];

    program.split('\n').forEach(instruction => {
        let lastWord = instruction.split(' ').pop();
        if (instruction.includes(INC)) {
            instructions.push([INC, BigInt(lastWord)])
        } else if (instruction.includes(CUT)) {
            instructions.push([CUT, BigInt(lastWord)]);
        } else {
            instructions.push([DEAL]);
        }
    });

    return instructions;
}

function parseRulesIntoPolynomials(length, instructions) {
    let a = 1n, b = 0n, z = 0n;
    for (let i = instructions.length - 1; i > -1; i--) {
        switch(instructions[i][0]) {
            case CUT:
                b += instructions[i][1];
                b %= length;
                break;
            case INC:
                z = modInverse(instructions[i][1], length);
                a = (a * z) % length;
                while(a < 0) a += length;
                b = (b * z) % length;
                break;
            default:
                a *= -1n;
                b = length - b - 1n;
                break;
        }
    }

    return [a, b];
}

function polyPow(a, b, m, n) {
    if (m == 0n) return [1, 0];
    if (m % 2n == 0n) return polyPow(a * a % n, (a * b + b) % n, m / 2n, n);
    let values = polyPow(a, b, m - 1n, n);
    let c = BigInt(values[0]), d = BigInt(values[1]);
    return [a * c % n, (a * d + b) % n];
}

function runProgramExAid(program, length, index, repeat = 1) {
    let instructions = parseProgramExAid(program);
    let values = parseRulesIntoPolynomials(length, instructions);
    let values2 = polyPow(values[0], values[1], repeat, length);
    // console.log(`Index: ${index}\nA: ${values2[0]}\nB: ${values2[1]}`);
    return (index * values2[0] + values2[1]) % length;
}

module.exports = {
    cut,
    deal,
    dealIncrement,
    reverseIncrement,
    runProgramWithIndex,
    runProgram,
    runProgramExAid
};