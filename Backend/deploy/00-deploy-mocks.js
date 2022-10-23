const { network } = require("hardhat")

const DECIMALS = "8"
const INITIAL_PRICE = "200000000000"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = await deployments
    const chainId = await network.config.chainId

    if (chainId == 31337) {
        log("Deploying Mocks!")
        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            waitConfirmations: 1,
            args: [DECIMALS, INITIAL_PRICE],
        })
        log("Mocks Deployed!")
        log(
            "----------------------------------------------------------------------------------------------------------------------------------------------------"
        )
    }
}

module.exports.tags = ["all", "mock", "main"]
