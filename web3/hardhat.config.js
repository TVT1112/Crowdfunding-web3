
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:'goerli',
  networks: {
    hardhat:{
    },
    goerli:{
      url:'https://rpc.ankr.com/eth_goerli',
      accounts:[process.env.PRIVATE_KEY.toString()]
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
