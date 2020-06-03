module.exports = class WebhookContextDTO {
  constructor(partnerId, webhookPayload) {
    this.partnerId = partnerId;
    this.webhookPayload = webhookPayload;
  }
};