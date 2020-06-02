class SecondAPI {
  async makeRequest(payload) {
    console.log('2nd Partner API');
    console.log(payload);
    return {
      status: 400
    };
  }
}

module.exports = SecondAPI;