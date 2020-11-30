const fs = require('fs');
const { calculateBiodiversity, countAllBugs, parseMap, updateLayeredMap, updateMap } = require('../src/biodiversity');

const BASE_PATH = 'G:/Projects/aoc_2019';
const data = fs.readFileSync(`${BASE_PATH}/inputs/24.txt`).toString();

let map = parseMap(data);

let results = [map];
let shouldBreak = false;

do {
    let result = updateMap(results.slice(-1).pop());
    if (results.find(r => r == result)) shouldBreak = true;
    results.push(result);
} while(!shouldBreak);

let biodiversity = calculateBiodiversity(results.slice(-1).pop());

console.log(`Biodiversity Value: ${biodiversity}`);

let maps = new Map();
maps.set(0, map);

let minutes = 0;

do {
    maps = updateLayeredMap(maps);
    minutes++;
} while(minutes < 200);

let bugs = countAllBugs(maps);
console.log(`Bug Total: ${bugs}`);
