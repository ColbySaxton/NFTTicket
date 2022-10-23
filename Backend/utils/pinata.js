const pinataSDK = require("@pinata/sdk")
require("dotenv").config()
const path = require("path")
const fs = require("fs")

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY)

async function uploadImageToPinata(imagePath) {
    console.log("Uploading Ticket to Pinata...")
    const fullImagePath = path.resolve(imagePath)
    const readableStreamForFile = fs.createReadStream(`${fullImagePath}.gif`)
    try {
        const response = await pinata.pinFileToIPFS(readableStreamForFile)
        console.log("Ticket Uploaded to Pinata!")
        console.log(
            "----------------------------------------------------------------------------------------------------------------------------------------------------"
        )
        return response
    } catch (e) {
        console.log(e)
    }

    return null
}

async function uploadMetadataToPinata(metadata) {
    try {
        console.log("Uploading Metadata to Pinata...")
        const metadataResponse = await pinata.pinJSONToIPFS(metadata)
        console.log("Metadata Uploaded to Pinata!")
        console.log(
            "----------------------------------------------------------------------------------------------------------------------------------------------------"
        )
        return metadataResponse
    } catch (e) {
        console.log(e)
    }
    return null
}

module.exports = { uploadImageToPinata, uploadMetadataToPinata }
