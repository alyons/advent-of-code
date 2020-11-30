const NEWLINE = 10;

const isDoor = (c) => c > 64 && c < 91;
const isKey = (c) => c > 96 && c < 123;
const isOpen = (c) => c == 46;
const isPlayer = (c) => c == 64;
const isWall = (c) => c == 35;
const toMapKey = (p) => `${p[0]},${p[1]}`;

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function parseMaze(data) {
    let tiles = [];

    let x = 0, y = 0;
    for(let i = 0; i < data.length; i++) {
        let code = data.charCodeAt(i);

        if (code == NEWLINE) {
            x = 0;
            y++;
        } else {
            if (!isWall(code)) {
                tiles.push({
                    pos: { x, y },
                    value: data.charAt(i),
                    f: 0,
                    g: 0,
                    h: 0,
                    debug: '',
                    parent: undefined
                });
            }
            x++;
        }
    }

    return tiles;
}

function findNeighbors(tiles, tile) {
    let neighbors = [];
    let x = tile.pos.x;
    let y = tile.pos.y;

    let north = tiles.find(t => t.pos.x == x && t.pos.y == y - 1);
    let south = tiles.find(t => t.pos.x == x && t.pos.y == y + 1);
    let east = tiles.find(t => t.pos.x == x - 1 && t.pos.y == y);
    let west = tiles.find(t => t.pos.x == x + 1 && t.pos.y == y);

    if (north) neighbors.push(north);
    if (south) neighbors.push(south);
    if (east) neighbors.push(east);
    if (west) neighbors.push(west);

    return neighbors;
}

function hueristic(pos0, pos1) {
    return Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y);
}

function aStar(tiles, start, end) {
    resetTiles(tiles);

    let openTiles = [start];
    let closedTiles = [];

    while(openTiles.length > 0) {
        let lowIndex = 0;
        for(let i = 0; i < openTiles.length; i++) if (openTiles[i].f < openTiles[lowIndex].f) lowIndex = i;
        let curTile = openTiles[lowIndex];

        if (curTile.pos == end.pos) {
            let curr = curTile;
            let output = [];
            while (curr.parent) {
                output.push(deepClone(curr));
                curr = curr.parent;
            }
            return output.reverse();
        }

        let removeIndex = openTiles.findIndex(t => t.pos == curTile.pos);
        let neighbors = findNeighbors(tiles, curTile);
        closedTiles.push(curTile);
        openTiles.splice(removeIndex, 1);
        

        for(let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (closedTiles.find(t => t.pos == neighbor.pos)) continue;

            let gScore = curTile.g + 1;
            let gScoreIsBest = false;

            if (!openTiles.find(t => t.pos == neighbor.pos)) {
                gScoreIsBest = true;
                neighbor.h = hueristic(neighbor.pos, end.pos);
                openTiles.push(neighbor);
            } else if (gScore < neighbor.g) {
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {
                neighbor.parent = curTile;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.debug = `F: ${neighbor.f} G: ${neighbor.g} H: ${neighbor.h}`;
            }
        }
    }

    return [];
}

function findAllKeys(tiles) {
    let keys = [];

    tiles.forEach(t => {
        if (isKey(t.value.charCodeAt(0))) {
            keys.push(t.value);
        }
    });

    return keys.sort();
}

function findAllDoors(tiles) {
    let doors = [];

    tiles.forEach(t => {
        if (isDoor(t.value.charCodeAt(0))) {
            doors.push(t.value);
        }
    });

    return doors.sort();
}

function findMissingKeys(keys, doors) {
    let missingKeys = [];
    doors.forEach(d => {
        if (!keys.find(k => k == d.toLowerCase())) missingKeys.push(d.toLowerCase());
    });
    console.log(`Missing Keys: ${missingKeys}`);
    return missingKeys;
}

function resetTiles(tiles) {
    tiles.forEach(t => {
        t.f = 0;
        t.g = 0;
        t.h = 0;
        t.debug = '';
        t.parent = undefined;
    });
}

function navigateMaze(tiles) {
    let keys = findAllKeys(tiles);
    let start = tiles.find(t => isPlayer(t.value.charCodeAt(0)));
    let end = tiles.find(t => t.value == keys[keys.length - 1]);

    let currentPath = aStar(tiles, start, end);
    let noLockedDoors = false;

    do {
        console.log(`Path Length: ${currentPath.length}`);
        let pDoors = findAllDoors(currentPath);
        let pKeys = findAllKeys(currentPath);
        let pMissingKeys = findMissingKeys(pKeys, pDoors);
        noLockedDoors = pMissingKeys.length == 0;
        if (!noLockedDoors) {
            let keyEnd = tiles.find(t => t.value == pMissingKeys[0]);
            let keyPath = aStar(tiles, start, keyEnd);
            let endPath = aStar(tiles, keyPath[0], end);
            keyPath[keyPath.length - 1].parent = endPath[0];
            currentPath = keyPath.concat(endPath);
        }
    } while(!noLockedDoors);

    return currentPath;
}

module.exports = {
    navigateMaze,
    parseMaze
}