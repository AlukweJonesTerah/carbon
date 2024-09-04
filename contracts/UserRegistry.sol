// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    enum Role { None, Industry, Government, NGO, Individual }

    mapping(address => uint256) public userIds;
    mapping(address => Role) public userRoles;
    uint256 public nextUserId;

    address public admin;

    event UserRegistered(address indexed user, uint256 userId, Role role);
    event RoleAssigned(address indexed user, Role role);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyRole(Role role) {
        require(userRoles[msg.sender] == role, "Access restricted to the assigned role");
        _;
    }

    constructor() {
        admin = msg.sender; // Set the contract creator as the admin
    }

    function registerUser(Role role) external {
        require(userRoles[msg.sender] == Role.None, "User already registered");
        require(role != Role.None, "Invalid role for registration");
        require(msg.sender != admin, "Admin cannot register as a regular user"); // Prevent admin from registering

        nextUserId++;
        userIds[msg.sender] = nextUserId;
        userRoles[msg.sender] = role;
        emit UserRegistered(msg.sender, nextUserId, role);
    }

    function assignRole(address user, Role role) external onlyAdmin {
        require(user != address(0), "Invalid address");
        require(role != Role.None, "Invalid role");
        require(userRoles[user] != role, "User already has this role"); // Check if the user already has this role

        userRoles[user] = role;
        emit RoleAssigned(user, role);
    }

    function getUserId(address user) external view returns (uint256) {
        return userIds[user];
    }

    function getUserRole(address user) external view returns (Role) {
        return userRoles[user];
    }
}
