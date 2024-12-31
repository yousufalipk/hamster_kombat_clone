// return true if within the date othwerise false

exports.check30sec = (inputDate) => {
    const currentDate = new Date();
    const thirtySeconds = 30 * 1000;
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
    const oneMinute = 1 * 60 * 1000;
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
    const twoMinutes = 2 * 60 * 1000;
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
    const oneHour = 1 * 60 * 60 * 1000;
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

    const currentUTC = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
    const inputUTC = new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));

    if (currentUTC.getTime() === inputUTC.getTime()) {
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

    const currentUTC = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
    const inputUTC = new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));

    const diffDays = Math.floor((currentUTC - inputUTC) / (24 * 60 * 60 * 1000));

    if (diffDays >= 0 && diffDays <= 2) {
        return true;
    } else {
        return false;
    }
};

exports.check1week = (inputDate) => {
    const currentDate = new Date();
    const input = new Date(inputDate);

    const currentUTC = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
    const inputUTC = new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));

    const diffDays = Math.floor((currentUTC - inputUTC) / (24 * 60 * 60 * 1000));

    if (diffDays >= 0 && diffDays <= 6) {
        return true;
    } else {
        return false;
    }
};
