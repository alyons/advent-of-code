const validatePassword = require('../src/validatePassword');

const min = 278384;
const max = 824795;

let possiblePasswords = [];

for (let i = min; i <= max; i += 1) {
    if (validatePassword(i)) possiblePasswords.push(i);
}

console.log(possiblePasswords.length);
