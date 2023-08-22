import path from 'path';
import { fileURLToPath } from 'url';
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';
import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';

export function getFilename(metaUrl) {
  const __filename = fileURLToPath(metaUrl);

  return __filename;
}

export function getDirname(metaUrl) {
  const __dirname = path.dirname(getFilename(metaUrl));

  return __dirname;
}

const hashMsg = (msg) => {
  const msg_bytes = utf8ToBytes(msg);
  const hashed_msg = keccak256(msg_bytes);

  return toHex(hashed_msg);
};

export const verifyMsg = (msg, signed_msg, pub_key) => {
  return secp.verify(
    {
      r: BigInt(signed_msg.r),
      s: BigInt(signed_msg.s),
    },
    hashMsg(msg),
    pub_key,
    // '03798822617dec2d7aa699e20f7c5a9dd5b98309fabe0096542ec31543a59516d3',
  );
};
