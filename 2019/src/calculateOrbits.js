function generateGraph(input) {
    let nodeData = input.split('\r\n');
    let nodes = [];

    nodeData.forEach(item => {
        let data = item.split(')');

        let node = { value: data[1], parent: data[0] };

        nodes.push(node);
    });

    return nodes;
}

function countOrbits(graph, value) {
    let count = 0;
    let node = graph.find(e => e.value == value);

    while(node != undefined) {
        count += 1;
        node = graph.find(e => e.value == node.parent);
    }

    return count;
}

function calculateOrbits(input) {
    let count = 0;
    let graph = generateGraph(input);
    graph.forEach(node => { count += countOrbits(graph, node.value); });

    return count;
}

function calculateOrbitChain(graph, value) {
    let chain = [value];

    let node = graph.find(n => n.value == value);

    while(node != undefined) {
        chain.push(node.parent);
        node = graph.find(n => n.value == node.parent);
    }

    return chain;
}

function calculateCommonAncestor(firstChain, secondChain) {
    let value;

    for (let i = 0; i < firstChain.length; i += 1) {
        if (secondChain.includes(firstChain[i])) {
            value = firstChain[i];
            break;
        }
    }

    return value;
}

function calculateOrbitalTransfers(input, sourceValue, destinationValue) {
    let graph = generateGraph(input);
    let sourceChain = calculateOrbitChain(graph, sourceValue);
    let destChain = calculateOrbitChain(graph, destinationValue);
    let commonAncestor = calculateCommonAncestor(sourceChain, destChain);

    let indexA = sourceChain.indexOf(commonAncestor);
    let indexB = destChain.indexOf(commonAncestor);

    return indexA + indexB -2;
}

module.exports = { 
    calculateOrbits,
    calculateOrbitalTransfers
};
