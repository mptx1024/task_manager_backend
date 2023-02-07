const expireTime = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    return date;
};

module.exports = expireTime;
