import { ethers } from "hardhat";

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const [deployer] = await ethers.getSigners();
  console.log("Deploying EightBitToken contract with the deployer:", deployer.address);
  const initialOwner = deployer.address;

  const eightBitToken = await ethers.deployContract("EightBitToken", [initialOwner], {
  });

  await eightBitToken.waitForDeployment();

  console.log( "deployed to:", eightBitToken.target
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});