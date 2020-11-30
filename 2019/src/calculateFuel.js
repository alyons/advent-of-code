function calculateFuel(mass) {
    let fuel = Math.max(0, Math.floor(mass/3) - 2);
    if (fuel > 0) fuel += calculateFuel(fuel);
    return fuel;
}

module.exports = calculateFuel;