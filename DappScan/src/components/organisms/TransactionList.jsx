import { useState, useContext, useEffect } from "react";
import { AlchemyContext } from "../../utils";
import CardList from "./CardList";
import { receipt } from "../../assets";
import Transaction from "../molecules/Transaction";

const TransactionList = () => {
  const [transactionList, setTransactionList] = useState([]);
  const alchemy = useContext(AlchemyContext);

  const getTransactionList = async (blockNumber) => {
    const transactionList = [];

    for (let i = 0; i < 8; i++) {
      const block = await alchemy.core.getBlock(blockNumber);
      const blockTransactions = block.transactions;
      const latestTransactionHash =
        blockTransactions[blockTransactions.length - 1];
      const latestTransaction = await alchemy.core.getTransactionReceipt(
        latestTransactionHash,
      );
      transactionList.push(latestTransaction);

      blockNumber--;
    }
    // console.log(transactionList);

    setTransactionList(transactionList);
  };

  useEffect(() => {
    (async () => {
      let latestBlock = await alchemy.core.getBlockNumber();
      console.log(latestBlock);
      getTransactionList(latestBlock);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardList title="Transactions">
      {transactionList &&
        transactionList.map((transaction) => {
          const cardProps = {
            icon: receipt,
            identifier: transaction.transactionHash.slice(0, 18) + "...",
            timestamp: transaction.status,
            amount: 2,
          };

          const to = transaction.to;
          const from = transaction.from;

          return (
            <Transaction
              key={cardProps.identifier}
              to={to}
              from={from}
              cardProps={cardProps}
            />
          );
        })}
    </CardList>
  );
};

export default TransactionList;
