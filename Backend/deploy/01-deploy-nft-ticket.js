const { network, ethers } = require("hardhat")
const verify = require("../utils/verify")
require("dotenv").config()
const { uploadImageToPinata, uploadMetadataToPinata } = require("../utils/pinata")

const metadata = {
    Name: "Tampa Bay Lightning at New York Rangers Ticket",
    Date: "June 1st, 2022",
    Time: "8:00PM",
    Home_Team: "New York Rangers",
    Away_Team: "Tampa Bay Lightning",
    Price: 150,
    Section: "Q",
    Row: 03,
    Seat: "27",
    image: "",
}

const imagePath = "./images/ticket/ticket"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = await deployments
    const chainId = network.config.chainId

    const price = 150
    const tokenUri = "ipfs://QmSUdbMouZDtKEhZgxusDb589z4RoR9ttFqtuUwseSKDby"
    let priceFeed, waitConfirmation

    if (process.env.UPLOAD_TO_PINATA == "true") {
        const response = await uploadImageToPinata(imagePath)
        let tokenUriMetadata = { ...metadata }
        tokenUriMetadata.image = `ipfs://${response.IpfsHash}`
        const metadataResponse = await uploadMetadataToPinata(tokenUriMetadata)
        tokenUri = `ipfs://${metadataResponse.IpfsHash}`
        console.log(`The TokenURI is ${tokenUri}`)
    }

    if (chainId == 31337) {
        const mock = await ethers.getContract("MockV3Aggregator")
        priceFeed = mock.address
        waitConfirmation = 1
    } else {
        priceFeed = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
        waitConfirmation = 6
    }
    const args = [tokenUri, priceFeed, price]
    log("Deploying the NFT Ticket!")
    const nftTicket = await deploy("NftTicket", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitConfirmation,
    })
    log("Contract Deployed!")
    log(
        "----------------------------------------------------------------------------------------------------------------------------------------------------"
    )
    if (chainId != 31337) {
        await verify(nftTicket.address, args)
    }
}

module.exports.tags = ["all", "main", "ticket"]
