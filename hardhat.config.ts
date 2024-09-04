import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config'; // Import dotenv config

const ALCHEMY_HTTP_URL = process.env.ALCHEMY_HTTP_URL || "https://eth-holesky.g.alchemy.com/v2/4QS3qzsmHflvtZ9RtpI_vtXLiFppg7Cw";
const POLYGON_MAINNET_RPC_URL = process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key";
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""; // Ensure default value is an empty string
const MNEMONIC = process.env.MNEMONIC || "chalk ski palace behave gas minimum put obscure muffin rural cruel crash";

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    holesky: {
      url: ALCHEMY_HTTP_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [], // Use PRIVATE_KEY from environment variables
    },
    // Add other networks as needed
  }
};

export default config;
