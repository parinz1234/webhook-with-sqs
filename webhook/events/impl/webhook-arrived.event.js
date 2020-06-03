class WebhookArrivedEvent {
  constructor({ webhookContext, receiptHandle }) {
    this.webhookContext = webhookContext;
    this.receiptHandle = receiptHandle;
  }
}

module.exports = {
  WebhookArrivedEventType: 'WebhookArrivedEvent',
  WebhookArrivedEvent: WebhookArrivedEvent
}