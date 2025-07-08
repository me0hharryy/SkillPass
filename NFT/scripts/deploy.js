const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contract with:", await deployer.getAddress());

    const SkillPass = await hre.ethers.getContractFactory("SkillPassNFT", deployer);
    const contract = await SkillPass.deploy();
    await contract.waitForDeployment();

    console.log("✅ Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});