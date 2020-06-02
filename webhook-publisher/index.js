const publisher = require('./publisher');
const makePartnerWebhookAPIfactory = require('./partner-webhook-api-factory');
const { webhookQueue } = require('../sqs');
const PartnerWebhookAPIfactory = makePartnerWebhookAPIfactory();

const webhookPublisher = new publisher(PartnerWebhookAPIfactory, webhookQueue);

module.exports = webhookPublisher;