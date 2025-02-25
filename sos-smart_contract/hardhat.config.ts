import { HardhatUserConfig, task } from "hardhat/config";

import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage"

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
      klaytn: {
        url: process.env.KLAYTN_URL || "",
        gas: "auto",
        accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
