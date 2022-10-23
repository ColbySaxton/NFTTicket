// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error NftCollectible__CollectibleAlreadyMinted();

contract NftCollectible is ERC721 {
    string private s_tokenUri;
    uint256 private s_tokenId;

    event CollectibleMinted(address receiver);

    constructor(string memory tokenUri) ERC721("RangersCollectible", "NYR2") {
        s_tokenUri = tokenUri;
    }

    function mintCollectible(address collectibleReceiver) public payable returns (uint256) {
        if (s_tokenId != 0) {
            revert NftCollectible__CollectibleAlreadyMinted();
        }
        _safeMint(collectibleReceiver, s_tokenId);
        s_tokenId++;
        emit CollectibleMinted(collectibleReceiver);
        return s_tokenId;
    }
}
