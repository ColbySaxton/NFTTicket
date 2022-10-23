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
    image: "",
}

const imagePath = "./images/collectible/collectible"

const tokenUri = "ipfs://QmSwetcQfvTCbws8F1XLYJPCYziqh3mvMA2wsk56L3GQw9"

module.exports = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()
    const NftTicket = await ethers.getContract("NftTicket", deployer)
    console.log(`Got contract NftTicket at ${NftTicket.address}`)
    price = await NftTicket.getPrice()
    tx = await NftTicket.mintTicket({ value: price + 100 })
    tx.wait()
    if (process.env.UPLOAD_TO_PINATA == "true") {
        const response = await uploadImageToPinata(imagePath)
        let tokenUriMetadata = { ...metadata }
        tokenUriMetadata.image = `ipfs://${response.IpfsHash}`
        const metadataResponse = await uploadMetadataToPinata(tokenUriMetadata)
        tokenUri = `ipfs://${metadataResponse.IpfsHash}`
        console.log(`The TokenURI is ${tokenUri}`)
    }
    console.log("Minting the Collectible!")
    const tx = await NftTicket.mintCollectible(tokenUri)
    tx.wait()
    console.log("Your NFT is Minted!")
    console.log(
        "----------------------------------------------------------------------------------------------------------------------------------------------------"
    )
    if (chainId != 31337) {
        await verify(nftTicket.address, args)
    }
}

module.exports.tags = ["all", "collectible"]
