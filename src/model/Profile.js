let data = {
    name: 'Igor',
    avatar: 'https://github.com/igorfig.png',
    "monthly-budget": 5000,
    "hours-per-day": 8,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-per-hour": 75,
};

module.exports = {
    get() {
        return data;
    },

    update(newData){
        data = newData;
    }
}