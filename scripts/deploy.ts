import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    try {
        // Deploy UserRegistry contract
        const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
        const userRegistry = await UserRegistry.deploy();
        console.log("Deployment transaction:", userRegistry.deployTransaction);
        const contract_address = await userRegistry.target;
        console.log("UserRegistry contract deployed to:", contract_address);

        // Deploy Emission contract
        const Emission = await ethers.getContractFactory("Emission");
        const emission = await Emission.deploy(userRegistry.address);
        await emission.deployed(); // Waits for the contract to be deployed
        console.log("Emission contract deployed to:", emission.address);

        // Deploy ProjectRegistry contract
        const ProjectRegistry = await ethers.getContractFactory("ProjectRegistry");
        const projectRegistry = await ProjectRegistry.deploy(userRegistry.address);
        await projectRegistry.deployed(); // Waits for the contract to be deployed
        console.log("ProjectRegistry contract deployed to:", projectRegistry.address);

        // Deploy CarbonCreditRegistry contract
        const CarbonCreditRegistry = await ethers.getContractFactory("CarbonCreditRegistry");
        const carbonCreditRegistry = await CarbonCreditRegistry.deploy(emission.address, projectRegistry.address);
        await carbonCreditRegistry.deployed(); // Waits for the contract to be deployed
        console.log("CarbonCreditRegistry contract deployed to:", carbonCreditRegistry.address);

        // Deploy RewardSystem contract
        const RewardSystem = await ethers.getContractFactory("RewardSystem");
        const rewardSystem = await RewardSystem.deploy(userRegistry.address);
        await rewardSystem.deployed(); // Waits for the contract to be deployed
        console.log("RewardSystem contract deployed to:", rewardSystem.address);
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
