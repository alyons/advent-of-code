const fs = require('fs');
const { createChemical, parseProcesses, removeChemical } = require('../chemicalPlant.v2');


const BASE_PATH = 'G:/Projects/aoc_2019';
// const BASE_PATH = '/Users/ag22845/workspace/aoc_2019';
const input0 = fs.readFileSync(`${BASE_PATH}/src/__data__/fuelProcess0.txt`).toString();
const input1 = fs.readFileSync(`${BASE_PATH}/src/__data__/fuelProcess1.txt`).toString();
const input2 = fs.readFileSync(`${BASE_PATH}/src/__data__/fuelProcess2.txt`).toString();
const input3 = fs.readFileSync(`${BASE_PATH}/src/__data__/fuelProcess3.txt`).toString();
const input4 = fs.readFileSync(`${BASE_PATH}/src/__data__/fuelProcess4.txt`).toString();

describe('Create Chemical', () => {
    let store;
    beforeEach(() => {
        store = new Map();
    });

    describe('Input 0', () => {
        let processes = parseProcesses(input0);
        test('Create 1 of Element B', () => {
            createChemical('B', 1, processes, store);
            expect(store.get('B')).toEqual(1);
            expect(store.get('ORE')).toEqual(1);
        });

        test('Create 7 of Element A', () => {
            createChemical('A', 7, processes, store);
            expect(store.get('A')).toEqual(10);
            expect(store.get('ORE')).toEqual(10);
        });

        test('Create 1 of Element C', () => {
            createChemical('C', 1, processes, store);
            expect(store.get('C')).toEqual(1);
            expect(store.get('ORE')).toEqual(11);
        });

        test('Create 1 FUEL', () => {
            createChemical('FUEL', 1, processes, store);
            expect(store.get('FUEL')).toEqual(1);
            expect(store.get('ORE')).toEqual(31);
        });
    });

    describe('Input 1', () => {
        let processes = parseProcesses(input1);
        test('Create 1 Fuel', () => {
            createChemical('FUEL', 1, processes, store);
            expect(store.get('FUEL')).toEqual(1);
            expect(store.get('ORE')).toEqual(165);
        });
    });

    describe('Input 2', () => {
        let processes = parseProcesses(input2);
        test('Create 1 Fuel', () => {
            createChemical('FUEL', 1, processes, store);
            expect(store.get('FUEL')).toEqual(1);
            expect(store.get('ORE')).toEqual(13312);
        });
    });

    describe('Input 3', () => {
        let processes = parseProcesses(input3);
        test('Create 1 Fuel', () => {
            createChemical('FUEL', 1, processes, store);
            expect(store.get('FUEL')).toEqual(1);
            expect(store.get('ORE')).toEqual(180697);
        });
    });

    describe('Input 4', () => {
        let processes = parseProcesses(input4);
        test('Create 1 Fuel', () => {
            createChemical('FUEL', 1, processes, store);
            expect(store.get('FUEL')).toEqual(1);
            expect(store.get('ORE')).toEqual(2210736);
        });
    });
});

describe('Remove Chemical', () => {
    describe('Processes 0', () => {
        let processes = parseProcesses(input0);

        test('Remove 10 A', () => {
            let store = new Map([['A', 10], ['ORE', 10]]);
            removeChemical('A', 10, processes, store);
            expect(store.get('A')).toEqual(0);
            expect(store.get('ORE')).toEqual(0);
        });

        test('Remove 1 C', () => {
            let store = new Map([['ORE', 11], ['A', 3], ['C', 1]]);
            let expected = new Map([
                ['ORE', 0],
                ['A', 0],
                ['B', 0],
                ['C', 0]
            ]);
            removeChemical('C', 1, processes, store);
            expect(store).toEqual(expected);
        });

        test('Remove 1 FUEL', () => {
            let store = new Map([['ORE', 31], ['FUEL', 1]]);
            let expected = new Map([
                ['ORE', 0],
                ['A', 0],
                ['B', 0],
                ['C', 0],
                ['D', 0],
                ['E', 0],
                ['FUEL', 0]
            ]);
            removeChemical('FUEL', 1, processes, store);
            expect(store).toEqual(expected);
        });
    });
});

// describe('Remove Chemical', () => {
//     describe('Processes 0', () => {
//         let processes = parseProcesses(input0);
        
//         test('Remove 10 A', () => {
//             let chemicalStore = { A: 10, ORE: 10 };
//             let expected = { A: 0, ORE: 0 };
//             removeChemical('A', 10, processes, chemicalStore);
//             expect(chemicalStore).toEqual(expected);
//         });

//         test('Remove 1 C', () => {
//             let chemicalStore = { A: 3, B: 0, C: 1, ORE: 11 };
//             let expected = { A: 3, B: 0, C:0, ORE: 3 };
//             removeChemical('C', 1, processes, chemicalStore);
//             expect(chemicalStore).toEqual(expected);
//         });

//         test('Remove 1 Fuel', () => {
//             let chemicalStore = { A: 2, B: 0, C: 0, D: 0, E: 0, FUEL: 1, ORE: 31 };
//             let expected = { A: 2, B: 0, C:0, D: 0, E:0, FUEL: 0, ORE: 2 };
//             removeChemical('FUEL', 1, processes, chemicalStore);
//             expect(chemicalStore).toEqual(expected);
//         });
//     });
// });
