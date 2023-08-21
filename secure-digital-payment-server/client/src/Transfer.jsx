import server from './server';
import { getDigitalSignature, findRecord } from './utils';
import { useState } from 'react';

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(event) {
    event.preventDefault();

    if (!findRecord(address)) return alert('Invalid wallet address');
    if (!findRecord(recipient)) return alert('Invalid recipient address');
    if (recipient == address)
      return alert('Transfer to same account is not allowed');
    if (sendAmount <= 0) return alert('Invalid amount provided');

    const msg = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    };

    console.log(msg);

    const { signed_msg, pub_key } = getDigitalSignature(msg);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        msg,
        signed_msg,
        pub_key,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Transaction Details </h1>

      <label htmlFor="amount">Amount</label>
      <input
        placeholder="Enter amount to send"
        value={sendAmount}
        onChange={setValue(setSendAmount)}
        type="number"
        id="amount"
        min={1}
        required
      />

      <label htmlFor="recipient">Recipient</label>
      <input
        placeholder="Enter recipient address"
        value={recipient}
        onChange={setValue(setRecipient)}
        id="recipient"
        type="text"
        required
      />
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
