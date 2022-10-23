const { assert, expect } = require("chai")
const { ethers, deployments, getNamedAccounts } = require("hardhat")

const PURCHASE_PRICE = ethers.utils.parseEther("0.15")

describe("NftTicket", function () {
    let nftTicket, deployer, mockPriceFeed
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["main"])
        nftTicket = await ethers.getContract("NftTicket")
        mockPriceFeed = await ethers.getContract("MockV3Aggregator")
    })

    describe("constructor", function () {
        it("sets up tokenUri", async () => {
            const tokenUri = await nftTicket.tokenURI("0")
            assert.equal("ipfs://QmSUdbMouZDtKEhZgxusDb589z4RoR9ttFqtuUwseSKDby", tokenUri)
        })
        it("sets up priceFeed", async () => {
            const priceFeed = await nftTicket.getPriceFeed()
            assert.equal(priceFeed, mockPriceFeed.address)
        })
        it("sets up the price", async () => {
            const price = await nftTicket.getPrice()
            assert.equal(price.toString(), ethers.utils.parseEther("150").toString())
        })
        it("sets up the owner", async () => {
            const owner = await nftTicket.getOwner()
            assert.equal(owner, deployer)
        })
    })

    describe("mintTicket", function () {
        it("reverts if it's already been minted", async () => {
            const tx = await nftTicket.mintTicket({ value: PURCHASE_PRICE })
            await tx.wait()
            await expect(nftTicket.mintTicket({ value: PURCHASE_PRICE })).to.be.revertedWith(
                "NftTicket__TicketAlreadyPurchased()"
            )
        })
        it("reverts if not enough eth is sent", async () => {
            await expect(
                nftTicket.mintTicket({ value: ethers.utils.parseEther("0.0745") })
            ).to.be.revertedWith("NftTicket__YouDidntSendEnoughETH()")
        })
        it("sets up the owner of the ticket to be the person who called the function", async () => {
            const tx = await nftTicket.mintTicket({ value: PURCHASE_PRICE })
            await tx.wait()
            const ticketOwner = await nftTicket.getTicketOwner()
            assert.equal(ticketOwner, deployer)
        })
        it("calls safemint and mints token", async () => {
            const tx = await nftTicket.mintTicket({ value: PURCHASE_PRICE })
            await tx.wait()
            const ticketOwner = await nftTicket.ownerOf("0")
            assert.equal(ticketOwner, deployer)
        })
        it("emits TicketMinted event", async () => {
            await expect(nftTicket.mintTicket({ value: PURCHASE_PRICE }))
                .to.emit(nftTicket, "TicketMinted")
                .withArgs(deployer, "1")
        })
        it("does everything with the tokenId", async () => {
            const tx = await nftTicket.mintTicket({ value: PURCHASE_PRICE })
            const txReceipt = await tx.wait()
            const nextTokenId = txReceipt.events[1].args.nextTokenId
            assert.equal(nextTokenId.toString(), "1")
        })
    })

    describe("mintCollectible", function () {
        beforeEach(async () => {
            let tx = await nftTicket.mintTicket({ value: PURCHASE_PRICE })
            await tx.wait()
        })

        it("emits CollectibleMinted event", async () => {
            await expect(nftTicket.mintCollectible("xxx"))
                .to.emit(nftTicket, "CollectibleMinted")
                .withArgs(deployer)
        })
        /*
        it("deploys and mints collectible", async () => {
            const tx = await nftTicket.mintCollectible("xxx")
            await tx.wait()
            const nftCollectible = await ethers.getContract("NftCollectible")
            const owner = await nftCollectible.ownerOf("0")
            assert.equal(owner, deployer)
        })
        */
    })

    describe("withdraw", function () {
        it("Successfull let's the deployer withdraw", async () => {
            const startingBalance = await ethers.provider.getBalance(deployer)
            const tx1 = await nftTicket.mintTicket({ value: PURCHASE_PRICE })
            const txReceipt1 = await tx1.wait()
            let { gasUsed, effectiveGasPrice } = txReceipt1
            const ethSpendOnGasMint = gasUsed.mul(effectiveGasPrice)
            const tx2 = await nftTicket.withdraw()
            const txReceipt2 = await tx2.wait()
            const ethSpendOnGasWithdraw = txReceipt2.gasUsed.mul(txReceipt2.effectiveGasPrice)
            const endingBalance = await ethers.provider.getBalance(deployer)
            assert.equal(
                startingBalance.toString(),
                endingBalance.add(ethSpendOnGasMint).add(ethSpendOnGasWithdraw).toString()
            )
        })
    })
})
