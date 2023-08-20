import server from './server';
import { getDigitalSignature } from './utils';

function Transfer({ address, setBalance, recipient, sendAmount }) {
  async function transfer(evt) {
    evt.preventDefault();

    const msg = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    };

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
    <button type="submit" className="button" onClick={transfer}>
      {' '}
      Transfer
    </button>
  );
}

export default Transfer;
