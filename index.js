require('dotenv').config()
const express = require('express');
const app = express();
const { webhookQueue } = require('./sqs');
require('./listener').emit('start:pulling:sqs'); // emit event to start sqs receive listner
require('./webhook'); // require to listener webhook arrive event
app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    const WebhookContextDTO = require('./webhook/dtos/webhook-context.dto');
    const webhookPayload = req.body.webhook_payload;
    const partnerId = req.body.partner_id;
    const delaySeconds = 0;
    const webhookContextDTO = new WebhookContextDTO(partnerId, webhookPayload);
    const response = await webhookQueue.send(webhookContextDTO, delaySeconds);
    res.status(200).json({});
  } catch (e) {
    console.log(err);
    res.status(400).json(err);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`SQS App listening on port ${PORT}!`));
