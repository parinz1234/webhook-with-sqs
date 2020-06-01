require('dotenv').config()
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const eventEmitter3 = require('eventemitter3');
const events = new eventEmitter3();


const sqs = new AWS.SQS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const PORT = process.env.PORT;
const QUEUE_URL = process.env.QUEUE_URL;

app.use(express.json());


app.post('/webhook', async (req, res) => {
  try {
    const message = req.body.message;
    const delaySeconds = 0;
    const params = {
      DelaySeconds: delaySeconds, // Become available for processing after the delay period is finished
      MessageBody: JSON.stringify(message),
      QueueUrl: QUEUE_URL
    }
    const response = await sqs.sendMessage(params).promise();
    res.status(200).json(response);
  } catch (e) {
    console.log(err);
    res.status(400).json(err);
  }
});

events.on('start:pulling:sqs', async () => {
  // keep pulling SQS queue
  while (true) {
    const maxNumberOfMessages = 10; // Max number of messages to be read.
    const visibilityTimeout = 30; // If a read message is not dequeued from queue, number of seconds before it make available for other consumer to read.
    const waitTimeSeconds = 5; // Long-pooling conn period, close on new message(s) arrival or timeout.
    const params = {
      MaxNumberOfMessages: maxNumberOfMessages,
      VisibilityTimeout: visibilityTimeout,
      WaitTimeSeconds: waitTimeSeconds,
      QueueUrl: QUEUE_URL
    };
    const response = await sqs.receiveMessage(params).promise();
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

events.emit('start:pulling:sqs');


app.listen(PORT, () => console.log(`SQS App listening on port ${PORT}!`));
