const AWS = require('aws-sdk');
class SQSWebhookQueue {
  constructor() {
    this._url = process.env.QUEUE_URL;
    this._sqs = new AWS.SQS({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
  }

  /**
   * 
   * @param {number} maxNumberOfMessages Max number of messages to be read.
   * @param {number} waitTimeSeconds long-pooling conn period, close on new message(s) arrival or timeout. 
   * @param {number} visibilityTimeout if a read message is not dequeued from queue, number of seconds before it make available for other consumer to read. 
   */
  async receive(maxNumberOfMessages = 10, waitTimeSeconds = 20, visibilityTimeout = 60) {
    try {
      const params = {
        MaxNumberOfMessages: maxNumberOfMessages,
        WaitTimeSeconds: waitTimeSeconds,
        VisibilityTimeout: visibilityTimeout,
        QueueUrl: this._url
      };
      const data = await this._sqs.receiveMessage(params).promise();
      const messages = data.Messages || [];
      return messages;
    } catch (err) {
      console.log(err);
    }
    return false;
  }


  /**
   * 
   * @param {string} message Message to be queued.
   * @param {number} delaySeconds waiting period before message is available for consumer(s) to read. 
   */
  async send(message, delaySeconds = 5) {
    try {
      const params = {
        DelaySeconds: delaySeconds,
        MessageBody: JSON.stringify(message),
        QueueUrl: this._url
      }
      const response = await this._sqs.sendMessage(params).promise();
      return response
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  /**
   * 
   * @param {string} receiptHandle Message receipt ID for dequeue.
   */
  async delete(receiptHandle) {
    try {
      const params = {
        ReceiptHandle: receiptHandle,
        QueueUrl: this._url
      };
      const response = await this._sqs.deleteMessage(params).promise();
      return response;
    } catch (err) {
      console.log(err);
    }
    return false;
  }

};

class QueueFactory {
  static createSQSWebhookQueue() {
    return new SQSWebhookQueue();
  }
}


module.exports.QueueFactory = QueueFactory;
module.exports.webhookQueue = QueueFactory.createSQSWebhookQueue();