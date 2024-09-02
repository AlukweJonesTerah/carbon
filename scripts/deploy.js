const hre = require("hardhat");

async function main() {
    const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
    const userRegistry = await UserRegistry.deploy();
    await userRegistry.deployed();
    console.log("UserRegistry deployed to:", userRegistry.address);

    const CarbonCredit = await hre.ethers.getContractFactory("CarbonCredit");
    const carbonCredit = await CarbonCredit.deploy();
    await carbonCredit.deployed();
    console.log("CarbonCredit deployed to:", carbonCredit.address);
}

main().then(async () => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
})