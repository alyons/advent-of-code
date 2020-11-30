const { findBestStation, vaporizeAsteroids } = require('../asteroids');
const fs = require('fs');
const basePath = 'G:/Projects/aoc_2019';

describe('Detect Asteroids', () => {
    test('Asteroid Map 0', () => {
        const input = fs.readFileSync(`${basePath}/src/__data__/asteroidMap0.txt`).toString();
        const actual = findBestStation(input);
        const expected = { position: { x: 3, y: 4 }, asteroids: 8 };

        expect(actual).toEqual(expected);
    });

    test('Asteroid Map 1', () => {
        const input = fs.readFileSync(`${basePath}/src/__data__/asteroidMap1.txt`).toString();
        const actual = findBestStation(input);
        const expected = { position: { x: 5, y: 8 }, asteroids: 33 };

        expect(actual).toEqual(expected);
    });

    test('Asteroid Map 2', () => {
        const input = fs.readFileSync(`${basePath}/src/__data__/asteroidMap2.txt`).toString();
        const actual = findBestStation(input);
        const expected = { position: { x: 1, y: 2 }, asteroids: 35 };

        expect(actual).toEqual(expected);
    });

    test('Asteroid Map 3', () => {
        const input = fs.readFileSync(`${basePath}/src/__data__/asteroidMap3.txt`).toString();
        const actual = findBestStation(input);
        const expected = { position: { x: 6, y: 3 }, asteroids: 41 };

        expect(actual).toEqual(expected);
    });

    test('Asteroid Map 4', () => {
        const input = fs.readFileSync(`${basePath}/src/__data__/asteroidMap4.txt`).toString();
        const actual = findBestStation(input);
        const expected = { position: { x: 11, y: 13 }, asteroids: 210 };

        expect(actual).toEqual(expected);
    });
});

describe('Vaporize Asteroids', () => {
    test('Asteroid Map 4', () => {
        const input = fs.readFileSync(`${basePath}/src/__data__/asteroidMap4.txt`).toString();
        const actual = vaporizeAsteroids(input, 11, 13);

        expect(actual[0]).toEqual({ x: 11, y: 12 });
        expect(actual[1]).toEqual({x: 11, y: 12 });
        expect(actual[2]).toEqual({ x: 11, y: 12 });
        expect(actual[9]).toEqual({ x: 11, y: 12 });
        expect(actual[19]).toEqual({ x: 11, y: 12 });
        expect(actual[49]).toEqual({ x: 11, y: 12 });
        expect(actual[99]).toEqual({ x: 11, y: 12 });
        expect(actual[198]).toEqual({ x: 11, y: 12 });
        expect(actual[199]).toEqual({ x: 11, y: 12 });
        expect(actual[200]).toEqual({ x: 11, y: 12 });
        expect(actual[298]).toEqual({ x: 11, y: 12 });
    });
});
