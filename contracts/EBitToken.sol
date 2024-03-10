// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EightBitToken is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Strings for uint256;
    uint256 private _nextTokenId;

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Mapping to store the link between 8Bit Arcade account and Soulbound token
    mapping(address => uint256) public accountToTokenId;

    // Mapping to store the link between Soulbound token and crypto wallet
    mapping(uint256 => string) public tokenToWallet;

    // Event emitted when a Soulbound token is linked to an 8Bit Arcade account
    event TokenLinked(address indexed account, uint256 indexed tokenId);

    // Event emitted when a Soulbound token is linked to a crypto wallet
    event WalletLinked(uint256 indexed tokenId, string wallet);

    constructor(
        address initialOwner
    ) ERC721("Eight Bit Token", "EBIT") Ownable(initialOwner) {}

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) {
        // revert on call to transferFrom
        revert("EightBitToken: transferFrom denied");
    }

    /**
     * @dev Link an existing Soulbound token to the specified 8Bit Arcade account.
     * @param account The address of the 8Bit Arcade account to link the token to.
     * @param tokenId The ID of the Soulbound token to link.
     */

    function linkToAccount(address account, uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Caller is not the token owner"
        );

        // Link the token to the 8Bit Arcade account
        accountToTokenId[account] = tokenId;

        emit TokenLinked(account, tokenId);
    }

    /**
     * @dev Link an existing Soulbound token to the specified crypto wallet address.
     * @param tokenId The ID of the Soulbound token to link.
     * @param wallet The address of the crypto wallet to link to the token.
     */
    function linkToWallet(uint256 tokenId, string memory wallet) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Caller is not the token owner"
        );

        // Link the token to the crypto wallet
        tokenToWallet[tokenId] = wallet;

        emit WalletLinked(tokenId, wallet);
    }

    function approve(
        address to,
        uint256 tokenId
    ) public override(ERC721, IERC721) {
        revert("EightBitToken: approve denied");
    }

    function setApprovalForAll(
        address operator,
        bool approved
    ) public override(ERC721, IERC721) {
        revert("EightBitToken: setApprovalForAll denied");
    }

    // // The following functions are overrides required by Solidity.
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Get the linked 8Bit Arcade account of the specified Soulbound token.
     * @param tokenId The ID of the Soulbound token.
     * @return The address of the linked 8Bit Arcade account.
     */
    function getLinkedAccount(uint256 tokenId) external view returns (address) {
        return ownerOf(tokenId);
    }

    /**
     * @dev Get the linked crypto wallet of the specified Soulbound token.
     * @param tokenId The ID of the Soulbound token.
     * @return The address of the linked crypto wallet.
     */
    function getLinkedWallet(
        uint256 tokenId
    ) external view returns (string memory) {
        return tokenToWallet[tokenId];
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
