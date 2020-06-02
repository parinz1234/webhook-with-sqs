class SecondAPI {
  async makeRequest(payload) {
    console.log('Second Partner API');
    console.log(payload);
    return 200;
  }
}

module.exports = SecondAPI;