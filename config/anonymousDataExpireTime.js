const expireTime = () => {
    const expireInDays = 2;
    let date = new Date();
    // date.setMinutes(date.getMinutes() + 5); // 1440 mins === one day
    date.setTime(date.getTime() + 86400000 * expireInDays); // expire in x days
    return date;
};

module.exports = expireTime;
