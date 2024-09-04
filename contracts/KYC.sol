// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUserRegistry {
    enum Role { None, Industry, Government, NGO, Individual }

    function getUserRole(address user) external view returns (Role);
    function getUserId(address user) external view returns (uint256);
}

contract KYC {
    IUserRegistry public userRegistry;
    address public admin;

    enum KYCStatus { None, Pending, Approved, Rejected }

    struct KYCData {
        uint256 userId;
        KYCStatus status;
        bytes32 documentHash; // Store document hashes for additional verification
    }

    mapping(address => KYCData) public kycData;

    event KYCSubmitted(address indexed user, uint256 userId, IUserRegistry.Role role, bytes32 documentHash);
    event KYCStatusChanged(address indexed user, uint256 userId, KYCStatus status);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyApprovedRolesForSubmission() {
        IUserRegistry.Role role = userRegistry.getUserRole(msg.sender);
        require(
            role == IUserRegistry.Role.Industry ||
            role == IUserRegistry.Role.NGO ||
            role == IUserRegistry.Role.Individual,
            "Only Industry, NGO, or Individual can submit KYC"
        );
        _;
    }

    modifier onlyApprovedRolesForApproval() {
        IUserRegistry.Role role = userRegistry.getUserRole(msg.sender);
        require(
            msg.sender == admin || role == IUserRegistry.Role.Government,
            "Only admin or Government can approve or reject KYC"
        );
        _;
    }

    constructor(address userRegistryAddress) {
        admin = msg.sender;
        userRegistry = IUserRegistry(userRegistryAddress);
    }

    function submitKYC(bytes32 documentHash) external onlyApprovedRolesForSubmission {
        require(kycData[msg.sender].userId == 0, "KYC already submitted"); // Check for duplicate submission
        uint256 userId = userRegistry.getUserId(msg.sender);
        require(userId != 0, "User not registered in UserRegistry");
        kycData[msg.sender] = KYCData(userId, KYCStatus.Pending, documentHash);
        emit KYCSubmitted(msg.sender, userId, userRegistry.getUserRole(msg.sender), documentHash);
    }

    function approveKYC(address user) external onlyApprovedRolesForApproval {
        KYCData storage data = kycData[user];
        require(data.userId != 0, "KYC data not found");
        require(data.status == KYCStatus.Pending, "KYC already processed");
        data.status = KYCStatus.Approved;
        emit KYCStatusChanged(user, data.userId, KYCStatus.Approved);
    }

    function rejectKYC(address user) external onlyApprovedRolesForApproval {
        KYCData storage data = kycData[user];
        require(data.userId != 0, "KYC data not found");
        require(data.status == KYCStatus.Pending, "KYC already processed");
        data.status = KYCStatus.Rejected;
        emit KYCStatusChanged(user, data.userId, KYCStatus.Rejected);
    }

    function getKYCStatus(address user) external view returns (KYCStatus) {
        return kycData[user].status;
    }

    function getDocumentHash(address user) external view returns (bytes32) {
        return kycData[user].documentHash;
    }

    function changeAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "New admin cannot be the zero address");
        address oldAdmin = admin;
        admin = newAdmin;
        emit AdminChanged(oldAdmin, newAdmin);
    }
}
