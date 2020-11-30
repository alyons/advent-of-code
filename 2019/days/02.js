const intCode = require('../src/intCode');
const { replaceAt } = require('../src/utils');
const input = require('../inputs/two.json');

mainLoop:
for(let noun = 0; noun < 100; noun += 1) {
    let nArray = replaceAt(input, 1, noun);
    for (let verb = 0; verb < 100; verb += 1) {
        let vArray = replaceAt(nArray, 2, verb);
        intCode(vArray);
        if (vArray[0] == 19690720) {
            console.log(`${100 * noun + verb}`);
            break mainLoop;
        }
    }
}
