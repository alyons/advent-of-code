const { calculateOrbits, calculateOrbitalTransfers } = require('../calculateOrbits');

const program1 = 'COM)B\r\nB)C\r\nC)D\r\nD)E\r\nE)F\r\nB)G\r\nG)H\r\nD)I\r\nE)J\r\nJ)K\r\nK)L';
const program2 = 'COM)B\r\nB)C\r\nC)D\r\nD)E\r\nE)F\r\nB)G\r\nG)H\r\nD)I\r\nE)J\r\nJ)K\r\nK)L\r\nK)YOU\r\nI)SAN';

test('Given the program, there should be 42 total orbits', () => {
    expect(calculateOrbits(program1)).toBe(42);
});

test('Given the program, the orbital transfers should be 4', () => {
    expect(calculateOrbitalTransfers(program2, 'YOU', 'SAN')).toBe(4);
});