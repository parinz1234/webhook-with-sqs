const WebhookContextDTO = require('./dtos/webhook-context.dto');

module.exports = makePublishWebhookToQueue = ({ queue }) => {
    return publishWebhookToQueue = (partnerId, webhookPayload) => {
        const delaySeconds = 0;
        const webhookContextDTO = new WebhookContextDTO(partnerId, webhookPayload);
        return queue.send(webhookContextDTO, delaySeconds);
    }
}