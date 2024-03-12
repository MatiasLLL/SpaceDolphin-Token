import { ethers } from "hardhat";
// import { SpaceDolphin } from "../typechain-types/contracts/SpaceDolphin";

async function main() {
    // Retrieve the accounts from the wallet. The first account is typically the deployer.
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    // const lockedAmount = ethers.parseEther("0.001");

    // // Getting the contract factory for `OriginalGalloper`.
    // const SpaceDolphinFactory = await ethers.getContractFactory("SpaceDolphin");

    // // Deploy the contract
    // const spaceDolphin = (await SpaceDolphinFactory.deploy()) as SpaceDolphin;

    // // Wait for the deployment to be confirmed
    // await spaceDolphin.waitForDeployment();

    // console.log("SpaceDolphin deployed to:", spaceDolphin.target);
    // const spaceDolphin = await ethers.deployContract("SpaceDolphin", {
    //   value: lockedAmount,
    // });
    const spaceDolphin = await ethers.deployContract("SpaceDolphin");
    await spaceDolphin.waitForDeployment();
    console.log("SpaceDolphin address:", await spaceDolphin.getAddress());

}

// Recommended pattern for async/await and error handling
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




// const Token = await ethers.getContractFactory("Token");
//   const token = await Token.deploy();
//   await token.deployed();







// import { ethers } from "hardhat";
// // import { SpaceDolphin } from "../typechain-types/contracts/SpaceDolphin";

// async function main() {
//     // Retrieve the accounts from the wallet. The first account is typically the deployer.
//     const [deployer] = await ethers.getSigners();
//     console.log("Deploying contracts with the account:", deployer.address);

//     // // Getting the contract factory for `OriginalGalloper`.
//     // const SpaceDolphinFactory = await ethers.getContractFactory("SpaceDolphin");

//     // // Deploy the contract
//     // const spaceDolphin = (await SpaceDolphinFactory.deploy()) as SpaceDolphin;

//     // // Wait for the deployment to be confirmed
//     // await spaceDolphin.waitForDeployment();

//     // console.log("SpaceDolphin deployed to:", spaceDolphin.target);

//     const spaceDolphin = await ethers.deployContract("SpaceDolphin");
//     console.log("SpaceDolphin address:", await spaceDolphin.getAddress());
// }

// // Recommended pattern for async/await and error handling
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
