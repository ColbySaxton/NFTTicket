const { ethers, getNamedAccounts } = require("hardhat")
const { uploadImageToPinata, uploadMetadataToPinata } = require("../utils/pinata")
require("dotenv").config()

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

async function main() {
    const { deployer } = await getNamedAccounts()
    const NftTicket = await ethers.getContract("NftTicket", deployer)
    console.log(`Got contract FundMe at ${NftTicket.address}`)
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
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
