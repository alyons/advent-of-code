const fs = require('fs');
const { navigateMaze, parseMaze } = require('../maze');

const BASE_PATH = 'G:/Projects/aoc_2019'; // '/Users/ag22845/workspace/aoc_2019';
const data0 = fs.readFileSync(`${BASE_PATH}/src/__data__/maze0.txt`).toString();
const data1 = fs.readFileSync(`${BASE_PATH}/src/__data__/maze1.txt`).toString();
const data2 = fs.readFileSync(`${BASE_PATH}/src/__data__/maze2.txt`).toString();
const data3 = fs.readFileSync(`${BASE_PATH}/src/__data__/maze3.txt`).toString();
const data4 = fs.readFileSync(`${BASE_PATH}/src/__data__/maze4.txt`).toString();

// describe('Parse Maze', () => {
//     test('Read Data from Map 0', () => {
//         const actual = parseMaze(data0);
//         expect(actual).toHaveLength(7);
//     });
// });

describe('Navigate Maze', () => {
    // test('Navigate Maze 0', () => {
    //     const maze = parseMaze(data0);
    //     const path = navigateMaze(maze);
    //     expect(path).toHaveLength(8);
    // });

    test('Navigate Maze 1', () => {
        const maze = parseMaze(data1);
        const path = navigateMaze(maze);
        expect(path).toHaveLength(86);
    });

    // test('Navigate Maze 2', () => {
    //     const maze = parseMaze(data2);
    //     const path = navigateMaze(maze);
    //     expect(path).toHaveLength(132);
    // });

    // test('Navigate Maze 3', () => {
    //     const maze = parseMaze(data3);
    //     const path = navigateMaze(maze);
    //     expect(path).toHaveLength(136);
    // });

    // test('Navigate Maze 4', () => {
    //     const maze = parseMaze(data4);
    //     const path = navigateMaze(maze);
    //     expect(path).toHaveLength(81);
    // });
});