const { calculateEnergy, updateMoons } = require('../moons');

describe('Calculate Energy', () => {
    let moons = [
        { pos: { x: 2, y: 1, z: -3 }, vel: { x: -3, y: 2, z: 1 } },
        { pos: { x: 1, y: -8, z: 0 }, vel: { x: -1, y: 1, z: 3 } },
        { pos: { x: 3, y: -6, z: 1 }, vel: { x: 3, y: 2, z: -3 } },
        { pos: { x: 2, y: 0, z: 4 }, vel: { x: 1, y: 1, z: -1 } }
    ];

    test('Calculate Energy', () => {
        let expected = 179;
        let actual = calculateEnergy(moons);
        expect(actual).toBe(expected);
    });
});

describe('Update Moon', () => {
    describe('Test Data 0:', () => {
        let moons = [
            { pos: { x: -1, y: 0, z: 2 }, vel: { x: 0, y: 0, z: 0 } },
            { pos: { x: 2, y: -10, z: -7 }, vel: { x: 0, y: 0, z: 0 } },
            { pos: { x: 4, y: -8, z: 8 }, vel: { x: 0, y: 0, z: 0 } },
            { pos: { x: 3, y: 5, z: -1 }, vel: { x: 0, y: 0, z: 0 } }
        ];

        test('After Step 1:', () => {
            let expected = [
                { pos: { x: 2, y: -1, z: 1 }, vel: { x: 3, y: -1, z: -1 } },
                { pos: { x: 3, y: -7, z: -4 }, vel: { x: 1, y: 3, z: 3 } },
                { pos: { x: 1, y: -7, z: 5 }, vel: { x: -3, y: 1, z: -3 } },
                { pos: { x: 2, y: 2, z: 0 }, vel: { x: -1, y: -3, z: 1 } }
            ];
            updateMoons(moons, 1);
            expect(moons).toEqual(expected);
        });

        test('After Step 10:', () => {
            let expected = [
                { pos: { x: 2, y: 1, z: -3 }, vel: { x: -3, y: -2, z: 1 } },
                { pos: { x: 1, y: -8, z: 0 }, vel: { x: -1, y: 1, z: 3 } },
                { pos: { x: 3, y: -6, z: 1 }, vel: { x: 3, y: 2, z: -3 } },
                { pos: { x: 2, y: 0, z: 4 }, vel: { x: 1, y: -1, z: -1 } }
            ];
            updateMoons(moons, 9);
            expect(moons).toEqual(expected);
        });
    });

    describe('Test Data 1', () => {
        let moons = [
            { pos: { x: -8, y: -10, z:  0 }, vel: { x: 0, y: 0, z: 0 } },
            { pos: { x:  5, y:   5, z: 10 }, vel: { x: 0, y: 0, z: 0 } },
            { pos: { x:  2, y:  -7, z:  3 }, vel: { x: 0, y: 0, z: 0 } },
            { pos: { x:  9, y:  -8, z: -3 }, vel: { x: 0, y: 0, z: 0 } }
        ];

        test('After 10 steps:', () => {
            let expected = [
                { pos: { x: -9, y: -10, z:  1 }, vel: { x: -2, y: -2, z: -1 } },
                { pos: { x:  4, y:  10, z:  9 }, vel: { x: -3, y:  7, z: -2 } },
                { pos: { x:  8, y: -10, z: -3 }, vel: { x:  5, y: -1, z: -2 } },
                { pos: { x:  5, y: -10, z:  3 }, vel: { x:  0, y: -4, z:  5 } }
            ];
            updateMoons(moons, 10);
            expect(moons).toEqual(expected);
        });

        test('After 100 steps:', () => {
            let expected = [
                { pos: { x:  8, y: -12, z: -9 }, vel: { x: -7, y:  3, z:  0 } },
                { pos: { x: 13, y:  16, z: -3 }, vel: { x:  3, y:-11, z: -5 } },
                { pos: { x:-29, y: -11, z: -1 }, vel: { x: -3, y:  7, z:  4 } },
                { pos: { x: 16, y: -13, z: 23 }, vel: { x:  7, y:  1, z:  1 } }
            ];
            updateMoons(moons, 90);
            expect(moons).toEqual(expected);
        });

        test('Energy Total [1940]:', () => {
            expect(calculateEnergy(moons)).toBe(1940);
        });
    });
});
