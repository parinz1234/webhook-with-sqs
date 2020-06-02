class FirstAPI {
  async makeRequest(payload) {
    console.log('1st Partner API');
    console.log(payload);
    return {
      status: 200
    };
  }
}

module.exports = FirstAPI;