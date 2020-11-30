const validatePassword = require('../validatePassword');

test('111111 is invalid', () => {
    expect(validatePassword(111111)).toBe(false);
});

test('223450 is invalid', () => {
    expect(validatePassword(223450)).toBe(false);
});

test('123789 is invalid', () => {
    expect(validatePassword(123789)).toBe(false);
});

test('112233 is valid', () => {
    expect(validatePassword(112233)).toBe(true);
});

test('123444 is invalid', () => {
    expect(validatePassword(123444)).toBe(false);
});

test('111122 is valid', () => {
    expect(validatePassword(111122)).toBe(true);
});