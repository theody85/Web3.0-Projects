import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';
import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';

const hashMsg = (msg) => {
  const msg_bytes = utf8ToBytes(msg);
  const hashed_msg = keccak256(msg_bytes);

  return toHex(hashed_msg);
};

const verifyMsg = (msg, signed_msg, pub_key) => {
  return secp.verify(
    {
      r: BigInt(signed_msg.r),
      s: BigInt(signed_msg.s),
    },
    hashMsg(msg),
    pub_key,
  );
};

export default verifyMsg;
