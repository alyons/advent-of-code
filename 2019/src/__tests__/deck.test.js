const { cut, deal, dealIncrement, runProgramExAid, runProgramWithIndex, runProgram } = require('../deck');
const fs = require('fs');
const BASE_PATH = 'G:/Projects/aoc_2019'; // 'C:/Users/pyrot/Projects/aoc_2019';

const program0 = fs.readFileSync(`${BASE_PATH}/src/__data__/deck0.txt`).toString();
const program1 = fs.readFileSync(`${BASE_PATH}/src/__data__/deck1.txt`).toString();
const program2 = fs.readFileSync(`${BASE_PATH}/src/__data__/deck2.txt`).toString();
const program3 = fs.readFileSync(`${BASE_PATH}/src/__data__/deck3.txt`).toString();
const program4 = fs.readFileSync(`${BASE_PATH}/inputs/22.txt`).toString();

test('Deal', () => {
    let input = [0,1,2,3,4,5,6,7,8,9];
    let expected = [9,8,7,6,5,4,3,2,1,0];
    let actual = deal(input);
    expect(actual).toEqual(expected);
});

describe('Cut', () => {
    test('3', () => {
        let input = [0,1,2,3,4,5,6,7,8,9];
        let expected = [3,4,5,6,7,8,9,0,1,2];
        let actual = cut(input, 3);
        expect(actual).toEqual(expected);
    });

    test('-4', () => {
        let input = [0,1,2,3,4,5,6,7,8,9];
        let expected = [6,7,8,9,0,1,2,3,4,5];
        let actual = cut(input, -4);
        expect(actual).toEqual(expected);
    });
});

test('Deal with Increment', () => {
    let input = [0,1,2,3,4,5,6,7,8,9];
    let expected = [0,7,4,1,8,5,2,9,6,3];
    let actual = dealIncrement(input, 3);
    expect(actual).toEqual(expected);
});

describe('Multiple Steps (Run Program)', () => {
    let deck;

    beforeEach(() => {
        deck = [0,1,2,3,4,5,6,7,8,9];
    });

    test('Program 0', () => {
        let actual = runProgram(deck, program0);
        let expected = [0,3,6,9,2,5,8,1,4,7];
        expect(actual).toEqual(expected);
    });

    test('Program 1', () => {
        let actual = runProgram(deck, program1);
        let expected = [3,0,7,4,1,8,5,2,9,6];
        expect(actual).toEqual(expected);
    });

    test('Program 2', () => {
        let actual = runProgram(deck, program2);
        let expected = [6,3,0,7,4,1,8,5,2,9];
        expect(actual).toEqual(expected);
    });

    test('Program 3', () => {
        let actual = runProgram(deck, program3);
        let expected = [9,2,5,8,1,4,7,0,3,6];
        expect(actual).toEqual(expected);
    });
});

describe('Direct Calculation', () => {
    test('Value at index 1 is 3 for Program 0', () => {
        let actual = runProgramWithIndex(program0, 10, 1);
        expect(actual).toBe(3);
    });

    test('Value at index 7 is 2 for Program 1', () => {
        let actual = runProgramWithIndex(program1, 10, 7);
        expect(actual).toBe(2);
    });

    test('Value at index 6326 is 2019 for Program 2', () => {
        let actual = runProgramWithIndex(program4, 10007, 6326);
        expect(actual).toBe(2019);
    });
});

describe('Ex-Aid Calculation', () => {
    test('Value at index 1 is 3 for Program 0', () => {
        let actual = runProgramExAid(program0, 10, 1);
        expect(actual).toBe(3);
    });

    test('Value at index 7 is 2 for Program 1', () => {
        let actual = runProgramExAid(program1, 10, 7);
        expect(actual).toBe(2);
    });

    test('Value at index 6326 is 2019 for Program 2', () => {
        let actual = runProgramExAid(program4, 10007, 6326);
        expect(actual).toBe(2019);
    });
});
