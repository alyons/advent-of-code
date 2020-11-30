const { calculateFFT, calculateFFTWithRepeat, getPatternValue, parseInput } = require('../frequency');
const pattern = [0, 1, 0, -1];

describe('Parse Input', () => {
    test('12345678', () => {
        let expected = [1,2,3,4,5,6,7,8];
        let actual = parseInput('12345678');
        const isNumber = (value) => !Number.isNaN(value);
        expect(actual).toEqual(expected);
        expect(actual.every(isNumber)).toBeTruthy();
    });
});

describe('Get Pattern Value [0, 1, 0, -1]', () => {
    test('Signal Index: 7 Pattern Index: 6', () => {
        let actual = getPatternValue(pattern, 7, 6);
        expect(actual).toBe(0);
    });

    test('Signal Index: 0 Pattern Index: 0', () => {
        let actual = getPatternValue(pattern, 0, 0);
        expect(actual).toBe(1);
    });

    test('Signal Index: 2 Pattern Index: 6', () => {
        let actual = getPatternValue(pattern, 2, 6);
        expect(actual).toBe(0);
    });

    test('Signal Index: 1 Pattern Index: 5', () => {
        let actual = getPatternValue(pattern, 1, 5);
        expect(actual).toBe(-1);
    });

    test('Signal Index: 0 Pattern Index: 3', () => {
        let actual = getPatternValue(pattern, 0, 3);
        expect(actual).toBe(0)
    });

    test('Signal Index: 1 Pattern Index: 7', () => {
        let actual = getPatternValue(pattern, 1, 7);
        expect(actual).toBe(0)
    });
});

describe('Calculate FTT', () => {
    describe('Signal: 12345678 Pattern: [0, 1, 0, -1]', () => {
        let baseSignal = [1,2,3,4,5,6,7,8];

        test('1 Phase', () => {
            let signal = baseSignal.slice();
            calculateFFT(signal, pattern, 1);
            let expected = [4, 8, 2, 2, 6, 1, 5, 8];
            expect(signal).toEqual(expected);
        });
    
        test('4 Phases', () => {
            let signal = baseSignal.slice();
            calculateFFT(signal, pattern, 4);
            let expected = [0, 1, 0, 2, 9, 4, 9, 8];
            expect(signal).toEqual(expected);
        });
    });

    describe('100 Phases', () => {        
        test('80871224585914546619083218645595', () => {
            let signal = parseInput('80871224585914546619083218645595');
            calculateFFT(signal, pattern, 100);
            let actual = signal.slice(0, 8);
            let expected = [2, 4, 1, 7, 6, 1, 7, 6];
            expect(actual).toEqual(expected);
        });

        test('19617804207202209144916044189917', () => {
            let signal = parseInput('19617804207202209144916044189917');
            calculateFFT(signal, pattern, 100);
            let actual = signal.slice(0, 8);
            let expected = [7, 3, 7, 4, 5, 4, 1, 8];
            expect(actual).toEqual(expected);
        });

        test('69317163492948606335995924319873', () => {
            let signal = parseInput('69317163492948606335995924319873');
            calculateFFT(signal, pattern, 100);
            let actual = signal.slice(0, 8);
            let expected = [5, 2, 4, 3, 2, 1, 3, 3];
            expect(actual).toEqual(expected);
        });
    });
});

describe('Calculate FFT Ex', () => {
    describe('Signal: 12345678 Pattern: [0, 1, 0, -1]', () => {
        let baseSignal = [1,2,3,4,5,6,7,8];

        test('1 Phase', () => {
            let signal = baseSignal.slice();
            calculateFFTWithRepeat(signal, pattern, 1);
            let expected = [4, 8, 2, 2, 6, 1, 5, 8];
            expect(signal).toEqual(expected);
        });
    
        test('4 Phases', () => {
            let signal = baseSignal.slice();
            calculateFFTWithRepeat(signal, pattern, 4);
            let expected = [0, 1, 0, 2, 9, 4, 9, 8];
            expect(signal).toEqual(expected);
        });
    });

    describe('100 Phases', () => {        
        test('80871224585914546619083218645595', () => {
            let signal = parseInput('80871224585914546619083218645595');
            calculateFFTWithRepeat(signal, pattern, 100);
            let actual = signal.slice(0, 8);
            let expected = [2, 4, 1, 7, 6, 1, 7, 6];
            expect(actual).toEqual(expected);
        });

        test('19617804207202209144916044189917', () => {
            let signal = parseInput('19617804207202209144916044189917');
            calculateFFTWithRepeat(signal, pattern, 100);
            let actual = signal.slice(0, 8);
            let expected = [7, 3, 7, 4, 5, 4, 1, 8];
            expect(actual).toEqual(expected);
        });

        test('69317163492948606335995924319873', () => {
            let signal = parseInput('69317163492948606335995924319873');
            calculateFFTWithRepeat(signal, pattern, 100);
            let actual = signal.slice(0, 8);
            let expected = [5, 2, 4, 3, 2, 1, 3, 3];
            expect(actual).toEqual(expected);
        });
    });
});
