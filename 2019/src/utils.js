const arePositionsEqual = (a,b) => a[0] == b[0] && a[1] == b[1];

function replaceAt(array, index, value) {
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
}

function printSameLine(toPrint) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(toPrint);
}

module.exports = {
    arePositionsEqual,
    printSameLine,
    replaceAt
};
