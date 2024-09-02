async function main() {
    const [deployer] = await ethers.getSigners();
    const userRegistryAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
    const UserRegistry = await ethers.getContractFactory("UserRegistry");
    const userRegistry = UserRegistry.attach(userRegistryAddress);

    // register user
    const tx = await userRegistry.connect(deployer).registerUser();
    await tx.wait();
    console.log("User registered");

    // Get user ID
    const userID = await userRegistry.getUserId(deployer.address);
    console.log("User ID:", userId.toString());
}

main().then( async () => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1)
});