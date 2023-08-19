import { sha256 } from 'ethereum-cryptography/sha256';
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';

class TXO {
  spent = false;
  amount = 0;
  owner;
  hash;

  constructor(_amount, _owner) {
    this.amount = _amount;
    this.owner = _owner;
    this.hash = this.toHash();
  }

  spend() {
    if (this.spent == false && this.owner) this.spent = true;
  }

  toHash() {
    const toBytes = utf8ToBytes(
      JSON.stringify({
        owner: this.owner,
        amount: this.amount,
      }),
    );
    return toHex(sha256(toBytes));
  }
}

class Transaction {
  inputTXOs;
  inputAmount = 0;
  outputAmount = 0;
  fee = 0.1;
  sender;
  recipient;

  constructor(inputTXOs, _amount, _recipient) {
    this.inputTXOs = inputTXOs;
    this.outputAmount = _amount;
    this.sender = inputTXOs[0].owner;
    this.recipient = _recipient;
  }

  #calculateInputAmount() {
    this.inputTXOs.forEach((input) => {
      const { spent, amount } = input;
      if (!spent) {
        this.inputAmount += amount;
      }
    });
    return this.inputAmount;
  }

  #calculateUTXOs() {
    const utxos = [];
    const change = this.inputAmount - this.outputAmount;
    const outputTXO = new TXO(this.outputAmount, this.recipient);
    const feeTXO = new TXO(this.fee, 'miner-wallet-address');

    if (change > 0) {
      const changeTXO = new TXO(change, this.sender);
      utxos.push(changeTXO);
    }

    utxos.push(outputTXO);
    utxos.push(feeTXO);

    return utxos;
  }

  execute() {
    const inputAmount = this.#calculateInputAmount();
    if (inputAmount == 0) throw new Error('Tokens has already been spent!');

    if (this.inputAmount >= this.outputAmount) {
      this.inputTXOs.forEach((input) => {
        input.spend();
      });

      const utxos = this.#calculateUTXOs();

      this.sender = null;
      this.recipient = null;
      this.inputTXOs = [];
      this.inputAmount = 0;
      this.outputAmount = 0;

      return utxos;
    } else {
      throw new Error('Balance is not enough to complete transaction!');
    }
  }
}

//Test
const sender = 'adjhfakjdh389238283';
const recipient = 'dfkadlkfidadjkj3289';
const tx1 = new TXO(10, sender);
const tx2 = new TXO(10, sender);
const tx3 = new TXO(10, sender);
const tx4 = new TXO(10, sender);
const tx5 = new TXO(10, sender);
const tx6 = new TXO(10, sender);

const inputTXOs = [tx1, tx2, tx3, tx4, tx5, tx6];

const txObject1 = new Transaction(inputTXOs, 40, recipient);

console.log('inputs1', inputTXOs);
console.log('txObject1: ', txObject1.execute());
console.log('***********************************************');

console.log('inputs1', inputTXOs);
console.log('txObject1: ', txObject1.execute());
console.log('***********************************************');

// const tx_1 = new TXO(50, sender)
// const tx_2 = new TXO(30, sender)
// const tx_3 = new TXO(20, sender)

// const inputTXOs2 = [tx_1,tx_2,tx_3]
// console.log("inputs2", inputTXOs2)

// const txObject2 = new Transaction (inputTXOs2, 120, recipient)
// console.log("txObject2: ", txObject2.execute())
