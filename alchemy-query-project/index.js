import axios from 'axios';

const ALCHEMY_URL =
  'https://eth-goerli.g.alchemy.com/v2/_7DleO5286CDgP56fD_PedDjBTnoHRL8';

// axios
//   .post(ALCHEMY_URL, {
//     jsonrpc: '2.0',
//     method: 'eth_getBalance',
//     params: ['0x27486f33523DFB323ee47e8E4279269Be719Ec6A', 'latest'],
//   })
//   .then((response) => {
//     console.log('BALANCE: ', parseInt(response.data.result, 16));
//   });

axios
  .post(ALCHEMY_URL, {
    jsonrpc: '2.0',
    method: 'eth_getBlockByNumber',
    params: ['latest', false],
  })
  .then((response) => {
    console.log('DATA: ', response.data.result);
  });

axios
  .post(ALCHEMY_URL, {
    jsonrpc: '2.0',
    method: 'eth_feeHistory',
    params: ['0x5', 'latest', []],
  })
  .then((response) => {
    console.log('FEE HISTORY: ', response.data.result);
  });

axios
  .post(ALCHEMY_URL, {
    jsonrpc: '2.0',
    method: 'eth_getCode',
    params: ['0x27486f33523DFB323ee47e8E4279269Be719Ec6A', 'latest'],
  })
  .then((response) => {
    console.log('CODE: ', response.data.result);
  });

axios
  .post(ALCHEMY_URL, {
    jsonrpc: '2.0',
    method: 'eth_estimateGas',
    params: [
      {
        to: '0x27486f33523DFB323ee47e8E4279269Be719Ec6A',
        data: '0xa9059c',
        gasPrice: '0xa994f8',
      },
    ],
  })
  .then((response) => {
    console.log('GAS: ', response.data.result);
  });
