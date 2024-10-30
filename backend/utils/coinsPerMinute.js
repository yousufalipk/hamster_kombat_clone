exports.getCoinsPerMinute = async (user) => {
    try {
        const currentDate = new Date();
        const lastDateClaimed = user.coinsPerMinute.lastClaimed;

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = currentDate - lastDateClaimed;

        // Convert the difference to minutes
        const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

        // Round off the difference
        const roundedDifferenceInMinutes = Math.round(differenceInMinutes);

        console.log("Difference", roundedDifferenceInMinutes);

        let balanceToAdd;

        if (roundedDifferenceInMinutes > 60) {
            // Only provide 30 minutes Bonus
            balanceToAdd = user.coinsPerMinute.value * 30;
        } else if (roundedDifferenceInMinutes === 0) {
            balanceToAdd = 0;
        } else {
            balanceToAdd = user.coinsPerMinute.value * roundedDifferenceInMinutes;
        }

        user.balance += balanceToAdd;

        user.coinsPerMinute.lastClaimed = currentDate;
        return user;
    } catch (error) {
        console.log("Error getting coins per minute!");
    }
}