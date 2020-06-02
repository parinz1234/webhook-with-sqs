class WebhookPublisher {
  constructor(partnerWebhookAPIFactory, sqs) {
    this._partnerWebhookAPIFactory = partnerWebhookAPIFactory;
    this._sqs = sqs;
  }
  async publish(webhookContext, receiptHandle) {
    try {
      const { partnerId, webhookPayload } = webhookContext;
      console.log(webhookPayload);
      console.log(partnerId);
      console.log(receiptHandle);
      // selecting partner to sending this webhook payload
      // const partnerWebhookAPI = this._partnerWebhookAPIFactory.create(merchantId);
      // const response = await partnerWebhookAPI.makeRequest(webhookPayload);
      // if (response && response.status === 200) {
      //   // delete message from SQS queue after sent webhook success
      //   this._sqs.delete(receiptHandle);
      //   console.log('Publish webhook success');
      // }
      // console.log('Publish webhook success');
    } catch (err) {
      console.log('Publish webhook error');
    }
  }



}


module.exports = WebhookPublisher