const event = require('../../listener');
const { publishWebhookToPartner } = require('../../use-cases');

const WebhookArrivedHandler = require('./webhook-arrived.handler');
const webhookArrivedHandler = new WebhookArrivedHandler({ publishWebhookToPartner });

const { WebhookArrivedEventType } = require('../impl/webhook-arrived.event');
event.on(WebhookArrivedEventType, event => webhookArrivedHandler.handle(event));