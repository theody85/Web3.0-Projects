import server from './server';

function Wallet({ address, setAddress, balance, setBalance }) {
  function onChange(evt) {
    const address = String(evt.target.value).trim();

    setAddress(address);
  }

  async function onClick() {
    try {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } catch (e) {
      console.log(e);
      alert('Record not found');
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <div>
        <label for="address-box">Wallet Address</label>
        <div id="address-box">
          <input
            placeholder="Enter your wallet address"
            value={address}
            onChange={onChange}
            type="text"
          />
          <button className="search" onClick={onClick}>
            <img src="/public/search.svg" />
          </button>
        </div>
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
