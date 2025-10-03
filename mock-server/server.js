const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const payments = new Map();

app.post('/api/mobile-money/orange/initiate', (req, res) => {
  const { amount, phoneNumber, orderId } = req.body;
  const transactionId = `OM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  payments.set(transactionId, {
    provider: 'ORANGE',
    amount,
    phoneNumber,
    orderId,
    status: 'PENDING',
    transactionId
  });

  res.json({
    success: true,
    transactionId,
    status: 'PENDING',
    message: 'Payment initiated successfully'
  });
});

app.post('/api/mobile-money/mtn/initiate', (req, res) => {
  const { amount, phoneNumber, orderId } = req.body;
  const transactionId = `MTN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  payments.set(transactionId, {
    provider: 'MTN',
    amount,
    phoneNumber,
    orderId,
    status: 'PENDING',
    transactionId
  });

  res.json({
    success: true,
    transactionId,
    status: 'PENDING',
    message: 'Payment initiated successfully'
  });
});

app.post('/api/mobile-money/confirm/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  const payment = payments.get(transactionId);

  if (!payment) {
    return res.status(404).json({ success: false, message: 'Transaction not found' });
  }

  payment.status = 'SUCCESS';
  payments.set(transactionId, payment);

  res.json({
    success: true,
    transactionId,
    status: 'SUCCESS',
    message: 'Payment confirmed successfully'
  });
});

app.post('/api/sms/send', (req, res) => {
  const { phoneNumber, message } = req.body;
  
  console.log(`[SMS MOCK] Sending to ${phoneNumber}: ${message}`);
  
  res.json({
    success: true,
    messageId: `SMS-${Date.now()}`,
    phoneNumber,
    message
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Mock Server' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock server running on http://0.0.0.0:${PORT}`);
});
