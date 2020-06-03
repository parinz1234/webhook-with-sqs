class SecondAPI {
    async makeRequest(payload) {
        console.log('2nd Partner API');
        console.log(payload);
        return {
            status: 200
        };
    }
}

module.exports = SecondAPI;