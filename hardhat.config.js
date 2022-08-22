require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy')
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')

require('dotenv').config()
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const MNEMONIC = process.env.MNEMONIC

const defaultKey =
  "0000000000000000000000000000000000000000000000000000000000000001";
const defaultRpcUrl = "https://localhost:8545";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetworks: "hardhat",
  networks: {
    hardhat: { },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || defaultRpcUrl,
      accounts: [process.env.PRIVATE_KEY || defaultKey]
    },
    matic: {
      url: process.env.POLYGON_MUMBAI_RPC_URL || defaultRpcUrl,
      accounts: [process.env.PRIVATE_KEY || defaultKey]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  solidity: "0.8.9",
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};
