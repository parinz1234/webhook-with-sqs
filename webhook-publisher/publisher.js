class WebhookPublisher {
  constructor(partnerWebhookAPIFactory, sqs) {
    this._partnerWebhookAPIFactory = partnerWebhookAPIFactory;
    this._sqs = sqs;
  }
  async publish(webhookContext, receiptHandle) {
    try {
      const { partnerId, webhookPayload } = webhookContext;
      // select partner to sending this webhook payload
      const partnerWebhookAPI = this._partnerWebhookAPIFactory.create(partnerId);
      const response = await partnerWebhookAPI.makeRequest(webhookPayload);
      console.log(response);
      if (response && response.status === 200) {
        // delete message from SQS queue after sent webhook success
        await this._sqs.delete(receiptHandle);
        console.log('Publish webhook success');
        return;
      }
      console.log('Publish webhook is not success');
    } catch (err) {
      console.log(err);
      console.log('Publish webhook error');
    }
  }



}


module.exports = WebhookPublisher