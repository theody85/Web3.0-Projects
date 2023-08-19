import { sha256 } from 'ethereum-cryptography/sha256';
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';
import signMsg from './digital_signatures.js';

class Transaction {
  constructor(nonce, recipient, sender, value, data) {
    const fields = { nonce, recipient, sender, value, data };

    for (const [field, value] of Object.entries(fields)) {
      if ([null, 'null', '', undefined].includes(value)) {
        throw new Error(
          `Transaction field '${field}' cannot be null, empty or undefined`,
        );
      }

      this.nonce = nonce;
      this.recipient = recipient;
      this.sender = sender;
      this.value = value;
      this.data = data;
      this.signedData = signMsg(String(data));
    }
  }
}

class Block {
  transactions;
  previousHash;

  constructor(transactions) {
    this.transactions = transactions;
  }

  toHash() {
    const toBytes = utf8ToBytes(
      JSON.stringify(this.transactions) + this.previousHash,
    );
    return toHex(sha256(toBytes));
  }
}

class Blockchain {
  chain = [];
  mempool = [];
  MAX_TRANSACTIONS = 10;
  TARGET_DIFFICULTY =
    BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);

  constructor(_txs) {
    this.mempool = _txs;
    this.mine();
  }

  #workHashDifficulty(_block) {
    let hash;
    _block.nonce = 0;

    while (true) {
      // console.log("mining for....", _block.nonce, "times")
      // console.log('hash: ', hash)

      const toBytes = utf8ToBytes(JSON.stringify(_block));
      hash = toHex(sha256(toBytes));

      if (BigInt(`0x${hash}`) < this.TARGET_DIFFICULTY) break;

      _block.nonce++;
    }
  }

  addBlock(_block) {
    this.#workHashDifficulty(_block);
    const chainSize = this.chain.length;

    if (chainSize == 0) {
      this.chain.push(_block);
    } else {
      const lastBlock = this.chain[chainSize - 1];
      _block.previousHash = lastBlock.toHash();
      this.chain.push(_block);
    }
  }

  mine() {
    let txs = [];
    while (txs.length < this.MAX_TRANSACTIONS && this.mempool.length > 0) {
      txs.push(this.mempool.pop());
    }
    this.addBlock(new Block(txs));
  }

  isValid() {
    const blockSize = this.chain.length;
    for (let i = blockSize - 1; i > 0; i--) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (previous.toHash() !== current.previousHash) {
        return false;
      }
    }

    return true;
  }
}

// Test
const mempool = [
  new Transaction(1, 'jonadab kwamlah', 'odame', 100, []),
  new Transaction(3, 'eve sharon', 'mallory gray', 590, []),
  new Transaction(3, 'eve sharon', 'mallory gray', 590, []),
  new Transaction(4, 'charlie pen', 'dave mina', 750, []),
  new Transaction(1, 'jonadab kwamlah', 'odame', 100, []),
  new Transaction(3, 'eve sharon', 'mallory gray', 590, []),
  new Transaction(3, 'eve sharon', 'mallory gray', 590, []),
  new Transaction(4, 'charlie pen', 'dave mina', 750, []),
  new Transaction(1, 'jonadab kwamlah', 'odame', 100, []),
  new Transaction(3, 'eve sharon', 'mallory gray', 590, []),
  new Transaction(3, 'eve sharon', 'mallory gray', 590, []),
  new Transaction(4, 'charlie pen', 'dave mina', 750, []),
];

const newBlockchain = new Blockchain(mempool);
newBlockchain.mine();
// newBlockchain.mine();
// newBlockchain.mine();

console.log(newBlockchain.chain);
console.log(newBlockchain.isValid());
