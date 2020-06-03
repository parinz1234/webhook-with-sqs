const { webhookQueue } = require('../../sqs');
const makePublishWebhookToQueue = require('./publish-webhook-to-queue');
const makePublishWebhookToPartner = require('./publish-webhook-to-partner');
const makeGetPartnerWebhookAPI = require('./get-partner-webhook-api');


const getPartnerWebhookAPI = makeGetPartnerWebhookAPI();
const publishWebhookToQueue = makePublishWebhookToQueue({ queue: webhookQueue });
const publishWebhookToPartner = makePublishWebhookToPartner({ queue: webhookQueue, getPartnerWebhookAPI });

module.exports = {
    publishWebhookToQueue,
    publishWebhookToPartner
}