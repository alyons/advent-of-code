const ORE = 'ORE';
const FUEL = 'FUEL';

class Process {
    constructor(processString) {
        let regEx = /([0-9]+\s[A-Z]+)/g;
        let chemicalData = [...processString.matchAll(regEx)];
        let lastIndex = chemicalData.length - 1;
        this.input = new Map();
        chemicalData.forEach((chem, i) => {
            let data = chem[0].split(' ');
            if (i == lastIndex) {
                this.output = data[1];
                this.amount = parseInt(data[0]);
            } else {
                this.input.set(data[1], parseInt(data[0]));
            }
        });
    }
}

function createChemical(chemical, desiredAmount, processes, store) {
    if (store.get(chemical) == undefined) store.set(chemical, 0);
    let process = processes.get(chemical);
    let toCreateAmount = desiredAmount - store.get(chemical);
    let runs = Math.ceil(toCreateAmount / parseFloat(process.amount));

    if (process.input.get(ORE) == undefined) {
        for(const [c, a] of process.input) {
            if (store.get(c) == undefined) store.set(c, 0);
            let neededAmount = a * runs;
            if (store.get(c) < neededAmount) createChemical(c, neededAmount, processes, store);
            store.set(c, store.get(c) - neededAmount);
        }
    } else {
        if (store.get(ORE) == undefined) store.set(ORE, 0);
        store.set(ORE, store.get(ORE) + runs * process.input.get(ORE));
    }

    store.set(chemical, store.get(chemical) + runs * process.amount);
}

function parseProcesses(data) {
    let processes = new Map();
    data.split('\n').forEach(p => {
        let process = new Process(p);
        processes.set(process.output, process);
    });

    return processes;
}

function removeChemical(chemical, amount, processes, store) {
    if (store.get(chemical) == undefined) store.set(chemical, 0);
    let process = processes.get(chemical);
    let runs = Math.floor(amount / parseFloat(process.amount));

    if (process.input.get(ORE) == undefined) {
        for(const [c, a] of process.input) {
            if (store.get(c) == undefined) store.set(c, 0);
            let removeAmount = a * runs;
            store.set(c, store.get(c) + removeAmount);
            removeChemical(c, removeAmount, processes, store);
        }
    } else {
        store.set(ORE, store.get(ORE) - runs * process.input.get(ORE));
    }

    store.set(chemical, store.get(chemical) - runs * process.amount);
}

function createFuelWithOreAmount(ore, processes, store) {
    let incValue = 100000;
    let shouldExit = false;
    if (store.get(FUEL) == undefined) store.set(FUEL, 0);

    do {
        while(store.get(ORE) < ore && !shouldExit) {
            createChemical(FUEL, store.get(FUEL) + incValue, processes, store);
        }

        incValue /= 2;
        shouldExit = incValue < 2;

        while(store.get(ORE) > ore && !shouldExit) {
            removeChemical(FUEL, incValue, processes, store);
        }

        incValue /= 2;
        shouldExit = incValue < 2;
    } while (!shouldExit);
}

module.exports = {
    createChemical,
    createFuelWithOreAmount,
    parseProcesses,
    removeChemical
};
