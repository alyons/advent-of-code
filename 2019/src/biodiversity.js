function parseMap(data) {
    let map = '';
    for (var i = 0; i < data.length; i++) {
        if (data.charAt(i) == '#') {
            map += '1';
        } else if (data.charAt(i) == '.') {
            map += '0';
        }
    }
    return map;
}

function countNearbyBugs(map, index) {
    let count = 0;
    let north = index - 5, east = index + 1, south = index + 5, west = index - 1;
    if (index > 4  && north > -1 && north < 25 && map.charAt(north) == '1') count++;
    if (index < 20 && south > -1 && south < 25 && map.charAt(south) == '1') count++;
    if (index % 5 != 4 && east > -1 && east < 25 && map.charAt(east) == '1') count++;
    if (index % 5 != 0 && west > -1 && west < 25 && map.charAt(west) == '1') count++;

    return count;
}

const northWall = (i) => i < 5;
const southWall = (i) => i > 19;
const eastWall = (i) => i % 5 == 4;
const westWall = (i) => i % 5 == 0;
const northCenter = (i) => i == 7;
const southCenter = (i) => i == 17;
const eastCenter = (i) => i == 13;
const westCenter = (i) => i == 11;
const center = (i) => i == 12;

function countNearbyLayeredBugs(maps, mapIndex, tileIndex) {
    if (center(tileIndex)) {
        return 0;
    }

    let map = maps.get(mapIndex);
    let innerMap = maps.get(mapIndex + 1);
    let outerMap = maps.get(mapIndex - 1);
    let count = countNearbyBugs(map, tileIndex);

    if (outerMap != undefined) {
        if (northWall(tileIndex) && outerMap.charAt(7) == '1') {
            count++;
        }

        if (southWall(tileIndex) && outerMap.charAt(17) == '1') {
            count++;
        }

        if (eastWall(tileIndex) && outerMap.charAt(13) == '1') {
            count++;
        }

        if (westWall(tileIndex) && outerMap.charAt(11) == '1') {
            count++;
        }
    }

    if (innerMap != undefined) {
        if (northCenter(tileIndex)) {
            for(let i = 0; i < 5; i++) if (innerMap.charAt(i) == '1') count++;
        }

        if (southCenter(tileIndex)) {
            for(let i = 20; i < 25; i++) if (innerMap.charAt(i) == '1') count++;
        }

        if (eastCenter(tileIndex)) {
            for(let i = 4; i < 25; i += 5) if (innerMap.charAt(i) == '1') count++;
        }

        if (westCenter(tileIndex)) {
            for(let i = 0; i < 25; i += 5) if (innerMap.charAt(i) == '1') count++;
        }
    }

    return count;
}

function updateMap(map) {
    let result = '';

    for(let i = 0; i < 25; i++) {
        let neighbors = countNearbyBugs(map, i);
        if (map.charAt(i) == '1') {
            result += (neighbors == 1) ? '1' : '0';
        } else {
            result += (neighbors == 1 || neighbors == 2) ? '1' : '0';
        }
    }

    return result;
}

function bugsOnMap(map) {
    let count = 0;
    for(let i = 0; i < map.length; i++) if (map.charAt(i) == '1') count++;
    return count;
}

function updateLayeredMap(maps) {
    let minKey = Number.MAX_SAFE_INTEGER;
    let maxKey = Number.MIN_SAFE_INTEGER;

    maps.forEach((v, k) => {
        if (k < minKey) minKey = k;
        if (k > maxKey) maxKey = k;
    });

    if (bugsOnMap(maps.get(minKey)) != 0) {
        maps.set(minKey - 1, '00000000000000000000');
    }

    if (bugsOnMap(maps.get(maxKey)) != 0) {
        maps.set(maxKey + 1, '00000000000000000000');
    }

    let newMaps = new Map();

    maps.forEach((v, k) => {
        let result = '';
        for(let i = 0; i < 25; i++) {
            let neighbors = countNearbyLayeredBugs(maps, k, i);
            if (v.charAt(i) == '1') {
                result += (neighbors == 1) ? '1' : '0';
            } else {
                result += (neighbors == 1 || neighbors == 2) ? '1' : '0';
            }
        }
        newMaps.set(k, result);
    });

    return newMaps;
}

function calculateBiodiversity(map) {
    let value = map.split('').reverse().join('');
    return parseInt(value, 2);
}

function countAllBugs(maps) {
    let bugs = 0;

    maps.forEach(v => {
        bugs += bugsOnMap(v);
    });

    return bugs;
}

module.exports = {
    calculateBiodiversity,
    countAllBugs,
    parseMap,
    updateLayeredMap,
    updateMap
};
