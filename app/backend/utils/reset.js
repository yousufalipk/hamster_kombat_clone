const {
    check1day,
    check2days,

} = require('./index');


exports.resetBoosters = (user) => {

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

exports.resetDailyRewards = (user) => {
    const lastDateClaimed = user.dailyReward.date;
    const lastDayClaimed = user.dailyReward.claimed[user.dailyReward.claimed.length - 1];

    if (lastDayClaimed === 6) {
        const is1day = check1day(lastDateClaimed);
        if (!is1day) {
            // 1 week passed
            user.dailyReward.claimed = [];
            user.dailyReward.day = 0;
            user.dailyReward.reward = 500;
            user.dailyReward.date = null
            console.log("1 week passed, resetting daily rewards!");
        }
    } else {
        // Daily Streak breaks
        const is2day = check2days(lastDateClaimed);
        if (!is2day) {
            user.dailyReward.claimed = [];
            user.dailyReward.day = 0;
            user.dailyReward.reward = 500;
            user.dailyReward.date = null
            console.log("Streak Breaked Resetting daily rewards!", lastDateClaimed);
        }
    }

    return user;
}

exports.resetComboCards = (user) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    user.comboCards = user.comboCards.filter(card => {
        const cardDate = new Date(card.timestamp);
        cardDate.setHours(0, 0, 0, 0);
        return cardDate.getTime() === today.getTime();
    });

    return user;
};
