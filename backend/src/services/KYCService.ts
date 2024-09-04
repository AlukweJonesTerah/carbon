// backend/src/services/KYCService.ts

import { AppDataSource } from "../data-source";
import { KYCSubmission } from "../entity/KYCSubmission";
import { ethers } from "ethers";
import { BaseUser } from "../entity/BaseUser";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_PROVIDER_URL);
const kycContractAddress = process.env.KYC_CONTRACT_ADDRESS as string;
const kycAbi = [
    "function submitKYC(uint256 userId, uint8 role, bytes32 documentHash) external",
    "function approveKYC(address user) external",
    "function getKYCStatus(address user) external view returns (bool)",
    "function getDocumentHash(address user) external view returns (bytes32)"
];
const kycContract = new ethers.Contract(kycContractAddress, kycAbi, provider);

export async function submitKYC(userId: number, documentHash: string, kycData: any): Promise<void> {
    // Ensure userId is a number
    const user = await AppDataSource.getRepository(BaseUser).findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    const kycSubmission = new KYCSubmission();
    kycSubmission.userId = userId;
    kycSubmission.role = user.role;
    kycSubmission.documentHash = documentHash;

    // Add specific data handling based on the role
    if (user.role === "industry") {
        kycSubmission.businessAddress = kycData.businessAddress;
        kycSubmission.businessLicense = kycData.businessLicense;
        kycSubmission.startDate = kycData.startDate;
        kycSubmission.taxId = kycData.taxId;
    } else if (user.role === "ngo") {
        kycSubmission.businessAddress = kycData.businessAddress;
        kycSubmission.registrationDate = kycData.registrationDate;
        kycSubmission.ngoCertificate = kycData.ngoCertificate;
        kycSubmission.areaOfOperation = kycData.areaOfOperation;
    } else if (user.role === "individual") {
        kycSubmission.passportOrId = kycData.passportOrId;
        kycSubmission.proofOfAddress = kycData.proofOfAddress;
        kycSubmission.nationality = kycData.nationality;
        kycSubmission.gender = kycData.gender;
    }

    const signer = provider.getSigner();
    const kycWithSigner = kycContract.connect(signer);
    const roleEnum = { industry: 1, government: 2, ngo: 3, individual: 4 };

    // Hash the document before submitting it to the blockchain
    const hashedDocument = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(documentHash));
    await kycWithSigner.submitKYC(userId, roleEnum[user.role], hashedDocument);

    await AppDataSource.getRepository(KYCSubmission).save(kycSubmission);
    console.log(`KYC submitted for user: ${userId}`);
}

export async function approveKYC(userAddress: string): Promise<void> {
    // Ensure userAddress is correct and find the KYCSubmission
    const kycSubmission = await AppDataSource.getRepository(KYCSubmission).findOneBy({ userId: parseInt(userAddress) });
    if (!kycSubmission) throw new Error("KYC submission not found");

    // Ensure the KYC is not already approved
    if (kycSubmission.approved) throw new Error("KYC is already approved");

    // Interact with the smart contract to approve the KYC
    const signer = provider.getSigner();
    const kycWithSigner = kycContract.connect(signer);

    // Type assertion to avoid TypeScript error
    if ('approveKYC' in kycWithSigner && typeof kycWithSigner.approveKYC === 'function') {
        await kycWithSigner.approveKYC(userAddress);
    } else {
        throw new Error("approveKYC function not found in contract");
    }

    // Mark the KYC submission as approved in the database
    kycSubmission.approved = true;
    await AppDataSource.getRepository(KYCSubmission).save(kycSubmission);

    console.log(`KYC approved for user: ${userAddress}`);
}
