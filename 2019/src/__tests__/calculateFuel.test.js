const calculateFuel = require('../calculateFuel');

test('14 units of mass to require 2 units of fuel', () => {
    expect(calculateFuel(12)).toBe(2);
});

test('1969 units of mass to require 966 units of fuel', () => {
    expect(calculateFuel(1969)).toBe(966);
});

test('100756 units of mass to require 50346 units of fuel', () => {
    expect(calculateFuel(100756)).toBe(50346);
});
