exports.check30sec = (inputDate) => {
    const currentDate = new Date();
    const thirtySeconds = 30 * 1000; // 30 seconds in milliseconds
    const input = new Date(inputDate);
    const diff = currentDate - input;

    if (diff <= thirtySeconds) {
        console.log("The date is within 30 seconds!");
        return true;
    } else {
        console.log("The date is outside 30 seconds.");
        return false;
    }
};

exports.check1min = (inputDate) => {
    const currentDate = new Date();
    const oneMinute = 1 * 60 * 1000; // 1 minute in milliseconds
    const input = new Date(inputDate);
    const diff = currentDate - input;

    if (diff <= oneMinute) {
        console.log("The date is within 1 minute!");
        return true;
    } else {
        console.log("The date is outside 1 minute.");
        return false;
    }
};

exports.check2min = (inputDate) => {
    const currentDate = new Date();
    const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds
    const input = new Date(inputDate);
    const diff = currentDate - input;

    if (diff <= twoMinutes) {
        console.log("The date is within 2 minutes!");
        return true;
    } else {
        console.log("The date is outside 2 minutes.");
        return false;
    }
};

exports.check1hour = (inputDate) => {
    const currentDate = new Date();
    const oneHour = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
    const input = new Date(inputDate);
    const diff = currentDate - input;

    if (diff <= oneHour) {
        console.log("The date is within 1 hour!");
        return true;
    } else {
        console.log("The date is outside 1 hour.");
        return false;
    }
};

exports.check1day = (inputDate) => {
    const currentDate = new Date();
    const input = new Date(inputDate);

    // Normalize both dates to midnight
    currentDate.setHours(0, 0, 0, 0);
    input.setHours(0, 0, 0, 0);

    // Calculate the difference in days
    const diffDays = Math.floor((currentDate - input) / (24 * 60 * 60 * 1000));

    if (diffDays === 0) {
        console.log("The date is within 1 day (same day)!");
        return true;
    } else {
        console.log("The date is outside 1 day (different day).");
        return false;
    }
};

exports.check2days = (inputDate) => {
    const currentDate = new Date();
    const input = new Date(inputDate);

    currentDate.setHours(0, 0, 0, 0);
    input.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((currentDate - input) / (24 * 60 * 60 * 1000));

    if (diffDays >= 0 && diffDays <= 1) {
        console.log("The date is within 2 days!");
        return true;
    } else {
        console.log("The date is outside 2 days.");
        return false;
    }
};

exports.check1week = (inputDate) => {
    const currentDate = new Date();
    const input = new Date(inputDate);

    currentDate.setHours(0, 0, 0, 0);
    input.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((currentDate - input) / (24 * 60 * 60 * 1000));

    if (diffDays >= 0 && diffDays <= 6) {
        console.log("The date is within 1 week!");
        return true;
    } else {
        console.log("The date is outside 1 week.");
        return false;
    }
};
