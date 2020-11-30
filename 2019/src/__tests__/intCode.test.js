const intCode = require('../intCode');

test('[1,0,0,0,99] should become [2,0,0,0,99]', () => {
    const expected = [2,0,0,0,99];
    const actual = intCode([1,0,0,0,99]);

    expect(expected.length).toBe(actual.length);
    for(let i = 0; i < expected.length; i++) {
        expect(expected[i]).toBe(actual[i]);
    }
});

test('[2,3,0,3,99] should become [2,3,0,6,99]', () => {
    const expected = [2,3,0,6,99];
    const actual = intCode([2,3,0,3,99]);

    expect(expected.length).toBe(actual.length);
    for(let i = 0; i < expected.length; i++) {
        expect(expected[i]).toBe(actual[i]);
    }
});

test('[2,4,4,5,99,0] should become [2,4,4,5,99,9801]', () => {
    const expected = [2,4,4,5,99,9801];
    const actual = intCode([2,4,4,5,99,0]);

    expect(expected.length).toBe(actual.length);
    for(let i = 0; i < expected.length; i++) {
        expect(expected[i]).toBe(actual[i]);
    }
});

test('[1,1,1,4,99,5,6,0,99] should become [30,1,1,4,2,5,6,0,99]', () => {
    const expected = [30,1,1,4,2,5,6,0,99];
    const actual = intCode([1,1,1,4,99,5,6,0,99]);

    expect(expected.length).toBe(actual.length);
    for(let i = 0; i < expected.length; i++) {
        expect(expected[i]).toBe(actual[i]);
    }
});