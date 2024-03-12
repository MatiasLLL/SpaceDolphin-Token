import { ethers } from "hardhat";
import { expect } from "chai";
import { SpaceDolphin } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("SpaceDolphin", function () {
    let spaceDolphin: SpaceDolphin;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;

    const expectedInitialSupply = BigInt(ethers.parseUnits("299792000", 18).toString()); // Define the expected initial supply

    beforeEach(async function () {
        const SpaceDolphinFactory = await ethers.getContractFactory("SpaceDolphin");
        [owner, addr1] = await ethers.getSigners();
        spaceDolphin = await SpaceDolphinFactory.deploy() as SpaceDolphin;
    });

    describe("Deployment", function () {
        it("Should have the correct name and symbol", async function () {
            expect(await spaceDolphin.name()).to.equal("SpaceDolphin");
            expect(await spaceDolphin.symbol()).to.equal("$DT");
        });

        it("Should assign the initial supply of tokens to the owner", async function () {
            const ownerBalance = BigInt(await spaceDolphin.balanceOf(owner.address).then(bn => bn.toString()));
            expect(ownerBalance).to.equal(expectedInitialSupply);
        });
    });

    describe("Burning", function () {
        it("Should allow users to burn their tokens", async function () {
            const burnAmount = BigInt(ethers.parseUnits("1000000", 18).toString());
            await spaceDolphin.burn(burnAmount);

            const finalBalance = BigInt(await spaceDolphin.balanceOf(owner.address).then(bn => bn.toString()));
            const expectedBalance = expectedInitialSupply - burnAmount; // Directly use the expected initial supply
            expect(finalBalance).to.equal(expectedBalance);
        });

        it("Should fail to burn more tokens than the account holds", async function () {
            const burnAmount = expectedInitialSupply + BigInt(1); // Exceeding the total supply
            await expect(spaceDolphin.connect(owner).burn(burnAmount)).to.be.reverted;
        });
    });

    describe("Transfer Functionality", function () {
        it("Should transfer tokens between accounts", async function () {
            const transferAmount = BigInt(ethers.parseUnits("1000", 18).toString());
            await spaceDolphin.transfer(addr1.address, transferAmount);

            const addr1Balance = BigInt((await spaceDolphin.balanceOf(addr1.address)).toString());
            expect(addr1Balance).to.equal(transferAmount);
        });

        it("Should emit Transfer event when tokens are transferred", async function () {
            const transferAmount = BigInt(ethers.parseUnits("1000", 18).toString());
            await expect(spaceDolphin.transfer(addr1.address, transferAmount))
                .to.emit(spaceDolphin, "Transfer")
                .withArgs(owner.address, addr1.address, transferAmount);
        });
    });

    describe("Approval and Allowance", function () {
        it("Should correctly set allowance", async function () {
        const allowanceAmount = BigInt(ethers.parseUnits("500", 18).toString());
        await spaceDolphin.approve(addr1.address, allowanceAmount);

        const allowance = BigInt((await spaceDolphin.allowance(owner.address, addr1.address)).toString());
        expect(allowance).to.equal(allowanceAmount);
        });

        it("Should transfer tokens using transferFrom", async function () {
        const transferAmount = BigInt(ethers.parseUnits("300", 18).toString());
        await spaceDolphin.approve(addr1.address, transferAmount);
        await spaceDolphin.connect(addr1).transferFrom(owner.address, addr1.address, transferAmount);

        const addr1Balance = BigInt((await spaceDolphin.balanceOf(addr1.address)).toString());
        expect(addr1Balance).to.equal(transferAmount);
        });

        it("Should revert when trying to transfer more than the allowance", async function () {
            const allowanceAmount = BigInt(ethers.parseUnits("500", 18).toString());
            await spaceDolphin.approve(addr1.address, allowanceAmount);
            const transferAmount = allowanceAmount + BigInt(1);
            await expect(spaceDolphin.connect(addr1).transferFrom(owner.address, addr1.address, transferAmount))
                .to.be.reverted;
        });
        
        it("Should reset the allowance when it's set to zero", async function () {
            const allowanceAmount = BigInt(ethers.parseUnits("500", 18).toString());
            await spaceDolphin.approve(addr1.address, allowanceAmount);
            await spaceDolphin.approve(addr1.address, 0);
            const currentAllowance = await spaceDolphin.allowance(owner.address, addr1.address).then(bn => bn.toString());
            expect(BigInt(currentAllowance)).to.equal(0);
        });
        
    });

    // Testing edge cases
    describe("Edge Cases", function () {
        it("Should handle transferring zero tokens", async function () {
            const transferAmount = BigInt(0); // Zero tokens
            await expect(spaceDolphin.transfer(addr1.address, transferAmount))
              .to.emit(spaceDolphin, 'Transfer')
              .withArgs(owner.address, addr1.address, transferAmount);
            
            const addr1Balance = BigInt((await spaceDolphin.balanceOf(addr1.address)).toString());
            expect(addr1Balance).to.equal(transferAmount);
        });

        it("Should handle burning zero tokens", async function () {
            const burnAmount = BigInt(0); // Zero tokens
            await expect(spaceDolphin.burn(burnAmount)).to.not.be.reverted;
            
            const finalBalance = BigInt((await spaceDolphin.balanceOf(owner.address)).toString());
            const expectedBalance = BigInt(ethers.parseUnits("299792000", 18).toString()); // No change expected
            expect(finalBalance).to.equal(expectedBalance);
        });

        it("Should revert when trying to transfer tokens to the zero address", async function () {
            const transferAmount = BigInt(ethers.parseUnits("1000", 18).toString());
            await expect(spaceDolphin.transfer(ethers.ZeroAddress, transferAmount))
                .to.be.reverted;
        });
        
        it("Should not change the balance when burning zero tokens", async function () {
            await spaceDolphin.burn(0);
            const finalBalance = await spaceDolphin.balanceOf(owner.address).then(bn => bn.toString());
            expect(BigInt(finalBalance)).to.equal(expectedInitialSupply);
        });
        
    });

});

