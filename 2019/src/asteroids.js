function printMap(map) {
    let toPrint = '';

    for(let y = 0; y < map.length; y++) {
        for(let x = 0; x < map[y].length; x++) {
            if (isAsteroid(map[y][x])) {
                toPrint += '#';
            } else {
                toPrint += '.'
            }
        }
        toPrint += '\n';
    }

    console.log(toPrint);
}

function printDetectedAsteroids(map, result) {
    let toPrint = '';

    for(let y = 0; y < map.length; y++) {
        for(let x = 0; x < map[y].length; x++) {
            if (isAsteroid(map[y][x])) {
                let i = result.findIndex(a => a.x == x && a.y == y);
                toPrint += (i == -1) ? 'O' : '#';
            } else {
                toPrint += '.'
            }
        }
        toPrint += '\n';
    }

    console.log(toPrint);
}

function generateAsteroidMap(data) {
    let map = [];
    let rows = data.split('\n');
    rows.forEach(r => map.push(r.split('')));
    return map;
}

function isAsteroid(value) {
    return value == '#';
}

function detectAsteriods(map, x, y) {
    let detectedAsteroids = [];

    for(let h = 0; h < map.length; h += 1) {
        for(let w = 0; w < map[h].length; w += 1) {
            if (w == x && h == y) continue;
            if (isAsteroid(map[h][w])) {
                let deltaX = w - x;
                let deltaY = h - y;
                let radians = Math.atan2(deltaY, deltaX);
                let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY,2));
                let asteroid = { x: w, y: h, distance, radians };

                let i = detectedAsteroids.findIndex(a => a.radians == radians);
                if (i > -1) {
                    if (distance < detectedAsteroids[i].distance) {
                        detectedAsteroids.splice(i, 1, asteroid);
                    }
                } else {
                    detectedAsteroids.push(asteroid);
                }
            }
        }
    }

    return detectedAsteroids;
}

function findBestStation(data) {
    let map = generateAsteroidMap(data);
    let station = {
        position: { x: -1, y: -1 },
        asteroids: 0
    };

    printMap(map);

    for(let y = 0; y < map.length; y += 1) {
        for(let x = 0; x < map[y].length; x += 1) {
            if (isAsteroid(map[y][x])) {
                let result = detectAsteriods(map, x, y);
                if (result.length > station.asteroids) {
                    station = { position: { x, y }, asteroids: result.length };
                }
            }
        }
    }

    return station;
}

function vaporizeAsteroids(data, stationX, stationY) {
    let map = generateAsteroidMap(data);
    let radialData = [];
    let order = [];

    for(let y = 0; y < map.length; y += 1) {
        for(let x = 0; x < map[y].length; x += 1) {
            if (isAsteroid(map[y][x])) {
                let deltaX = x - stationX;
                let deltaY = y - stationY;
                let radians = Math.atan2(deltaY, deltaX);
                let degrees = Math.round(radians * 180 / Math.PI);
                if (degrees < 0) degrees += 360;
                let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY,2));
                let asteroid = { x, y, distance, radians, degrees };
                radialData.push(asteroid);
            }
        }
    }

    let degrees = 270;
    let rotationBreak = 0;

    do {
        let targets = radialData.filter(a => a.degrees == degrees);

        let tIndex = -1;
        let tDist = Number.MAX_SAFE_INTEGER;
        for(let t = 0; t < targets.length; t++) {
            if (targets[t].distance < tDist) {
                tIndex = t;
                tDist = targets[t].distance;
            }
        }

        if (tIndex > -1) {
            let toRemoveIndex = radialData.findIndex(a => a.distance == targets[tIndex].distance && a.radians == targets[tIndex].radians);
            if (toRemoveIndex > -1) {
                order.push(radialData[toRemoveIndex]);
                radialData.splice(toRemoveIndex, 1);
                rotationBreak = 0;
            } else {
                console.log(`Unable to remove: ${targets[tIndex]}`)
            }
        }

        // process.stdout.clearLine();
        // process.stdout.cursorTo(0);
        // process.stdout.write(`Asteroids Remaining: ${radialData.length} [${degrees}] {${rotationBreak}}`);

        degrees++;
        if (degrees > 359) degrees = 0;
        rotationBreak++;
    } while(radialData.length > 0 && rotationBreak < 720);

    if (rotationBreak > 359) {
        console.log(radialData);
    }

    return order;
}

module.exports = { findBestStation, vaporizeAsteroids };
