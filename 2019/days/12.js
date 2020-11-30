const { calculateEnergy, calculatePeriod, updateMoons } = require('../src/moons');

let moons = [
    { pos: { x:   4, y: 12, z: 13 }, vel: { x: 0, y: 0, z: 0 } },
    { pos: { x:  -9, y: 14, z: -3 }, vel: { x: 0, y: 0, z: 0 } },
    { pos: { x:  -7, y: -1, z:  2 }, vel: { x: 0, y: 0, z: 0 } },
    { pos: { x: -11, y: 17, z: -1 }, vel: { x: 0, y: 0, z: 0 } }
];

updateMoons(moons, 1000);
console.log(`Energy: ${calculateEnergy(moons)}`);

let xValues = [4, -9, -7, -11];
let yValues = [12, 14, -1, 17];
let zValues = [13, -3, 2, -1];

let xPeriod = calculatePeriod(xValues);
let yPeriod = calculatePeriod(yValues);
let zPeriod = calculatePeriod(zValues);

console.log(`X Period: ${xPeriod}`);
console.log(`Y Period: ${yPeriod}`);
console.log(`Z Period: ${zPeriod}`);

function calculateFactors(n) {
    let i = 2;
    while(n % i > 0) i++;

    if (i == n) {
        return [i];
    }

    return [i].concat(calculateFactors(n/i));
}

console.log(xPeriod * yPeriod * zPeriod);

let xFactors = calculateFactors(xPeriod);
let yFactors = calculateFactors(yPeriod);
let zFactors = calculateFactors(zPeriod);

console.log(`X Factors: ${xFactors}`);
console.log(`Y Factors: ${yFactors}`);
console.log(`Z Factors: ${zFactors}`);