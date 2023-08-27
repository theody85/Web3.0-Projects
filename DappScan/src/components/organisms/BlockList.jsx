import { useState, useContext, useEffect } from "react";
import { AlchemyContext } from "../../utils";
import CardList from "./CardList";
import Block from "../molecules/Block";
import { blockIcon } from "../../assets";

const BlockList = () => {
  const [blockList, setBlockList] = useState([]);
  const alchemy = useContext(AlchemyContext);

  const getBlockList = async (blockNumber) => {
    const blockList = [];

    for (let i = 0; i < 8; i++) {
      const block = await alchemy.core.getBlock(blockNumber);
      //   console.log(block.transactions);
      blockList.push(block);
      blockNumber--;
    }

    setBlockList(blockList);
  };

  useEffect(() => {
    (async () => {
      let latestBlock = await alchemy.core.getBlockNumber();
      console.log(latestBlock);
      getBlockList(latestBlock);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardList title="Blocks">
      {blockList &&
        blockList.map((block) => {
          const cardProps = {
            icon: blockIcon,
            identifier: block.number,
            timestamp: new Date(block.timestamp * 1000).toLocaleTimeString(),
            amount: 2,
          };

          const miner = block.miner;
          const numberOfTxns = block.transactions.length;

          return (
            <Block
              key={cardProps.identifier}
              feeRecipient={miner}
              numberTxns={numberOfTxns}
              cardProps={cardProps}
            />
          );
        })}
    </CardList>
  );
};

export default BlockList;
