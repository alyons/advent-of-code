function containsDoubleDigits(password) {
    let stringified = '' + password;
    for(let i = 0; i < stringified.length - 1; i += 1) {
        if (stringified[i] == stringified[i + 1] && (stringified.match(new RegExp(stringified[i], "g")) || []).length == 2) {
            return true;
        }
    }
    return false;
}

function decreasingDigits(password) {
    let digits = ('' + password).split('').map(s => { return Number.parseInt(s); });
    for(let i = 0; i < digits.length - 1; i+= 1) {
        if (digits[i] > digits[i + 1]) {
            return true;
        }
    }

    return false;
}

function validatePassword(password) {
    return containsDoubleDigits(password) && !decreasingDigits(password);
}

module.exports = validatePassword;
