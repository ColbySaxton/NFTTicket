// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./NftCollectible.sol";
import "./PriceConverter.sol";
import "hardhat/console.sol";

error NftTicket__TicketAlreadyPurchased();
error NftTicket__YouDidntSendEnoughETH();
error NftTicket__UpkeepNotNeeded();
error NftTicket__TransferFailed();
error NftTicket__OnlyOwner();

contract NftTicket is ERC721 {
    using PriceConverter for uint256;

    // NFT State Variables
    address payable private immutable i_owner;

    string private s_tokenUri;
    uint256 private s_tokenId;
    address private s_ticketOwner;
    uint256 private immutable i_price;
    AggregatorV3Interface private immutable i_priceFeed;

    // Events
    event TicketMinted(address buyer, uint256 nextTokenId);
    event CollectibleMinted(address collecter);

    constructor(
        string memory tokenUri,
        address priceFeed,
        uint256 price
    ) ERC721("RangersTicket", "NYR1") {
        s_tokenUri = tokenUri;
        i_priceFeed = AggregatorV3Interface(priceFeed);
        i_price = price * 10**18;
        i_owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert NftTicket__OnlyOwner();
        }
        _;
    }

    function mintTicket() public payable returns (uint256) {
        if (s_tokenId != 0) {
            revert NftTicket__TicketAlreadyPurchased();
        }
        if (msg.value.getConversionRate(i_priceFeed) < i_price) {
            revert NftTicket__YouDidntSendEnoughETH();
        }
        s_ticketOwner = msg.sender;
        _safeMint(msg.sender, s_tokenId);
        s_tokenId++;
        emit TicketMinted(msg.sender, s_tokenId);
        return s_tokenId;
    }

    function tokenURI(
        uint256 /* tokenId */
    ) public view override returns (string memory) {
        return s_tokenUri;
    }

    function mintCollectible(string calldata tokenUri) public onlyOwner {
        NftCollectible s_NftCollectible = new NftCollectible(tokenUri);
        s_NftCollectible.mintCollectible(s_ticketOwner);
        emit CollectibleMinted(s_ticketOwner);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        if (!success) {
            revert NftTicket__TransferFailed();
        }
    }

    // Getter Functions
    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getTicketOwner() public view returns (address) {
        return s_ticketOwner;
    }

    function getPrice() public view returns (uint256) {
        return i_price;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return i_priceFeed;
    }
}
