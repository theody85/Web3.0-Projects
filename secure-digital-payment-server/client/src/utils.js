import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';
import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import records from '../../records.json';

const hashMsg = (msg) => {
  const msg_bytes = utf8ToBytes(msg);
  const hashed_msg = keccak256(msg_bytes);

  return toHex(hashed_msg);
};

const signMsg = (hashed_msg, pik) => secp.sign(hashed_msg, pik);

const getPublicKey = (hashed_msg, signed_msg) =>
  signed_msg.recoverPublicKey(hashed_msg).toRawBytes();

const findPrivateKey = (address) => {
  const record = records.find((record) => record.wallet === address);
  if (!record) return null;
  return record.pik;
};

export const getDigitalSignature = (msg) => {
  const senderAddress = msg.sender;
  const PRIVATE_KEY = findPrivateKey(senderAddress);
  const hashed_msg = hashMsg(JSON.stringify(msg));
  const signed_msg = signMsg(hashed_msg, PRIVATE_KEY);
  const pub_key = getPublicKey(hashed_msg, signed_msg);

  return {
    signed_msg: {
      r: signed_msg.r.toString(),
      s: signed_msg.s.toString(),
    },
    pub_key: toHex(pub_key),
  };
};
