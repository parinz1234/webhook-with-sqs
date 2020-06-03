const eventEmitter3 = require('eventemitter3');
const events = new eventEmitter3();
const { webhookQueue } = require('./sqs');

const { WebhookArrivedEventType, WebhookArrivedEvent } = require('./webhook/events/impl/webhook-arrived.event')
events.on('start:pulling:sqs', async () => {
    // keep pulling SQS queue
    while (true) {
        const maxNumberOfMessages = 10; // Max number of messages to be read.
        const waitTimeSeconds = 5; // Long-pooling conn period, close on new message(s) arrival or timeout.
        const visibilityTimeout = 30; // If a read message is not dequeued from queue, number of seconds before it make available for other consumer to read.
        const messages = await webhookQueue.receive(maxNumberOfMessages, waitTimeSeconds, visibilityTimeout);
        for (let i = 0; i < messages.length; i++) {
            const webhookContext = JSON.parse(messages[i].Body);
            const receiptHandle = messages[i].ReceiptHandle;
            events.emit(WebhookArrivedEventType, new WebhookArrivedEvent({ webhookContext: webhookContext, receiptHandle }));
        }
    }
});

module.exports = events;