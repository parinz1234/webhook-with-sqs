class WebhookArrivedHandler {

  constructor({ webhookPublisher }) {
    this._webhookPublisher = webhookPublisher;
  }
  handle(event) {
    const { webhookContext, receiptHandle } = event;
    this._webhookPublisher.publish(webhookContext, receiptHandle);
  }
}

module.exports = WebhookArrivedHandler;