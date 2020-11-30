const ORE = 'ORE';

function parseProcesses(input, splitString = '\n') {
    let regEx = /([0-9]+\s[A-Z]+)/g;
    let processes = [];
    let inputData = input.split(splitString);
    inputData.forEach(iData => {
        let chemicalData = [...iData.matchAll(regEx)];
        let process = [];
        chemicalData.forEach(chem => {
            let data = chem[0].split(' ');
            let chemical = {};
            chemical[data[1]] = parseInt(data[0]);
            process.push(chemical);
        });
        processes.push(process);
    });

    return processes;
}

function createChemical(chemical, desiredAmount, processes, chemicalStore) {
    if (Object.keys(chemicalStore).indexOf(chemical) == -1) chemicalStore[chemical] = 0;
    let process = processes.find(p => { return Object.keys(p.slice(-1)[0])[0] == chemical });
    let toCreateAmount = desiredAmount - chemicalStore[chemical];

    if (Object.keys(process[0])[0] == ORE) {
        let runs = Math.ceil(toCreateAmount / parseFloat(process[1][chemical]));
        chemicalStore[chemical] += runs * process[1][chemical];
        chemicalStore[ORE] += runs * process[0][ORE];
    } else {
        let runs = Math.ceil(toCreateAmount / parseFloat(process.slice(-1)[0][chemical]));
        for(let c = 0; c < process.length - 1; c++) {
            let name = Object.keys(process[c])[0]; // Name of the chemical
            let neededAmount = process[c][name] * runs;
            if (Object.keys(chemicalStore).indexOf(name) == -1) chemicalStore[name] = 0;
            if (chemicalStore[name] < neededAmount) createChemical(name, neededAmount, processes, chemicalStore);
            chemicalStore[name] -= neededAmount;
        }
        chemicalStore[chemical] += runs * process.slice(-1)[0][chemical];
    }
}

function removeChemical(chemical, amount, processes, chemicalStore) {
    if (Object.keys(chemicalStore).indexOf(chemical) == -1) chemicalStore[chemical] = 0;
    let process = processes.find(p => { return Object.keys(p.slice(-1)[0])[0] == chemical });
    let runs = Math.floor(amount / parseFloat(process.slice(-1)[0][chemical]));

    if (Object.keys(process[0])[0] == ORE) {
        chemicalStore[chemical] -= runs * process[1][chemical];
        chemicalStore[ORE] -= runs * process[0][ORE];
    } else {
        for(let c = 0; c < process.length - 1; c++) {
            let name = Object.keys(process[c])[0];
            let removeAmount = process[c][name] * runs;
            if (Object.keys(chemicalStore).indexOf(name) == -1) chemicalStore[name] = 0;
            chemicalStore[name] += removeAmount;
            removeChemical(name, removeAmount, processes, chemicalStore);
        }
        chemicalStore[chemical] -= runs * process.slice(-1)[0][chemical];
    }
}

module.exports = {
    createChemical,
    parseProcesses,
    removeChemical
};
