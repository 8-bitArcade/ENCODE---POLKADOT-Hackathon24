import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    alpha: {
      url: "https://moonbase-alpha.public.blastapi.io",
      accounts: ["4f6355f7100992a09a1b29fa99a8917911d24c75c8f0dcfe20869232898d67cc"]
    }
  }
};

export default config;
