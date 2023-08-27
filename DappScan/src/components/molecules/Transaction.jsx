import Card from "./Card";

const Transaction = ({ to, from, cardProps }) => {
  return (
    <Card {...cardProps} amountTitle="Ether">
      <div className="flex flex-col items-start">
        <div>
          To{" "}
          <span title={to} className="text-[#9918b3]">
            {to.slice(0, 16)}...
          </span>
        </div>
        <div>
          From{" "}
          <span title={from} className="text-[#9918b3]">
            {from.slice(0, 15)}...
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Transaction;
