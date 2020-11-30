function parseInput(input) {
    return input.split('').map(c => parseInt(c));
}

function getPattern(pattern, index, length) {
    let output = [];
    for(let i = 0; i <= length; i++) {
        let toGet = Math.floor(i/(index + 1));
        while (toGet >= pattern.length) toGet -= pattern.length;
        output.push(pattern[toGet]);
    }
    return output.slice(1, 1 + length);
}

function getPatternValue(pattern, sIndex, pIndex) {
    let toGet = -1;
    let fullSequenceLength = pattern.length * (sIndex + 1);
    let offset = fullSequenceLength - 1;

    if (pIndex < offset) {
        let i = 0;
        let testValue = 0;
        let firstPass = true;
        do {
            testValue += (firstPass) ? sIndex : (sIndex + 1);
            firstPass = false;
            if (pIndex < testValue) break;
            i++;
        } while (i < pattern.length);
        toGet = i;
    } else {
        pIndex -= offset;
        pIndex %= fullSequenceLength;
        toGet = Math.floor(pIndex / (sIndex + 1));
    }

    return pattern[toGet];
}

function calculateFFT(signal, pattern, phases) {
    let patterns = [];
    for(let p = 0; p < signal.length; p++) patterns.push(getPattern(pattern, p, signal.length));

    let phase = 0;
    while (phase < phases) {
        let results = [];

        for(let i = 0; i < signal.length; i++) {
            let sum = 0;
            for (let j = 0; j < signal.length; j++) {
                sum += signal[j] * patterns[i][j]
            }
            results.push(Math.abs(sum % 10));
        }

        for (let i = 0; i < signal.length; i++) signal[i] = results[i];
        phase++;
    }
}

function calculateFFTWithRepeat(signal, pattern, phases) {
    for (let p = 0; p < phases; p++) {
        let results = [];

        for(let i = 0; i < signal.length; i++) {
            let sum = 0;
            for(let j = 0; j < signal.length; j++) {
                sum += signal[j] * getPatternValue(pattern, i, j);
            }
            results.push(Math.abs(sum % 10));
        }

        for (let i = 0; i < signal.length; i++) signal[i] = results[i];
        console.log(`Completed Phase ${p}`);
    }
}

module.exports = {
    calculateFFT,
    calculateFFTWithRepeat,
    getPattern,
    getPatternValue,
    parseInput
};
