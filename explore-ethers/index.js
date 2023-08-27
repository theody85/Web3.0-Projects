import { ethers } from "ethers";
import {
  PRIVATE_KEY_1,
  PRIVATE_KEY_2,
  PRIVATE_KEY_3,
  PRIVATE_KEY_4,
  PRIVATE_KEY_5,
  PRIVATE_KEY_6,
  ganacheProvider,
} from "./config.js";

const { utils, providers, Wallet } = ethers;

const provider = new providers.Web3Provider(ganacheProvider);
const sender = new Wallet(PRIVATE_KEY_1, provider);
const employee1 = new Wallet(PRIVATE_KEY_2, provider);
const employee2 = new Wallet(PRIVATE_KEY_3, provider);
const employee3 = new Wallet(PRIVATE_KEY_4, provider);
const employee4 = new Wallet(PRIVATE_KEY_5, provider);
const employee5 = new Wallet(PRIVATE_KEY_6, provider);

(async () => {
  console.log("Starting Balance................");
  console.log("balance sender: ", utils.formatEther(await sender.getBalance()));
  console.log(
    "balance employee1: ",
    utils.formatEther(await employee1.getBalance()),
  );
  console.log(
    "balance employee2: ",
    utils.formatEther(await employee2.getBalance()),
  );
  console.log(
    "balance employee3: ",
    utils.formatEther(await employee3.getBalance()),
  );
  console.log(
    "balance employee4: ",
    utils.formatEther(await employee4.getBalance()),
  );
  console.log(
    "balance employee5: ",
    utils.formatEther(await employee5.getBalance()),
  );

  //TEST 1
  await payroll(0.3, sender, [
    employee1.address,
    employee2.address,
    employee3.address,
    employee4.address,
    employee5.address,
  ]);

  const recipientAddresses = await findAddresses(sender.address);
  console.log("Test1: ", recipientAddresses);

  console.log(await provider.getBlockWithTransactions(5));

  //TEST2
  // await payroll(0.5, employee1, [
  //   employee2.address,
  //   employee3.address,
  //   employee4.address,
  //   employee5.address,
  // ]);

  // const recipientAddresses2 = await findAddresses(employee1.address);
  // console.log("Test2: ", recipientAddresses);

  // console.log("Addresses......................");
  // console.log("Sender address: ", sender.address);
  // console.log("Employee1 address: ", employee1.address);
  // console.log("Employee2 address: ", employee2.address);
  // console.log("Employee3 address: ", employee3.address);
  // console.log("Employee4 address: ", employee4.address);
  // console.log("Employee5 address: ", employee5.address);

  // console.log("Balances......................");
  // console.log(
  //   "after balance sender: ",
  //   utils.formatEther(await sender.getBalance()),
  // );
  // console.log(
  //   "after balance employee1: ",
  //   utils.formatEther(await employee1.getBalance()),
  // );
  // console.log(
  //   "after balance employee2: ",
  //   utils.formatEther(await employee2.getBalance()),
  // );
  // console.log(
  //   "after balance employee3: ",
  //   utils.formatEther(await employee3.getBalance()),
  // );
  // console.log(
  //   "after balance employee4: ",
  //   utils.formatEther(await employee4.getBalance()),
  // );
  // console.log(
  //   "after balance employee5: ",
  //   utils.formatEther(await employee5.getBalance()),
  // );
})();

// TODO
/*
- send a transaction *
- inspect the transaction *
- send multiple transactions *
- inspect the nonce *
- inspect the wallet balances *

exercise
- send to multiple addresses at once *
- inspect the state of each wallet *
- process all amounts in WEI *

assignment
- find all addresses that have received ether from a specified address
*/

async function payroll(amount, sender, employees) {
  const GAS = 50; // in WEI
  const senderBalance = await sender.getBalance();
  const totalSalary = employees.length * amount;
  const amountInWei = utils.parseUnits(amount.toString(), 18);

  // console.log("amountInWei", amountInWei);
  // parseEther === parseUnit(18);

  if (amount <= 0 || employees.length == 0) return;
  if (senderBalance < totalSalary + GAS)
    return console.log("Not enough funds to make transfer");

  for (let i = 0; i < employees.length; i++) {
    await sender.sendTransaction({
      value: amountInWei,
      to: employees[i],
    });
  }

  // await Promise.allSettled(
  //   employees.forEach(async (employee) => {
  //     await sender.sendTransaction({
  //       value: amountInWei,
  //       to: employee,
  //     });
  //   }),
  // );

  // challenge: fix the nonce error when the promises "resolve" at the same time

  // await Promise.allSettled(
  //   employees.map((employeeAddress) => {
  //     return sender.sendTransaction({
  //       value: amountInWei,
  //       to: employeeAddress,
  //     });
  //   }),
  // );
}

const findAddresses = async (address) => {
  const blockNumber = await provider.getBlockNumber();
  console.log("Block Number: ", blockNumber);
  const recipientAddresses = [];

  for (let i = blockNumber; i >= 0; i--) {
    const { transactions } = await provider.getBlockWithTransactions(i);

    if (transactions.length > 0 && transactions[0].from == address)
      recipientAddresses.push(transactions[0].to);
  }

  return recipientAddresses;
};

// function findAddresses(address) return list of addresses
// provider.getBlockNumber()
// provider.getBlockWithTransactions(integer) returns an array of transactions

// test with at least 5 addresses
