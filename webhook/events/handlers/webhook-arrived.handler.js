class WebhookArrivedHandler {

    constructor({ publishWebhookToPartner }) {
        this._publishWebhookToPartner = publishWebhookToPartner;
    }
    handle(event) {
        const { webhookContext, receiptHandle } = event;
        this._publishWebhookToPartner(webhookContext, receiptHandle);
    }
}

module.exports = WebhookArrivedHandler;