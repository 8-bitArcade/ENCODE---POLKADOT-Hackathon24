// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

import { mine } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("EBitTokenMinter contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployTokenFixture() {
    // Get the Signers here.
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call ethers.deployContract and await
    // its waitForDeployment() method, which happens once its transaction has been
    // mined.
    const hardhatToken = await ethers.deployContract("EBitTokenMinter");

    await hardhatToken.waitForDeployment();

    // Fixtures can return anything you consider useful for your tests
    return { hardhatToken, owner, addr1, addr2 };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

      // `expect` receives a value and wraps it in an assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be
      // equal to our Signer's owner.
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    // it should mean to the right address
    it("Should mint the right user", async function () {
        const metaURI = "http://example.com/token/1";
        const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);
        
        const result = await hardhatToken.mint(addr1, metaURI);

        expect(await hardhatToken.ownerOf(1)).to.equal(addr1.address);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);
        expect(await hardhatToken.tokenURI(1)).to.equal(metaURI);
    })

    it("Should fail when the user tries to transfer it to addr2", async function () {
        const metaURI = "http://example.com/token/1";
        const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
        
        const result = await hardhatToken.mint(addr1, metaURI);

        await expect(
            hardhatToken.connect(addr1).transferFrom(addr1.address, addr2.address, 1)
          ).to.be.reverted;
    });
  });
});
