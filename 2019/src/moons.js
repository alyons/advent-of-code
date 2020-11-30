function updateMoons(moons, steps) {
    for(let s = 0; s < steps; s++) {
        for(let i = 0; i < moons.length; i++) {
            for(let j = i + 1; j < moons.length; j++) {
                moons[i].vel.x += (moons[i].pos.x == moons[j].pos.x) ? 0 : (moons[i].pos.x < moons[j].pos.x) ? 1 : -1; 
                moons[i].vel.y += (moons[i].pos.y == moons[j].pos.y) ? 0 : (moons[i].pos.y < moons[j].pos.y) ? 1 : -1; 
                moons[i].vel.z += (moons[i].pos.z == moons[j].pos.z) ? 0 : (moons[i].pos.z < moons[j].pos.z) ? 1 : -1;
                moons[j].vel.x += (moons[j].pos.x == moons[i].pos.x) ? 0 : (moons[j].pos.x < moons[i].pos.x) ? 1 : -1;
                moons[j].vel.y += (moons[j].pos.y == moons[i].pos.y) ? 0 : (moons[j].pos.y < moons[i].pos.y) ? 1 : -1;
                moons[j].vel.z += (moons[j].pos.z == moons[i].pos.z) ? 0 : (moons[j].pos.z < moons[i].pos.z) ? 1 : -1;
            }

            // Adjust Moons position
            moons[i].pos.x += moons[i].vel.x;
            moons[i].pos.y += moons[i].vel.y;
            moons[i].pos.z += moons[i].vel.z;
        }
    }
}

function calculateEnergy(moons) {
    let energy = 0;

    moons.forEach(moon => {
        let pot = Math.abs(moon.pos.x) + Math.abs(moon.pos.y) + Math.abs(moon.pos.z);
        let kin = Math.abs(moon.vel.x) + Math.abs(moon.vel.y) + Math.abs(moon.vel.z);
        energy += pot * kin;
    });

    return energy
}

function calculatePeriod(values) {
    let velocities = values.map(() => 0);
    let states = [JSON.stringify(Object.assign({}, values, velocities))];

    let steps = 0;
    let shouldExit = false;

    do {
        steps++;
        for(let i = 0; i < values.length; i++) {
            for(let j = i + 1; j < values.length; j++) {
                velocities[i] += (values[i] == values[j]) ? 0 : (values[i] < values[j]) ? 1 : -1;
                velocities[j] += (values[j] == values[i]) ? 0 : (values[j] < values[i]) ? 1 : -1;
            }
            values[i] += velocities[i];
        }

        let output = JSON.stringify(Object.assign({}, values, velocities));
        // let index = states.findIndex(s => s == output);

        // if (index > -1) {
        //     console.log(`Index: ${index}\nSteps: ${steps}`);
        //     shouldExit = true;
        //     // steps -= index;
        // }
        shouldExit = states[0] == output;

        states.push(output);
    } while(!shouldExit);

    // console.log(states);

    return steps;
}

module.exports = {
    calculateEnergy,
    calculatePeriod,
    updateMoons
};
