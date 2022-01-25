pragma solidity ^0.5.6;

import "./klaytn-contracts/token/KIP17/KIP17Full.sol";
import "./klaytn-contracts/token/KIP17/KIP17Mintable.sol";
import "./klaytn-contracts/token/KIP17/KIP17Pausable.sol";
import "./klaytn-contracts/ownership/Ownable.sol";
import "./libraries/EncodeLibrary.sol";

contract BuggerMates is Ownable, KIP17Full("Bugger Mates", "BRGRMATES"), KIP17Mintable, KIP17Pausable {

    string public basename = "BRGR Mate #";
    function setBasename(string calldata _basename) onlyOwner external {
        basename = _basename;
    }

    string public description = "햄버거를 씌운 메이트";
    function setDescription(string calldata _description) onlyOwner external {
        description = _description;
    }

    mapping(uint256 => string) public images;
    function setImage(uint256 tokenId, string calldata dataURL) onlyOwner external {
        images[tokenId] = dataURL;
    }

    mapping(uint256 => string) public attributes;
    function setAttributes(uint256 tokenId, string calldata _attributes) onlyOwner external {
        attributes[tokenId] = _attributes;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "KIP17Metadata: URI query for nonexistent token");
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                EncodeLibrary.encode(
                    bytes(
                        string(
                            abi.encodePacked(
                                '{"name": "', 
                                basename,
                                EncodeLibrary.toString(tokenId),
                                '", "description": "',
                                description,
                                '", "image": "',
                                bytes(images[tokenId]),
                                '","attributes":',
                                attributes[tokenId],
                                "}"
                            )
                        )
                    )
                )
            )
        );
    }

    function mint(uint256 tokenId, string calldata dataURL) external onlyMinter {
        mint(msg.sender, tokenId);
        images[tokenId] = dataURL;
    }

    function bulkTransfer(address[] calldata tos, uint256[] calldata ids) external {
        uint256 length = ids.length;
        for (uint256 i = 0; i < length; i += 1) {
            transferFrom(msg.sender, tos[i], ids[i]);
        }
    }
}
