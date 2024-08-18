// SPDX-License-Identifier: MIT
pragma solidity 0.8.26.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint256 private _tokenIdCounter;
    address public owner;

    event newNFTMinted(uint256 newItemId);

    constructor() ERC721("Nft", "MeT") {
        owner = msg.sender;
        _tokenIdCounter = 0;
    }

    function createToken(string memory _tokenURI) public returns (uint) {
        require(_tokenIdCounter < 10000, "No more NFTs can be minted");
        uint256 newItemId = _tokenIdCounter;
        _tokenIdCounter++;
        string memory tokenURI = _tokenURI;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit newNFTMinted(newItemId)
        return newItemId;
    }
}
