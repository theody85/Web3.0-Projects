function Receipient({ sendAmount, setSendAmount, recipient, setRecipient }) {
  const setValue = (setter) => (evt) => setter(evt.target.value);

  return (
    <div className="container transfer">
      <h1>Transaction Details </h1>

      <label for="amount">Amount</label>
      <input
        placeholder="Enter amount to send"
        value={sendAmount}
        onChange={setValue(setSendAmount)}
        type="number"
        id="amount"
      />

      <label for="recipient">Recipient</label>
      <input
        placeholder="Enter recipient address"
        value={recipient}
        onChange={setValue(setRecipient)}
        id="recipient"
        type="text"
      />
    </div>
  );
}

export default Receipient;
