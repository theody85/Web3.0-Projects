import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { toHex } from 'ethereum-cryptography/utils';
import { readFile, writeFile } from 'fs';
import { join } from 'path';
import { getDirname } from './utils.js';

function getAddress(publicKey) {
  const newPubKey = publicKey.slice(1);
  const hash = toHex(keccak256(newPubKey));
  return hash.slice(-20);
}

const getNewWallet = () => {
  const pik = secp.utils.randomPrivateKey();
  const addr = getAddress(secp.getPublicKey(pik));

  const record = {
    wallet: addr,
    pik: toHex(pik),
    balance: 200,
  };

  const __dirname = getDirname(import.meta.url);
  const filePath = join(__dirname, '..', 'records.json');

  let records = [];
  readFile(filePath, (err, data) => {
    if (data != '') {
      records = JSON.parse(data);
    }
    records.push(record);
    writeFile(filePath, JSON.stringify(records), (err) => {
      console.log(err);
    });
  });
};

getNewWallet();
