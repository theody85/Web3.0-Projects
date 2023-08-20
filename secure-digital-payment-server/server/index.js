import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import cors from 'cors';
import { getDirname, verifyMsg } from './utils.js';

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const __dirname = getDirname(import.meta.url);
const filePath = join(__dirname, '..', 'records.json');
const fsLines = readFileSync(filePath, 'utf8');
const records = JSON.parse(fsLines);

const getOwnerRecord = (owner) =>
  records.find((record) => record.wallet === owner) || null;

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const record = getOwnerRecord(address);
  if (!record) return res.status(404).json({ message: 'Record not found' });
  res.json({ balance: record.balance });
});

app.post('/send', (req, res) => {
  const { msg, signed_msg, pub_key } = req.body;

  const senderRecord = getOwnerRecord(msg.sender);
  const recipientRecord = getOwnerRecord(msg.recipient);

  if (!senderRecord) res.status(404).json({ message: 'Sender does not exist' });
  if (!recipientRecord)
    res.status(404).json({ message: 'Recipient does not exist' });
  if (msg.sender === msg.recipient)
    res.status(400).json({ message: 'Transfer to same account' });

  const isVerified = verifyMsg(JSON.stringify(msg), signed_msg, pub_key);

  if (isVerified) {
    performTransaction(res, msg);
  } else {
    res.status(401).json({ message: 'Unauthorized transaction' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function performTransaction(res, { sender, recipient, amount }) {
  const senderRecord = getOwnerRecord(sender);

  const senderBalance = senderRecord.balance;

  if (senderBalance < amount) {
    res.status(400).json({ message: 'Not enough funds!' });
  } else {
    updateRecords(sender, recipient, amount);
    const updatedSenderRecord = getOwnerRecord(sender);
    res.json({ balance: updatedSenderRecord.balance });
    // alert('Transaction successful');
  }
}

function updateRecords(senderAddress, recipientAddress, amount) {
  const senderRecord = getOwnerRecord(senderAddress);
  const recipientRecord = getOwnerRecord(recipientAddress);

  const senderBalance = senderRecord.balance ?? 0;
  const recipientBalance = recipientRecord.balance ?? 0;

  const updatedSenderBalance = senderBalance - amount;
  const updatedRecipientBalance = recipientBalance + amount;

  records.forEach((record) => {
    if (record.wallet === senderAddress) {
      record.balance = updatedSenderBalance;
    }
    if (record.wallet === recipientAddress) {
      record.balance = updatedRecipientBalance;
    }
  });

  // console.log(records);
  writeFileSync(filePath, JSON.stringify(records));
}
