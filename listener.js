const eventEmitter3 = require('eventemitter3');
const events = new eventEmitter3();
const { webhookQueue } = require('./sqs');
events.on('start:pulling:sqs', async () => {
  // keep pulling SQS queue
  while (true) {
    const maxNumberOfMessages = 10; // Max number of messages to be read.
    const waitTimeSeconds = 5; // Long-pooling conn period, close on new message(s) arrival or timeout.
    const visibilityTimeout = 30; // If a read message is not dequeued from queue, number of seconds before it make available for other consumer to read.
    const response = await webhookQueue.receive(maxNumberOfMessages, waitTimeSeconds, visibilityTimeout);
    const messages = response.Messages || [];
    for (let i = 0; i < messages.length; i++) {
      const payload = messages[i].Body;
      const receiptHandle = messages[i].ReceiptHandle;
      console.log(`payload`);
      console.log(payload);
      console.log(`receiptHandle`);
      console.log(receiptHandle);
    }
  }
});

module.exports = events;