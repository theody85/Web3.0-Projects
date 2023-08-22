import { ethers } from 'ethers';
import { PRIVATE_KEY, PRIVATE_KEY_2, ganacheProvider } from './config.js';
import Ganache from 'ganache-core';

const { utils, providers, parseEther, BrowserProvider, Wallet } = ethers;

const provider = new BrowserProvider(ganacheProvider);

const wallet = new Wallet(PRIVATE_KEY, provider);

const wall2 = new Wallet(PRIVATE_KEY_2, provider);

// wallet.signTransaction({
//     value: parseEther("1.0"),
//     to: wall2.address,
//     gasLimit: 21000,
// }).then((tx) => {
//     console.log('tx: ', tx);
// })

const server = Ganache.server();
wallet
  .sendTransaction({
    value: parseEther('1.0'),
    to: wall2.address,
    gasLimit: 21000,
  })
  .then((tx) => {
    console.log('tx: ', tx);
  });
// Start the server
server.listen(8545, (err, blockchain) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log('Ganache server listening on port 8545');
    // You can now interact with the blockchain programmatically
    // For example, you can use web3.js or ethers.js to connect and interact
  }
});

// function rpc(method) {
//     return new Promise((resolve, reject) => {
//         ganacheProvider.send({ id: 1, jsonrpc: "2.0", method }, () => {
//             resolve();
//         });
//     });
// }

// const stopMiner = () => rpc('miner_stop');
// const mineBlock = () => rpc('evm_mine');

// const sendEther = async (i) => {
//     const address = Wallet.createRandom().address;
//     await wallet.sendTransaction({
//         value: parseEther(".5"),
//         to: address,
//         nonce: i,
//     });
//     expected.push(address);
// }

// async function findEther(address) {
//     const addresses = [];
//     const blockNumber = await provider.getBlockNumber();
//     for (let i = 0; i <= blockNumber; i++) {
//         const block = await provider.getBlockWithTransactions(i);
//         block.transactions.forEach((tx) => {
//             if(tx.from === address) {
//                 addresses.push(tx.to);
//             }
//         });
//     }
//     return addresses;
// }
