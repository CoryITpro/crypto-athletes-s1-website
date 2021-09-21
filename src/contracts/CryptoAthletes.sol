// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721Pausable.sol";

contract CryptoAthletes is ERC721Enumerable, Ownable, ERC721Burnable, ERC721Pausable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdTracker;

    uint256 public constant MAX_ELEMENTS = 1 * 10**4 + 20;
    uint256 public constant PRICE = 5 * 10**16;
    uint256 public constant MAX_BY_MINT = 20;
    address public constant ownerAddress = 0x0081aD52FF7Eb8B5165777aa6adCf7d80cBF647D;
    address public constant developerAddress = 0xA7482C9c5926E88d85804A969c383730Ce100639;

    uint256 public maxSalesAmount;

    string public baseTokenURI;

    event CreateCryptoAthletes(uint256 indexed id);

    modifier saleIsOpen {
        require(_totalSupply() <= maxSalesAmount, "SALES: Sale end");

        if (_msgSender() != owner()) {
            require(!paused(), "PAUSABLE: Paused");
        }
        _;
    }

    constructor (string memory baseURI) ERC721("CryptoAthletes", "CATH") {
        setBaseURI(baseURI);
        pause(true);

        maxSalesAmount = MAX_ELEMENTS;
    }

    function _totalSupply() internal view returns (uint) {
        return _tokenIdTracker.current();
    }

    function totalMint() public view returns (uint256) {
        return _totalSupply();
    }

    function mint(address _to, uint256 _count) public payable saleIsOpen {
        uint256 total = _totalSupply();

        require(total + _count <= maxSalesAmount, "MINT: Current count exceeds maximum element count.");
        require(total <= maxSalesAmount, "MINT: Please go to the Opensea to buy Crypto Athletes.");
        require(_count <= MAX_BY_MINT, "MINT: Current count exceeds maximum mint count.");
        require(msg.value >= price(_count), "MINT: Current value is below the sales price of Crypto Athletes");

        for (uint256 i = 0; i < _count; i++) {
            _mintAnElement(_to);
        }
    }

    function startPreSale(uint256 presaleAmount) public onlyOwner {
        require(presaleAmount != 0, "PRESALE: Presale amount can't be zero");

        maxSalesAmount = presaleAmount;
    }

    function stopPreSale() public onlyOwner {
        maxSalesAmount = MAX_ELEMENTS;
    }

    function _mintAnElement(address _to) private {
        uint id = _totalSupply();

        _tokenIdTracker.increment();
        _safeMint(_to, id);

        emit CreateCryptoAthletes(id);
    }

    function price(uint256 _count) public pure returns (uint256) {
        return PRICE.mul(_count);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        baseTokenURI = baseURI;
    }

    function getTokenIdsOfWallet(address _owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function pause(bool value) public onlyOwner {
        if (value == true) {
            _pause();

            return;
        }

        _unpause();
    }

    function withdrawAll() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0);

        _widthdraw(developerAddress, balance.mul(3).div(100));
        _widthdraw(ownerAddress, address(this).balance);
    }

    function _widthdraw(address _address, uint256 _amount) private {
        (bool success, ) = _address.call{value: _amount}("");
        require(success, "WITHDRAW: Transfer failed.");
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}