// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserRegistry.sol";

contract Emission {
    struct EmissionReport {
        uint256 id;
        uint256 industryId;
        uint256 co2Emission;
        string date;
    }

    mapping(uint256 => EmissionReport) public emissions;
    uint256 public nextId;

    UserRegistry userRegistry;
    address public admin;

    event EmissionSubmitted(uint256 id, uint256 industryId, uint256 co2Emission, string date);

    modifier onlyIndustry() {
        require(userRegistry.getUserRole(msg.sender) == UserRegistry.Role.Industry, "Only industries can submit emissions");
        _;
    }

    modifier onlyIndustryOwner(uint256 industryId) {
        require(userRegistry.getUserId(msg.sender) == industryId, "You can only view your own data");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the government can view all data");
        _;
    }

    constructor(address userRegistryAddress) {
        userRegistry = UserRegistry(userRegistryAddress);
        admin = msg.sender;
    }

    function submitEmission(uint256 industryId, uint256 co2Emission, string memory date) public onlyIndustry {
        require(userRegistry.getUserId(msg.sender) == industryId, "You can only submit data for your own industry");

        emissions[nextId] = EmissionReport(nextId, industryId, co2Emission, date);
        emit EmissionSubmitted(nextId, industryId, co2Emission, date);
        nextId++;
    }

    function getMyEmission(uint256 industryId) public view onlyIndustryOwner(industryId) returns (EmissionReport memory) {
        return emissions[industryId];
    }

    function getAllEmissions() public view onlyAdmin returns (EmissionReport[] memory) {
        EmissionReport[] memory allReports = new EmissionReport[](nextId);
        for (uint256 i = 0; i < nextId; i++) {
            allReports[i] = emissions[i];
        }
        return allReports;
    }
}
