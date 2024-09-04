// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUserRegistry {
    enum Role { None, Industry, Government, NGO, Individual }

    function getUserRole(address user) external view returns (Role);
    function getUserId(address user) external view returns (uint256);
}

contract RewardSystem {
    struct Reward {
        uint256 id;
        uint256 individualId;
        uint256 amount;
    }

    mapping(uint256 => Reward[]) public rewards;
    uint256 public nextRewardId;

    IUserRegistry public userRegistry;

    event RewardDistributed(uint256 indexed rewardId, uint256 indexed individualId, uint256 amount);

    constructor(address userRegistryAddress) {
        userRegistry = IUserRegistry(userRegistryAddress);
    }

    modifier onlyNGO() {
        require(userRegistry.getUserRole(msg.sender) == IUserRegistry.Role.NGO, "Only NGOs can distribute rewards");
        _;
    }

    function distributeReward(uint256 individualId, uint256 amount) public onlyNGO {
        rewards[individualId].push(Reward(nextRewardId, individualId, amount));
        emit RewardDistributed(nextRewardId, individualId, amount);
        nextRewardId++;
    }
}
