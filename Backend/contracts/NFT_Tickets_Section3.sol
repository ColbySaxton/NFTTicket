// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SectionThree is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string public _baseTokenURI;
    uint256 public constant SECTION_THREE_TOTAL_TICKETS = 9000; // 25 sections, 18 rows, 20 seats
    bool public _paused = true;
    uint256 public count;
    AggregatorV3Interface public priceFeed;

    event SectionThreeTicketBought(uint256 indexed count);

    constructor(address _priceFeed) ERC721("SectionThree", "THREE") {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function mint(address _to) public payable {
        uint256 total = totalSupply();
        require(!_paused, "Sale paused");
        require(total + 1 <= SECTION_THREE_TOTAL_TICKETS, "Max limit");
        uint256 minUSD = 2 * 10**18;
        require(getConversionRate(msg.value) >= minUSD, "Value below price");
        _mintAnElement(_to);
    }

    function getConversionRate(uint256 ethAmount)
        public
        view
        returns (uint256)
    {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
        // the actual ETH/USD conversation rate, after adjusting the extra 0s.
        return ethAmountInUsd;
    }

    function getPrice() public view returns (uint256) {
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer * 10000000000);
    }

    function getTicketPrice() public view returns (uint256) {
        uint256 minimumUSD = 2 * 10**18;
        uint256 price = getPrice();
        return ((minimumUSD * 10**18) / price) + 1;
    }

    function _mintAnElement(address _to) private {
        uint256 id = totalSupply();
        count += 1;
        _safeMint(_to, id);
        emit SectionThreeTicketBought(id);
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i; i < tokenCount; ++i) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function pause(bool val) public onlyOwner {
        _paused = val;
    }

    function withdrawAll() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0);
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "tx failed");
    }
}
