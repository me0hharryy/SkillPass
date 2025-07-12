// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract SkillPassNFT is ERC721URIStorage, ERC721Enumerable, Ownable {
    event SkillMinted(address indexed recipient, uint256 indexed tokenId, string tokenURI);

    uint256 public tokenCount;
    uint256 public constant MAX_SUPPLY = 10000;

    constructor() ERC721("SkillPass", "SKILL") Ownable(msg.sender) {}

    function mintSkill(address recipient, string memory _tokenURI) public {
        require(bytes(_tokenURI).length > 0, "Empty URI");
        require(tokenCount < MAX_SUPPLY, "Max supply reached");
        
        unchecked { tokenCount++; }
        _safeMint(recipient, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        emit SkillMinted(recipient, tokenCount, _tokenURI);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override(ERC721, ERC721Enumerable) returns (address) {
        address from = _ownerOf(tokenId);
        
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: Transfers disabled");
        }
        
        return super._update(to, tokenId, auth);
    }

    // Disable approvals (pure functions since they always revert)
    function setApprovalForAll(address, bool) public pure override(ERC721, IERC721) {
        revert("Approvals disabled for soulbound tokens");
    }

    function approve(address, uint256) public pure override(ERC721, IERC721) {
        revert("Approvals disabled for soulbound tokens");
    }

    function burn(uint256 tokenId) public {
        require(
            ownerOf(tokenId) == msg.sender || owner() == msg.sender,
            "Not owner"
        );
        _burn(tokenId);
    }

    // Override _increaseBalance to resolve conflict between ERC721 and ERC721Enumerable
    function _increaseBalance(address account, uint128 value) internal virtual override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    // Optimized getTokensByOwner using ERC721Enumerable
    function getTokensByOwner(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            tokens[i] = tokenOfOwnerByIndex(owner, i);
        }

        return tokens;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Override tokenURI for ERC721URIStorage
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}