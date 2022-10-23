const { run } = require("hardhat")

async function verify(contractAddress, args) {
    try {
        console.log("Verifying Contract!")
        await run("verify:verify", {
            constructorArgs: args,
            address: contractAddress,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
    log(
        "----------------------------------------------------------------------------------------------------------------------------------------------------"
    )
}

module.exports = verify
