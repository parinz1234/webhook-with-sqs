require('dotenv').config()
const express = require('express');
const app = express();
const { webhookQueue } = require('./sqs');
require('./listener').emit('start:pulling:sqs');

app.use(express.json());
app.post('/webhook', async (req, res) => {
  try {
    const message = req.body.message;
    const delaySeconds = 0;
    const response = await webhookQueue.send(message, delaySeconds);
    res.status(200).json(response);
  } catch (e) {
    console.log(err);
    res.status(400).json(err);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`SQS App listening on port ${PORT}!`));
