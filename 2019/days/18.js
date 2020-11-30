const { navigateMaze, parseMaze } = require('../src/maze');
const fs = require('fs');
const BASE_PATH = 'G:/Projects/aoc_2019'; // '/Users/ag22845/workspace/aoc_2019';
const data = fs.readFileSync(`${BASE_PATH}/src/__data__/maze0.txt`).toString();

let tiles = parseMaze(data);
let path = navigateMaze(tiles);

console.log(path);
