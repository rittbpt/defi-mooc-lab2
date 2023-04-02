const { expect } = require("chai");
const { network, ethers } = require("hardhat");
const { BigNumber, utils } = require("ethers");
const { writeFile } = require('fs');

describe("Liquidation test for question 3", function () {
  it("TEST Liquidation 8128.956343 USDC", async function (input = "8128956343") {
    console.log("\nLiquidation 8,128.956343 USDC")
    await network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          jsonRpcUrl: process.env.ALCHE_API,
          blockNumber: 11946807,
        }
      }]
    });

    const gasPrice = 0;
    const input_debt_USDC = input;

    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(await hre.network.provider.request({
      method: "eth_getBalance",
      params: [liquidator],
    }));

    const LiquidationOperator = await ethers.getContractFactory("LiquidationOperator3");
    const liquidationOperator = await LiquidationOperator.deploy(overrides = { gasPrice: gasPrice });
    await liquidationOperator.deployed();

    try {
      const liquidationTx = await liquidationOperator.operate(input_debt_USDC, (overrides = { gasPrice: gasPrice }));
      const liquidationReceipt = await liquidationTx.wait();

      const liquidationEvents = liquidationReceipt.logs.filter(
        v => v && v.topics && v.address === '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' && Array.isArray(v.topics) &&
          v.topics.length > 3 && v.topics[0] === '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286')

      const expectedLiquidationEvents = liquidationReceipt.logs.filter(v => v.topics[3] === '0x00000000000000000000000063f6037d3e9d51ad865056bf7792029803b6eefd');

      expect(expectedLiquidationEvents.length, "no expected liquidation").to.be.above(0);
      expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(expectedLiquidationEvents.length);

      const afterLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      }));

      const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
      console.log("Profit", utils.formatEther(profit), "ETH");

      expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    } catch (err) {
      console.log("Transaction Error");
      console.log(err)
    }
  });
  
  it("TEST Liquidation 7000 USDC", async function (input = "7000") {
    console.log("\nLiquidation " + input + " USDC")
    await network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          jsonRpcUrl: process.env.ALCHE_API,
          blockNumber: 11946807,
        }
      }]
    });

    const gasPrice = 0;
    const input_debt_USDC = ethers.utils.parseUnits(input, 6);

    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(await hre.network.provider.request({
      method: "eth_getBalance",
      params: [liquidator],
    }));

    const LiquidationOperator = await ethers.getContractFactory("LiquidationOperator3");
    const liquidationOperator = await LiquidationOperator.deploy(overrides = { gasPrice: gasPrice });
    await liquidationOperator.deployed();

    try {
      const liquidationTx = await liquidationOperator.operate(input_debt_USDC, (overrides = { gasPrice: gasPrice }));
      const liquidationReceipt = await liquidationTx.wait();

      const liquidationEvents = liquidationReceipt.logs.filter(
        v => v && v.topics && v.address === '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' && Array.isArray(v.topics) &&
          v.topics.length > 3 && v.topics[0] === '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286')

      const expectedLiquidationEvents = liquidationReceipt.logs.filter(v => v.topics[3] === '0x00000000000000000000000063f6037d3e9d51ad865056bf7792029803b6eefd');

      expect(expectedLiquidationEvents.length, "no expected liquidation").to.be.above(0);
      expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(expectedLiquidationEvents.length);

      const afterLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      }));

      const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
      console.log("Profit", utils.formatEther(profit), "ETH");

      expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    } catch (err) {
      console.log("Transaction Error");
      console.log(err)
    }
  });

  it("TEST Liquidation 8000 USDC", async function (input = "8050") {
    console.log("\nLiquidation " + input + " USDC")
    await network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          jsonRpcUrl: process.env.ALCHE_API,
          blockNumber: 11946807,
        }
      }]
    });

    const gasPrice = 0;
    const input_debt_USDC = ethers.utils.parseUnits(input, 6);

    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(await hre.network.provider.request({
      method: "eth_getBalance",
      params: [liquidator],
    }));

    const LiquidationOperator = await ethers.getContractFactory("LiquidationOperator3");
    const liquidationOperator = await LiquidationOperator.deploy(overrides = { gasPrice: gasPrice });
    await liquidationOperator.deployed();

    try {
      const liquidationTx = await liquidationOperator.operate(input_debt_USDC, (overrides = { gasPrice: gasPrice }));
      const liquidationReceipt = await liquidationTx.wait();

      const liquidationEvents = liquidationReceipt.logs.filter(
        v => v && v.topics && v.address === '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' && Array.isArray(v.topics) &&
          v.topics.length > 3 && v.topics[0] === '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286')

      const expectedLiquidationEvents = liquidationReceipt.logs.filter(v => v.topics[3] === '0x00000000000000000000000063f6037d3e9d51ad865056bf7792029803b6eefd');

      expect(expectedLiquidationEvents.length, "no expected liquidation").to.be.above(0);
      expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(expectedLiquidationEvents.length);

      const afterLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      }));

      const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
      console.log("Profit", utils.formatEther(profit), "ETH");

      expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    } catch (err) {
      console.log("Transaction Error");
      console.log(err)
    }
  });

  it("TEST Liquidation 9000 USDC", async function (input = "9000") {
    console.log("\nLiquidation " +input+" USDC")
    await network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          jsonRpcUrl: process.env.ALCHE_API,
          blockNumber: 11946807,
        }
      }]
    });

    const gasPrice = 0;
    const input_debt_USDC = ethers.utils.parseUnits(input, 6);

    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(await hre.network.provider.request({
      method: "eth_getBalance",
      params: [liquidator],
    }));

    const LiquidationOperator = await ethers.getContractFactory("LiquidationOperator3");
    const liquidationOperator = await LiquidationOperator.deploy(overrides = { gasPrice: gasPrice });
    await liquidationOperator.deployed();

    try {
      const liquidationTx = await liquidationOperator.operate(input_debt_USDC, (overrides = { gasPrice: gasPrice }));
      const liquidationReceipt = await liquidationTx.wait();

      const liquidationEvents = liquidationReceipt.logs.filter(
        v => v && v.topics && v.address === '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' && Array.isArray(v.topics) &&
          v.topics.length > 3 && v.topics[0] === '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286')

      const expectedLiquidationEvents = liquidationReceipt.logs.filter(v => v.topics[3] === '0x00000000000000000000000063f6037d3e9d51ad865056bf7792029803b6eefd');

      expect(expectedLiquidationEvents.length, "no expected liquidation").to.be.above(0);
      expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(expectedLiquidationEvents.length);

      const afterLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      }));

      const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
      console.log("Profit", utils.formatEther(profit), "ETH");

      expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    } catch (err) {
      console.log("Transaction Error");
      console.log(err)
    }
  });

  it("TEST Liquidation 10000 USDC", async function (input = "10000") {
    console.log("\nLiquidation " + input + " USDC")
    await network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          jsonRpcUrl: process.env.ALCHE_API,
          blockNumber: 11946807,
        }
      }]
    });

    const gasPrice = 0;
    const input_debt_USDC = ethers.utils.parseUnits(input, 6);

    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(await hre.network.provider.request({
      method: "eth_getBalance",
      params: [liquidator],
    }));

    const LiquidationOperator = await ethers.getContractFactory("LiquidationOperator3");
    const liquidationOperator = await LiquidationOperator.deploy(overrides = { gasPrice: gasPrice });
    await liquidationOperator.deployed();

    try {
      const liquidationTx = await liquidationOperator.operate(input_debt_USDC, (overrides = { gasPrice: gasPrice }));
      const liquidationReceipt = await liquidationTx.wait();

      const liquidationEvents = liquidationReceipt.logs.filter(
        v => v && v.topics && v.address === '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' && Array.isArray(v.topics) &&
          v.topics.length > 3 && v.topics[0] === '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286')

      const expectedLiquidationEvents = liquidationReceipt.logs.filter(v => v.topics[3] === '0x00000000000000000000000063f6037d3e9d51ad865056bf7792029803b6eefd');

      expect(expectedLiquidationEvents.length, "no expected liquidation").to.be.above(0);
      expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(expectedLiquidationEvents.length);

      const afterLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      }));

      const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
      console.log("Profit", utils.formatEther(profit), "ETH");

      expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    } catch (err) {
      console.log("Transaction Error");
      console.log(err)
    }
  });

});