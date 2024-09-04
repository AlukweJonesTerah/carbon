import { ethers, BigNumberish, BigNumber } from 'ethers';
import dotenv from 'dotenv';
import emissionAbi from './EmissionABI.json';

// Load environment variables (consider using a secure environment variable storage solution)
dotenv.config();

interface KYCData {
  fullName: string;
  dateOfBirth: string;
  address: string;
  companyName?: string;
  industryType?: string;
  companyRegNumber?: string;
  organizationName?: string;
  ngoRegNumber?: string;
  projectName?: string;
  projectDescription?: string;
}

interface EmissionData {
  industryName: string;
  co2Emission: number;
  date: string;
}

export class BlockchainService {
  private static readonly PROVIDER_URL: string | undefined = process.env.BLOCKCHAIN_PROVIDER_URL;
  private static readonly PRIVATE_KEY: string | undefined = process.env.BLOCKCHAIN_PRIVATE_KEY;
  private static readonly CONTRACT_ADDRESS: string | undefined = process.env.CONTRACT_ADDRESS;

  static async storeKYCData(data: KYCData): Promise<void> {
    this.validateBlockchainConfig();

    const provider = new ethers.JsonRpcProvider(this.PROVIDER_URL);
    const wallet = new ethers.Wallet(this.PRIVATE_KEY, provider);

    const abi: any[] = [
      // Your contract ABI goes here (consider using a separate file for the ABI)
    ];

    const contract = new ethers.Contract(this.CONTRACT_ADDRESS, kycAbi, wallet);

    try {
      const estimatedGas = await contract.estimateGas.storeKYCData(data);
      const tx = await contract.storeKYCData(data, {
        gasLimit: estimatedGas.add(BigNumber.from('10000')), // Add buffer
      });
      await tx.wait();
      console.log('KYC data stored on-chain');
    } catch (error) {
      console.error('Error storing KYC data:', error);
      throw new Error('Failed to store KYC data on-chain');
    }
  }

  static async submitEmission(data: EmissionData): Promise<void> {
    this.validateBlockchainConfig();

    const provider = new ethers.JsonRpcProvider(this.PROVIDER_URL);
    const wallet = new ethers.Wallet(this.PRIVATE_KEY, provider);

    const abi: any[] = [
      // Your contract ABI goes here
    ];

    const contract = new ethers.Contract(this.CONTRACT_ADDRESS, emissionAbi, wallet);

    try {
      const estimatedGas = await contract.estimateGas.submitEmission(data);
      const tx = await contract.submitEmission(data, {
        gasLimit: estimatedGas.add(BigNumber.from('10000')),
      });
      await tx.wait();
      console.log('Emission data stored on-chain');
    } catch (error) {
      console.error('Error storing emission data:', error);
      throw new Error('Failed to store emission data on-chain');
    }
  }

  static async getEmissions(): Promise<any[]> {
    this.validateBlockchainConfig();

    const provider = new ethers.JsonRpcProvider(this.PROVIDER_URL);
    const abi: any[] = [
      // Your contract ABI goes here
    ];

    const contract = new ethers.Contract(this.CONTRACT_ADDRESS, abi, provider);

    try {
      const emissions = await contract.getEmissions();
      return emissions;
    } catch (error) {
      console.error('Error retrieving emission data:', error);
      throw new Error('Failed to retrieve emission data');
    }
  }

  private static validateBlockchainConfig(): void {
    if (!this.PROVIDER_URL || !this.PRIVATE_KEY || !this.CONTRACT_ADDRESS) {
      throw new Error('Missing blockchain configuration: Provider URL, Private Key, or Contract Address');
    }
  }
}