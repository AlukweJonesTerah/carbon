// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUserRegistry {
    enum Role { None, Industry, Government, NGO, Individual }

    function getUserRole(address user) external view returns (Role);
}

contract ProjectRegistry {
    struct Project {
        uint256 id;
        string name;
        uint256 offsetAmount;
        bool verified;
    }

    mapping(uint256 => Project) public projects;
    mapping(string => bool) public projectNames; // To check if a project name already exists
    uint256 public nextProjectId;

    IUserRegistry public userRegistry;

    event ProjectRegistered(uint256 indexed projectId, string name, uint256 offsetAmount);
    event ProjectVerified(uint256 indexed projectId);

    constructor(address userRegistryAddress) {
        userRegistry = IUserRegistry(userRegistryAddress);
    }

    modifier onlyNGO() {
        require(userRegistry.getUserRole(msg.sender) == IUserRegistry.Role.NGO, "Only NGOs can perform this action");
        _;
    }

    function registerProject(string memory name, uint256 offsetAmount) public onlyNGO {
        require(!projectNames[name], "Project with this name already registered"); // Check if project name is already used

        projects[nextProjectId] = Project(nextProjectId, name, offsetAmount, false);
        projectNames[name] = true; // Mark this name as used
        emit ProjectRegistered(nextProjectId, name, offsetAmount);
        nextProjectId++;
    }

    function verifyProject(uint256 projectId) public onlyNGO {
        require(projects[projectId].id == projectId, "Project not found");
        require(!projects[projectId].verified, "Project already verified");
        projects[projectId].verified = true;
        emit ProjectVerified(projectId);
    }

    function getOffsetAmount(uint256 projectId) public view returns (uint256) {
        require(projects[projectId].id == projectId, "Project not found");
        return projects[projectId].offsetAmount;
    }

    function isProjectVerified(uint256 projectId) public view returns (bool) {
        require(projects[projectId].id == projectId, "Project not found");
        return projects[projectId].verified;
    }
}
