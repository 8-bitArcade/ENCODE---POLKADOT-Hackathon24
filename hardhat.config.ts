import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  sourcify: {
    enabled: true,
  },
  networks: {
    alpha: {
      url: "",
      accounts: [
        "",
      ],
    },
  },
  etherscan: {
    apiKey: {
      moonbaseAlpha: "",
    },
  },
};

export default config;
