const { expect } = require("chai");
const { network, ethers } = require("hardhat");
const { BigNumber, utils } = require("ethers");

describe("Liquidation with requirement from question 3", function () {
  let liquidator;

  before(async function () {
    await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: process.env.ALCHE_API,
            blockNumber: 11946807,
          },
        },
      ],
    });

    const accounts = await ethers.getSigners();
    liquidator = accounts[0].address;
  });

  it("should successfully liquidate the target", async function () {
    const gasPrice = 0;
    const debt = 8520;
    const usdtValue = ethers.utils.parseUnits(debt.toString(), 6);

    const beforeLiquidationBalance = BigNumber.from(
      await network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      })
    );

    const liquidationOperator = await ethers.getContractFactory(
      "LiquidationOperator"
    ).deploy({ gasPrice: gasPrice });

    const liquidationTx = await liquidationOperator.operate(
      usdtValue,
      { gasPrice: gasPrice }
    );

    const liquidationReceipt = await liquidationTx.wait();

    const liquidationEvents = liquidationReceipt.logs.filter(
      (log) =>
        log.address === "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9" &&
        log.topics?.[0] ===
          "0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286"
    );

    const expectedLiquidationEvents = liquidationEvents.filter(
      (log) => log.topics[3] === "0x" + liquidator.slice(2)
    );

    expect(
      expectedLiquidationEvents.length,
      "no expected liquidation"
    ).to.be.above(0);

    expect(
      liquidationEvents.length,
      "unexpected liquidation event"
    ).to.be.equal(expectedLiquidationEvents.length);

    const afterLiquidationBalance = BigNumber.from(
      await network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      })
    );

    const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);

    expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;

    console.log(
      `Profit from using ${usdtValue} USDC for the liquidation is`,
      utils.formatEther(profit),
      "ETH"
    );
  });
});
