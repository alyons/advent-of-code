/* Day One - Calculate Fuel */
const calculateFuel = require('../src/calculateFuel');
const dayOneInput = require('../inputs/one.json');

let totalFuel = 0;
dayOneInput.forEach(mass => {
    totalFuel += calculateFuel(mass);
});

console.log(`Total Fuel: ${totalFuel}`);
