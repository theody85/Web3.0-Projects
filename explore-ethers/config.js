import { ethers } from 'ethers';
import Ganache from 'ganache-core';
const { utils, parseEther } = ethers;

const PRIVATE_KEY =
  '0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d';
const INITIAL_BALANCE = parseEther('10');

const PRIVATE_KEY_2 =
  '0x4f39d7a86f79964a7129aba81d3c8fdfec6d2e0e33b3d1cc20bbc3c02c1f2b28';

// create our test account from the private key, initialize it with 10 ether
const accounts = [].concat([
  {
    balance: INITIAL_BALANCE.toString(16),
    secretKey: PRIVATE_KEY,
  },
  {
    balance: INITIAL_BALANCE.toString(16),
    secretKey: PRIVATE_KEY_2,
  },
]);

const ganacheProvider = Ganache.provider({ accounts });
const server = Ganache.server();
export { INITIAL_BALANCE, PRIVATE_KEY, PRIVATE_KEY_2, ganacheProvider };
