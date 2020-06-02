const event = require('../../listener');

const webhookPublisher = require('../../webhook-publisher');


const WebhookArrivedHandler = require('./webhook-arrived.handler');
const webhookArrivedHandler = new WebhookArrivedHandler({ webhookPublisher });

const { WebhookArrivedEventType } = require('../impl/webhook-arrived.event');
event.on(WebhookArrivedEventType, event => {
  return webhookArrivedHandler.handle(event);
});