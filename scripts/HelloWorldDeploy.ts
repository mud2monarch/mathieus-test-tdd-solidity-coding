import { ethers } from "hardhat";

async function main () {
    const accounts = await ethers.getSigners();
    const [deployer, acc1, acc2] = accounts;
    console.log(`The address of the deployer is ${deployer.address}`);
    const provider = ethers.provider;
    const lastBlock = await provider.getBlock("latest");
    console.log("The last block in this network is: \n");
    console.log({lastBlock});
    const deployerBalance = await provider.getBalance(deployer.address);
    console.log(`The balance of the deployer is ${ethers.formatEther(deployerBalance)} ETH.`);

    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.waitForDeployment();
    const helloWorldContractAddress = await helloWorldContract.getAddress();
    console.log(`The address of the smart contract is ${helloWorldContractAddress}`);

    const helloWorld = await helloWorldContract.helloWorld();
    console.log(`The text stored in the contracts is ${ethers.decodeBytes32String(helloWorld)}.`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
