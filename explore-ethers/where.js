import { PRIVATE_KEY, PRIVATE_KEY_2, ganacheProvider } from "./config.js";
import { utils, Wallet, providers } from "ethers";

import { findAddresses } from "./jovells.js";

const FROM_ADDRESS = "0x5409ED021D9299bf6814279A6A1411A7e866A631";
const provider = new providers.Web3Provider(ganacheProvider);
const wallet = new Wallet(PRIVATE_KEY, provider);

export function rpc(method) {
  return new Promise((resolve, reject) => {
    ganacheProvider.send({ id: 1, jsonrpc: "2.0", method }, () => {
      resolve();
    });
  });
}

export const stopMiner = () => rpc("miner_stop");
export const mineBlock = () => rpc("evm_mine");

const expected = [];

// let address = Wallet.createRandom().address;

const sendEther = async (i) => {
  const address = Wallet.createRandom().address;
  await wallet.sendTransaction({
    value: utils.parseEther(".5"),
    to: address,
    nonce: i,
  });
  expected.push(address);
};

(async () => {
  stopMiner();
  let i = 0;
  // block 1
  for (; i < 3; i++) await sendEther(i);
  await mineBlock();

  // // block 2
  for (; i < 7; i++) await sendEther(i);
  await mineBlock();

  // // block 3
  for (; i < 15; i++) await sendEther(i);
  await mineBlock();

  const blockNumber = await provider.getBlockNumber();
  const transactionsPerBlock = await provider.getBlockWithTransactions(
    blockNumber,
  );

  // console.log("transactions in a block", transactionsPerBlock.transactions.length)

  await findAddresses(expected[0]);
  // console.log("find: ", await findAddresses(expected[0]))
  // console.log('blocknumber: ', blockNumber)
})();
