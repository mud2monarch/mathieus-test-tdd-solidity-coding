import { ethers } from "ethers";
import 'dotenv/config';
import { HelloWorld__factory } from "../typechain-types";

async function main () {
    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) throw new Error("Invalid RPC URL.");
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const lastBlock = await provider.getBlock("latest");
    console.log("The last block in this network is: \n");
    console.log({lastBlock});

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey.length != 64) throw new Error("Invalid private key.");
    const deployer = new ethers.Wallet(privateKey, provider);
    console.log(`The address of the deployer is ${deployer.address}`);
    
    const deployerBalance = await provider.getBalance(deployer.address);
    console.log(`The balance of the deployer is ${ethers.formatEther(deployerBalance)} BNB.`);

    const helloWorldFactory = new HelloWorld__factory(deployer);
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
