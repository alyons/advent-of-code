const intCode = require('../intCode.v3');

describe('IntCode Version 3', () => {
    let program, input, state;

    beforeEach(() => {
        program = [];
        input = [];
        state = {
            output: [],
            index: 0,
            rIndex: 0
        };
    });

    test('Quine test', () => {
        program = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
        let expected = {
            output: [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99],
            index: 'HALT',
            rIndex: 16
        };
        while(state.index != 'HALT') { state = intCode(program, input, state.output, state.index, state.rIndex); }
        expect(state).toEqual(expected);
    });

    test('Large value addition', () => {
        program = [1102,34915192,34915192,7,4,7,99,0];
        let expected = {
            output: [1219070632396864],
            index: 'HALT',
            rIndex: 0
        };

        while(state.index != 'HALT') { state = intCode(program, input, state.output, state.index, state.rIndex); }
        expect(state).toEqual(expected);
    });

    test('Large Value Output', () => {
        program = [104,1125899906842624,99];
        let expected = {
            output: [1125899906842624],
            index: 'HALT',
            rIndex: 0
        };

        while(state.index != 'HALT') { state = intCode(program, input, state.output, state.index, state.rIndex); }
        expect(state).toEqual(expected);
    });
});
