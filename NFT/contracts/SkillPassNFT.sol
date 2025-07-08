// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract SkillPassNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCount;
    uint256 public constant MAX_SUPPLY = 10000;

    constructor() ERC721("SkillPass", "SKILL") Ownable(msg.sender) {}

    function mintSkill(address recipient, string memory _tokenURI) public onlyOwner {
        require(bytes(_tokenURI).length > 0, "Empty URI");
        require(tokenCount < MAX_SUPPLY, "Max supply reached");
        
        unchecked { tokenCount++; }
        _safeMint(recipient, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override(ERC721) returns (address) {
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
}