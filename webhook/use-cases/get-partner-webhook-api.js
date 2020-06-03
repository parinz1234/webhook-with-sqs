const firstAPI = require('../../partners/first-api');
const secondAPI = require('../../partners/second-api');
module.exports = function makeGetPartnerWebhookAPI() {
    return class getPartnerWebhookAPI {
        static create(partnerId) {
            switch (partnerId) {
                case 1:
                    return new firstAPI();
                case 2:
                    return new secondAPI();
                default:
                    return null;
            }
        }
    }
}