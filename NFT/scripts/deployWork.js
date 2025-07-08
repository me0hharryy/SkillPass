const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying WorkHistory with:", await deployer.getAddress());

    const WorkHistory = await hre.ethers.getContractFactory("WorkHistory");
    const contract = await WorkHistory.deploy();
    await contract.waitForDeployment();

    console.log("✅ WorkHistory deployed at:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});