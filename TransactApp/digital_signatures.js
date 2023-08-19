import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';
import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';

// const pk = secp.utils.randomPrivateKey()
// console.log(toHex(pk))

const PRIVATE_KEY =
  '47646223c52957f2ffdf836ee0ed349e9121e318ad050003fafd346dab905c8b';

const hashMsg = (msg) => {
  const msg_bytes = utf8ToBytes(msg);
  const hashed_msg = keccak256(msg_bytes);

  return toHex(hashed_msg);
};

const signMsg = (msg) => {
  const hashed_msg = hashMsg(msg);
  const signed_msg = secp.sign(hashed_msg, PRIVATE_KEY);

  return signed_msg;
};

const getPublicKey = (msg) => {
  const signed_msg = signMsg(msg);
  const hashed_msg = hashMsg(msg);
  const public_key = signed_msg.recoverPublicKey(hashed_msg).toRawBytes();

  return public_key;
};

const isVerified = (msg) =>
  secp.verify(signMsg(msg), hashMsg(msg), toHex(getPublicKey(msg)));

const getAddress = (publicKey) => keccak256(publicKey.slice(1)).slice(-20);

//Test
// const msg = 'I love coding...'

// const hashed_msg = hashMsg(msg)
// console.log("Hashed message: ", hashed_msg)

// const signed_msg = signMsg(msg)
// console.log("Signed message: ", signed_msg)

// const PUBLIC_KEY = getPublicKey(msg);
// console.log("Public key: ", PUBLIC_KEY)

// console.log("Is it valid: ", isVerified(msg))

// const address = getAddress(PUBLIC_KEY)
// console.log("Ethereum address: ", address)

export default signMsg;
