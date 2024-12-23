exports.getCoinsPerMinute = async (user) => {
    try {
        const currentDate = new Date();
        const lastDateClaimed = user.coinsPerMinute.lastClaimed;

        const differenceInMilliseconds = currentDate - lastDateClaimed;

        const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

        const roundedDifferenceInMinutes = Math.round(differenceInMinutes);

        let balanceToAdd;

        if (roundedDifferenceInMinutes > 60) {
            balanceToAdd = user.coinsPerMinute.value * 60;
        } else if (roundedDifferenceInMinutes === 0) {
            balanceToAdd = 0;
        } else {
            balanceToAdd = user.coinsPerMinute.value * roundedDifferenceInMinutes;
        }

        balanceToAdd;
        return balanceToAdd;
    } catch (error) {
        console.log("Error getting coins per minute!");
    }
}