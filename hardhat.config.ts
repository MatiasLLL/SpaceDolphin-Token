import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import '@typechain/hardhat';
import "dotenv/config";

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    networks: {
        test: {
          url: process.env.POLYGON_MUMBAI_INFURA_ENDPOINT,
          accounts: [process.env.PRIVATE_KEY || ""]
        },
        mainnet: {
          url: process.env.POLYGON_MAINNET_INFURA_ENDPOINT,
          accounts: [process.env.PRIVATE_KEY || ""]
        }
    },
    etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      apiKey: process.env.API_KEY_TOKEN
    },
    sourcify: {
      // Disabled by default
      // Doesn't need an API key
      enabled: true
    }
};
export default config;


// sepolia: {
//   url: process.env.INFURA_SEPOLIA_ENDPOINT,
//   accounts: [process.env.PRIVATE_KEY || ""]
// },
// mainnet: {
//   url: process.env.INFURA_MAINNET_ENDPOINT,
//   accounts: [process.env.PRIVATE_KEY || ""]
// }