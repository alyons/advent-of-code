const { intCode, runThrusters } = require('../intCode.v2');

// describe('Program [3,9,8,9,10,9,4,9,99,-1,8]', () => {
//     let program = [3,9,8,9,10,9,4,9,99,-1,8];

//     test('If input is equal to 8, output 1', () => {
//         expect(intCode(program, 0, [8])).toBe(1);
//     });

//     test('If input is not equal to 8, output 0', () => {
//         expect(intCode(program, 0, [6])).toBe(0);
//     });
// });

// describe('Program [3,3,1108,-1,8,3,4,3,99]', () => {
//     let program = [3,3,1108,-1,8,3,4,3,99];

//     test('If input is equal to 8, output 1', () => {
//         expect(intCode(program, 0, [8])).toBe(1);
//     });

//     test('If input is not equal to 8, output 0', () => {
//         expect(intCode(program, 0, [6])).toBe(0);
//     });
// });

// describe('Program [3,9,7,9,10,9,4,9,99,-1,8]', () => {
//     let program = [3,9,7,9,10,9,4,9,99,-1,8];

//     test('If input is less than to 8, output 1', () => {
//         expect(intCode(program, 0, [7])).toBe(1);
//     });

//     test('If input is not less than to 8, output 0', () => {
//         expect(intCode(program, 0, [8])).toBe(0);
//     });
// });

// describe('Program [3,3,1107,-1,8,3,4,3,99]', () => {
//     let program = [3,3,1107,-1,8,3,4,3,99];

//     test('If input is less than to 8, output 1', () => {
//         expect(intCode(program, 0, [7])).toBe(1);
//     });

//     test('If input is not less than to 8, output 0', () => {
//         expect(intCode(program, 0, [8])).toBe(0);
//     });
// });

// describe('Program [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]', () => {
//     let program = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];

//     test('If input is 0, output 0', () => {
//         expect(intCode(program, 0, [0])).toBe(0);
//     });

//     test('If input is non-zero, output 1', () => {
//         expect(intCode(program, 0, [37])).toBe(1);
//     });
// });

// describe('Program [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]', () => {
//     let program = [];

//     beforeEach(() => {
//         program = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];
//     });

//     test('If input is 0, output 0', () => {
//         expect(intCode(program, 0, [0], 0)).toBe(0);
//     });

//     test('If input is non-zero, output 1', () => {
//         expect(intCode(program, 0, [37], 0)).toBe(1);
//     });
// });

// describe('Program [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]', () => {
//     let program = [];

//     beforeEach(() => {
//         program = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
//     });

//     test('If input is equal to 8, output 1000', () => {
//         expect(intCode(program, 0, [8])).toBe(1000);
//     });

//     test('If input is less than 8, output 999', () => {
//         expect(intCode(program, 0, [6])).toBe(999);
//     });

//     test('If input is greater than to 8, output 1001', () => {
//         expect(intCode(program, 0, [99])).toBe(1001);
//     });
// });

// describe('Thruster signal 43210 with program', () => {
//     let program = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
//     let phaseSequence = [4,3,2,1,0];

//     test('Run Program', () => {
//         let output = 0;
//         while(phaseSequence.length > 0) {
//             output = intCode(program, 0, [phaseSequence.shift(), output]);
//         }
//         expect(output).toBe(43210);
//     });
// });

// describe('Thruster signal 54321 with program', () => {
//     let program = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
//     let phaseSequence = [0,1,2,3,4];

//     test('Run Program', () => {
//         let output = 0;
//         while(phaseSequence.length > 0) {
//             output = intCode(program, 0, [phaseSequence.shift(), output]);
//         }
//         expect(output).toBe(54321);
//     });
// });

// describe('Thruster signal 65210 with program', () => {
//     let program = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
//     let phaseSequence = [1,0,4,3,2];

//     test('Run Program', () => {
//         let output = 0;
//         while(phaseSequence.length > 0) {
//             output = intCode(program, 0, [phaseSequence.shift(), output]);
//         }
//         expect(output).toBe(65210);
//     });
// });

describe('Feedback Loop Thrusters', () => {
    test('Run the First Test [9,8,7,6,5]', () => {
        let program = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];
        let phaseSequence = [9,8,7,6,5];
        let output = runThrusters(program, phaseSequence, false);
        expect(output).toBe(139629729);
    });

    test('Run the Second Test [9,7,8,5,6]', () => {
        let program = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10];
        let phaseSequence = [9,7,8,5,6];
        let output = runThrusters(program, phaseSequence, false);
        expect(output).toBe(18216);
    });
});
