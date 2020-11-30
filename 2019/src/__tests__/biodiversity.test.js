const fs = require('fs');
const { calculateBiodiversity, countAllBugs, parseMap, updateLayeredMap, updateMap } = require('../biodiversity');

const BASE_PATH = 'G:/Projects/aoc_2019';
const map0 = fs.readFileSync(`${BASE_PATH}/src/__data__/biodiversity0.txt`).toString();

describe('Parse Map', () => {
    it('should parse the map into a binary string', () => {
        let expected = '0000110010100110010010000';
        let actual = parseMap(map0);
        expect(actual).toEqual(expected);
    });
});

describe('Update Map', () => {
    let map;
    beforeEach(() =>{ 
        map = '0000110010100110010010000';
    });

    it('Step 1', () => {
        let expected = '1001011110111011101101100';
        for(let i = 0; i < 1; i++) map = updateMap(map);
        expect(map).toEqual(expected);
    });

    it('Step 2', () => {
        let expected = '1111100001000010001010111';
        for(let i = 0; i < 2; i++) map = updateMap(map);
        expect(map).toEqual(expected);
    });

    it('Step 3', () => {
        let expected = '1000011110000111011001101';
        for(let i = 0; i < 3; i++) map = updateMap(map);
        expect(map).toEqual(expected);
    });

    it('Step 4', () => {
        let expected = '1111000001110010000011000';
        for(let i = 0; i < 4; i++) map = updateMap(map);
        expect(map).toEqual(expected);
    });
});

describe('Calculate Biodiversity', () => {
    it('Should get the correct value', () => {
        let expected = 2129920;
        let actual = calculateBiodiversity('0000000000000001000001000');
        expect(actual).toBe(expected);
    });
});

describe('Layered Map Bugs', () => {
    it('Should get the right value', () => {
        let maps = new Map();
        maps.set(0, '0000110010100110010010000');
        for(let i = 0; i < 10; i++) maps = updateLayeredMap(maps);
        let expected = 99;
        let actual = countAllBugs(maps);
        expect(actual).toBe(expected);
    });
});
