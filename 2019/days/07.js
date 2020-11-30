const { intCode, runThrusters } = require('../src/intCode.v2');
const program = require('../inputs/seven.json');

let highestThrusterValue = Number.MIN_SAFE_INTEGER;

function getPermutations(inputArr) {
    var results = [];

    function permute(arr, mem = []) {
        let cur;

        for(let i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length == 0) {
                results.push(mem.concat(cur));
            }
            permute(arr.slice(), mem.concat(cur));
            arr.splice(i, 0, cur[0]);
        }
        
        return results;
    }

    return permute(inputArr);
}

let sequences = getPermutations([5, 6, 7, 8, 9]);

sequences.forEach(phase => {
    let output = runThrusters(program, phase, false);
    if (highestThrusterValue < output) highestThrusterValue = output;
});

console.log(`Thruster Value: ${highestThrusterValue}`);
