const expireTime = () => {
    let date = new Date();
    // date.setMinutes(date.getMinutes() + 5); // 1440 mins === one day
    date.setMinutes(date.getDate() + 2); // expire in x days
    return date;
};

module.exports = expireTime;
