import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    try {
        // Deploy UserRegistry contract
        const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
        const userRegistry = await UserRegistry.deploy();
        // console.log("Deployment transaction:", userRegistry.transactionHash);
        const userRegistryAddress = await userRegistry.target;
        console.log("UserRegistry contract deployed to:", userRegistryAddress);

        // Deploy KYC contract
        const KYC = await hre.ethers.getContractFactory("KYC");
        const kyc = await KYC.deploy(userRegistryAddress); // Deploy the KYC contract
        // console.log("Deployment transaction:", kyc.deployTransaction);
        const kycAddress = await kyc.target;
        console.log("KYC contract deployed to:", kycAddress);

        // Deploy Emission contract
        const Emission = await hre.ethers.getContractFactory("Emission");
        const emission = await Emission.deploy(userRegistryAddress);
        // console.log("Deployment transaction:", emission.deployTransaction);
        const emissionAddress = await emission.target;
        console.log("Emission contract deployed to:", emissionAddress);

        // Deploy ProjectRegistry contract
        const ProjectRegistry = await hre.ethers.getContractFactory("ProjectRegistry");
        const projectRegistry = await ProjectRegistry.deploy(userRegistryAddress);
        const projectRegistryAddress = await projectRegistry.target; 
        console.log("ProjectRegistry contract deployed to:", projectRegistryAddress);

        // Deploy CarbonCreditRegistry contract
        const CarbonCreditRegistry = await hre.ethers.getContractFactory("CarbonCreditRegistry");
        const carbonCreditRegistry = await CarbonCreditRegistry.deploy(emissionAddress, projectRegistryAddress);
        console.log("Deployment transaction:", userRegistry.deployTransaction);
        const carbonCreditRegistryAddress = await carbonCreditRegistry.target 
        console.log("CarbonCreditRegistry contract deployed to:", carbonCreditRegistryAddress);

        // Deploy RewardSystem contract
        const RewardSystem = await hre.ethers.getContractFactory("RewardSystem");
        const rewardSystem = await RewardSystem.deploy(userRegistryAddress);
        console.log("Deployment transaction:", userRegistry.deployTransaction);
        const rewardAdress = await rewardSystem.target
        console.log("RewardSystem contract deployed to:", rewardAdress);
    } catch (error) {
        console.error("Error deploying contracts:", error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
