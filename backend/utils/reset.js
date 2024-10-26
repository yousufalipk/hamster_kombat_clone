const {
    check1day
} = require('./index');


exports.resetBoosters = (user) => {
    console.log("Resetting Boosters for User ID", user._id);

    if (user.unlimitedTaps.lastClaimed !== null) {
        // Reset Unlimited Taps 
        const unlimitedTapsLastClaimed = user.unlimitedTaps.lastClaimed;

        const oneDayPassedUnlimitedTaps = check1day(unlimitedTapsLastClaimed);

        if (!oneDayPassedUnlimitedTaps) {
            user.unlimitedTaps.available = 5;
            user.unlimitedTaps.lastClaimed = null;
        }
    }

    // Energy Refills 
    if (user.energyRefill.lastClaimed !== null) {
        const energyRefillLastClaimed = user.energyRefill.lastClaimed;

        const oneDayPassedEnergyRefill = check1day(energyRefillLastClaimed);

        if (!oneDayPassedEnergyRefill) {
            user.energyRefill.available = 3;
            user.energyRefill.lastClaimed = null;
        }
    }

    return user;
}