// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Emission.sol";
import "./ProjectRegistry.sol";

contract CarbonCreditRegistry {
    struct Industry {
        uint256 id;
        string name;
        uint256 creditBalance;
    }

    struct NGO {
        uint256 id;
        string organizationName;
        uint256 creditBalance;
    }

    Emission public emissionContract;
    ProjectRegistry public projectRegistry;

    mapping(uint256 => Industry) public industries;
    mapping(uint256 => NGO) public ngos;
    uint256 public nextIndustryId;
    uint256 public nextNGOId;

    address public admin;

    event CreditsTraded(uint256 indexed fromId, uint256 indexed toId, uint256 creditAmount, string fromType, string toType);
    event CreditsAllocated(uint256 indexed id, uint256 creditAmount, string recipientType);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can allocate credits");
        _;
    }

    constructor(address _emissionContract, address _projectRegistry) {
        admin = msg.sender;
        emissionContract = Emission(_emissionContract);
        projectRegistry = ProjectRegistry(_projectRegistry);
    }

    // Allocate credits based on emissions for industries
    function allocateCreditsBasedOnEmission(uint256 industryId) public onlyAdmin {
        Emission.EmissionReport memory report = emissionContract.getMyEmission(industryId);
        uint256 credits = calculateCredits(report.co2Emission);
        industries[industryId].creditBalance += credits;
        emit CreditsAllocated(industryId, credits, "Industry");
    }

    // Allocate credits to NGOs based on verified projects
    function allocateCreditsToNGO(uint256 ngoId, uint256 projectId) public onlyAdmin {
        require(projectRegistry.isProjectVerified(projectId), "Project not verified");
        uint256 credits = projectRegistry.getOffsetAmount(projectId);
        ngos[ngoId].creditBalance += credits;
        emit CreditsAllocated(ngoId, credits, "NGO");
    }

    // NGOs can sell their credits
    function tradeCreditsFromNGO(uint256 ngoId, uint256 industryId, uint256 creditAmount) public {
        require(ngos[ngoId].creditBalance >= creditAmount, "Insufficient credits");
        ngos[ngoId].creditBalance -= creditAmount;
        industries[industryId].creditBalance += creditAmount;
        emit CreditsTraded(ngoId, industryId, creditAmount, "NGO", "Industry");
    }

    // Credits trading between industries
    function tradeCreditsBetweenIndustries(uint256 fromIndustryId, uint256 toIndustryId, uint256 creditAmount) public {
        require(industries[fromIndustryId].creditBalance >= creditAmount, "Insufficient credits");
        industries[fromIndustryId].creditBalance -= creditAmount;
        industries[toIndustryId].creditBalance += creditAmount;
        emit CreditsTraded(fromIndustryId, toIndustryId, creditAmount, "Industry", "Industry");
    }

    function calculateCredits(uint256 co2Emission) internal pure returns (uint256) {
        return co2Emission / 1000;
    }
}
