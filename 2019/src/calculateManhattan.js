function parseWires(wireString) {
    let plots = [{ x: 0, y: 0}];
    let commands = wireString.split(',');

    commands.forEach(command => {
        let nextPlot = Object.assign({}, plots[plots.length - 1]);
        let dir = command.slice(0, 1);
        let length = Number.parseInt(command.slice(1));
        switch(dir) {
            case 'L':
                nextPlot.x -= length;
                break;
            case 'R':
                nextPlot.x += length;
                break;
            case 'U':
                nextPlot.y += length;
                break;
            case 'D':
                nextPlot.y -= length;
                break
        }
        plots.push(nextPlot);
    });

    return plots;
}

function isHorizontal(line) {
    return line.start.y == line.end.y;
}

function isVertical(line) {
    return line.start.x == line.end.x;
}

function lineLength(line) {
    return Math.abs(line.end.x - line.start.x) + Math.abs(line.end.y - line.start.y);
}

function pointOnLine(point, line) {
    return (
        point.x == line.start.x ||
        point.x == line.end.x ||
        point.y == line.start.y ||
        point.y == line.end.y
    );
}

function calculatePathLength(point, plots) {
    let lines = [];
    for(let i = 0; i < plots.length - 1; i += 1) {
        let line = {
            start: plots[i],
            end: plots[i + 1]
        };
        lines.push(line);
    }
    let distance = 0;
    for(let j = 0; j < lines.length; j += 1) {
        if (pointOnLine(point, lines[j])) {
            let subLine = {
                start: lines[j].start,
                end: point
            };
            distance += lineLength(subLine);
            break;
        } else {
            distance += lineLength(lines[j]);
        }
    }
    return distance;
} 

function intersections(firstLine, secondLine) {
    if (isHorizontal(firstLine) && isHorizontal(secondLine) && (firstLine.start.y == secondLine.start.y)) {
        let xStart = Math.max(Math.min(firstLine.start.x, firstLine.end.x), Math.min(secondLine.start.x, secondLine.end.x));
        let xEnd = Math.min(Math.max(firstLine.start.x, firstLine.end.x), Math.max(secondLine.start.x, secondLine.end.x));
        let plots = [];
        for(let x = xStart; x <= xEnd; x += 1) {
            plots.push({
                x, y: firstLine.start.y
            });
        }
        return plots;
    }

    if (isVertical(firstLine) && isVertical(secondLine) && (firstLine.start.x == secondLine.start.x)) {
        let yStart = Math.max(Math.min(firstLine.start.y, firstLine.end.y), Math.min(secondLine.start.y, secondLine.end.y));
        let yEnd = Math.min(Math.max(firstLine.start.y, firstLine.end.y), Math.max(secondLine.start.y, secondLine.end.y));
        let plots = [];
        for(let y = yStart; y <= yEnd; y += 1) {
            plots.push({
                x: firstLine.start.x, y
            });
        }
        return plots;
    }

    if (isVertical(firstLine) && isHorizontal(secondLine)) {
        if (firstLine.start.x >= Math.min(secondLine.start.x, secondLine.end.x) &&
            firstLine.start.x <= Math.max(secondLine.start.x, secondLine.end.x) && 
            secondLine.start.y >= Math.min(firstLine.start.y, firstLine.end.y) &&
            secondLine.start.y <= Math.max(firstLine.start.y, firstLine.end.y)) {
            return [{
                x: firstLine.start.x,
                y: secondLine.start.y
            }];
        }
    }

    if (isHorizontal(firstLine) && isVertical(secondLine)) {
        if (firstLine.start.y >= Math.min(secondLine.start.y, secondLine.end.y) &&
            firstLine.start.y <= Math.max(secondLine.start.y, secondLine.end.y) && 
            secondLine.start.x >= Math.min(firstLine.start.x, firstLine.end.x) &&
            secondLine.start.x <= Math.max(firstLine.start.x, firstLine.end.x)) {
            return [{
                x: secondLine.start.x,
                y: firstLine.start.y
            }];
        }
    }

    return [];
}

function calculateManhattan(firstWire, secondWire) {
    let firstPlots = parseWires(firstWire);
    let secondPlots = parseWires(secondWire);

    let distance = Number.MAX_SAFE_INTEGER;

    for(let i = 0; i < firstPlots.length - 1; i += 1) {
        let firstLine = {
            start: firstPlots[i],
            end: firstPlots[i + 1]
        };
        for(let j = 0; j < secondPlots.length - 1; j += 1) {
            let secondLine = {
                start: secondPlots[j],
                end: secondPlots[j + 1]
            };

            let points = intersections(firstLine, secondLine);
            points.forEach(point => {
                let sum = Math.abs(point.x) + Math.abs(point.y);
                if (sum != 0) {
                    let currentDistance = calculatePathLength(point, firstPlots) + calculatePathLength(point, secondPlots);
                    if (currentDistance < distance) distance = currentDistance;
                }
            });

        }
    }

    return distance;
}

module.exports = calculateManhattan;
