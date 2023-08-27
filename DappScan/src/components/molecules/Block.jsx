import Card from "./Card";

const Block = ({ feeRecipient, numberTxns, cardProps }) => {
  return (
    <Card {...cardProps} amountTitle="Block Reward">
      <div className="flex flex-col ">
        <div>
          Validated By{" "}
          <span title={feeRecipient} className="text-[#9918b3]">
            {feeRecipient.slice(0, 15)}...
          </span>
        </div>
        <div className="text-[#9918b3]">
          {numberTxns} txns
          {/* <span></span> */}
        </div>
      </div>
    </Card>
  );
};

export default Block;
