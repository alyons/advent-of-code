const fs = require('fs');
const { createChemical, parseProcesses, removeChemical } = require('../src/chemicalPlant.v2');
const { printSameLine } = require('../src/utils');

const BASE_PATH = 'G:/Projects/aoc_2019';
// const INPUT = fs.readFileSync(`${BASE_PATH}/src/__data__/fuelProcess3.txt`).toString();

// const BASE_PATH = '/Users/ag22845/workspace/aoc_2019';
const INPUT = fs.readFileSync(`${BASE_PATH}/inputs/fourteen.txt`).toString();

let store = new Map([['ORE', 0]]);
let processes = parseProcesses(INPUT);
const maxOre = 1000000000000;

function formatNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

createChemical('FUEL', 1, processes, store);

// console.log(chemicalStore);
console.log(`Ore Required: ${store.get('ORE')}`);

let incValue = 1;

do {
    store = new Map([['ORE', 0]]);
    incValue *= 10;
    createChemical('FUEL', incValue, processes, store);
} while(store.get('ORE') < maxOre);

incValue /= 10;
let maxLength = ('' + incValue).length;
console.log(`Max Length: ${maxLength}`);
let stringIndex = 0;
do {
    store = new Map([['ORE', 0]]);
    createChemical('FUEL', incValue, processes, store);
    if (store.get('ORE') < maxOre) {
        let testString = '' + incValue;
        let digit = parseInt(testString.charAt(stringIndex)) + 1;
        incValue = parseInt(testString.substring(0, stringIndex) + digit + testString.substring(stringIndex + 1));
    } else {
        let testString = '' + incValue;
        let digit = parseInt(testString.charAt(stringIndex)) - 1;
        incValue = parseInt(testString.substring(0, stringIndex) + digit + testString.substring(stringIndex + 1));
        stringIndex++;
    }
} while (stringIndex < maxLength);

console.log(`Found Value: ${formatNumber(incValue)}`);




// createChemical('FUEL', 3756877, processes, store);

console.log(`Fuel Generated: ${formatNumber(store.get('FUEL'))}`);
console.log(`Ore Consumed: ${formatNumber(store.get('ORE'))}`);
console.log(`Max Ore:      ${formatNumber(maxOre)}`);
