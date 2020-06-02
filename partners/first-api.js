class FirstAPI {
  async makeRequest(payload) {
    console.log('First Partner API');
    console.log(payload);
    return 200;
  }
}

module.exports = FirstAPI;