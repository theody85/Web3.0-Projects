import { ethers } from "ethers";
import Ganache from "ganache-core";
const { utils } = ethers;

const INITIAL_BALANCE = utils.parseEther("10.0");

const PRIVATE_KEY_1 =
  "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";

const PRIVATE_KEY_2 =
  "0x4f39d7a86f79964a7129aba81d3c8fdfec6d2e0e33b3d1cc20bbc3c02c1f2b28";

const PRIVATE_KEY_3 =
  "0x5d614964234ebb8b8e33382e3d4d7f75ca1ee4f79e7f8b0f93b2f8118db00b5c";

const PRIVATE_KEY_4 =
  "0xf742bdcbdf31154a0a9d88544d40baaf96f5143016bcdd13a4c054de8817198c";

const PRIVATE_KEY_5 =
  "0x83bf15e98f6f10473a91a50ee1cb78ceac814d773f46d01dbb2076f6f44a0c41";

const PRIVATE_KEY_6 =
  "0xc5ab4681481e4b4b805beea8378e59ebbd241f264c536acd64c0a3b22fa77a76";

const accounts = [].concat([
  {
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_1,
  },
  {
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_2,
  },
  {
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_3,
  },
  {
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_4,
  },
  {
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_5,
  },
  {
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY_6,
  },
]);

const ganacheProvider = Ganache.provider({ accounts });
export {
  INITIAL_BALANCE,
  PRIVATE_KEY_1,
  PRIVATE_KEY_2,
  PRIVATE_KEY_3,
  PRIVATE_KEY_4,
  PRIVATE_KEY_5,
  PRIVATE_KEY_6,
  ganacheProvider,
};
