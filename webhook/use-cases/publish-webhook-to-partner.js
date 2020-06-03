module.exports = makePublishWebhookToPartner = ({ queue, getPartnerWebhookAPI }) => {
    return publishWebhookToPartner = async (webhookContext, receiptHandle) => {
        try {
            const { partnerId, webhookPayload } = webhookContext;
            // select partner to sending this webhook payload
            const partnerWebhookAPI = getPartnerWebhookAPI.create(partnerId);
            const response = await partnerWebhookAPI.makeRequest(webhookPayload);
            if (response && response.status === 200) {
                // delete message from SQS queue after sent webhook success
                await queue.delete(receiptHandle);
                console.log('Publish webhook success');
                return;
            }
            console.log('Publish webhook is not success');
        } catch (err) {
            console.log(err);
            console.log('Publish webhook error');
        }
        return;
    }
}