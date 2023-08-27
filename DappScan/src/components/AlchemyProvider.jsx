import { Alchemy, Network } from "alchemy-sdk";
import { AlchemyContext } from "../utils";

const AlchemyContextProvider = ({ children }) => {
  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  return (
    <AlchemyContext.Provider value={alchemy}>
      {children}
    </AlchemyContext.Provider>
  );
};

export default AlchemyContextProvider;
