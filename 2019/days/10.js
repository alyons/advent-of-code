const { findBestStation, vaporizeAsteroids } = require('../src/asteroids');
const fs = require('fs');
const input = fs.readFileSync("G:/Projects/aoc_2019/inputs/ten.txt").toString();

let station = findBestStation(input);

console.log(station);

let order = vaporizeAsteroids(input, station.position.x, station.position.y);

console.log(order[199]);
