// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    mapping(address => uint256) public userIds;
    uint256 public nextUserId;

    event UserRegistered(address indexed user, uint256 userId);

    modifier onlyUnregistered() {
        require(userIds[msg.sender] == 0, "User already registered");
        _;
    }

    function registerUser() external onlyUnregistered {
        nextUserId++;
        userIds[msg.sender] = nextUserId;
        emit UserRegistered(msg.sender, nextUserId);
    }

    function getUserId(address user) external view returns (uint256) {
        return userIds[user];
    }
}
