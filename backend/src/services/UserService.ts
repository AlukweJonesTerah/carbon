// backend/src/service/UserService.ts

import "reflect-metadata";
import bcrypt from 'bcrypt';
import { AppDataSource } from "../data-source";
import { IndustryUser, GovernmentUser, NGOUser, IndividualUser } from "../entity/index";
import { ethers } from "ethers";
import dotenv from 'dotenv';
import { BaseUser } from "../entity/BaseUser";

dotenv.config();

const industryRepository = AppDataSource.getRepository(IndustryUser);
const governmentRepository = AppDataSource.getRepository(GovernmentUser);
const ngoRepository = AppDataSource.getRepository(NGOUser);
const individualRepository = AppDataSource.getRepository(IndividualUser);
const saltRounds = 10;

const providerUrl = process.env.BLOCKCHAIN_PROVIDER_URL;
const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;
const userRegistryAddress = process.env.USER_REGISTRY_CONTRACT_ADDRESS;

if (!providerUrl || !privateKey || !userRegistryAddress) {
  throw new Error('Required environment variables are missing');
}

// const provider = new ethers.providers.JsonRpcProvider(providerUrl);
// const wallet = new ethers.Wallet(privateKey, provider);

const userRegistryAbi = [
  "function registerUser(uint256 role) external",
  "function getUserId(address user) external view returns (uint256)"
];
// const userRegistry = new ethers.Contract(userRegistryAddress, userRegistryAbi, wallet);

enum UserRole {
  Industry = 1,
  Government,
  NGO,
  Individual
}

interface UserData {
  email: string;
  password: string;
  [key: string]: any; // for other dynamic properties
}

export async function registerUser(userData: UserData, role: keyof typeof UserRole): Promise<void> {
  let user;
  switch (role) {
    case "Industry":
      user = new IndustryUser();
      break;
    case "Government":
      user = new GovernmentUser();
      break;
    case "NGO":
      user = new NGOUser();
      break;
    case "Individual":
      user = new IndividualUser();
      break;
    default:
      throw new Error("Invalid role");
  }
  Object.assign(user, userData, { role });
  user.password = await bcrypt.hash(userData.password, saltRounds);
  // Interact with the smart contract
  try {
    const roleValue = UserRole[role];
    // const tx = await userRegistry.registerUser(roleValue);
    // await tx.wait(); // Wait for the transaction to be mined
    // console.log(`Transaction successful: ${tx.hash}`);
  } catch (error) {
    console.error("Error registering user on blockchain:", error);
    throw new Error("Failed to register user on blockchain");
  }

  await AppDataSource.getRepository(user.constructor.name).save(user);
  console.log(`${role} user has been registered`);
}
export async function getUserById(userId: number) {
  return await AppDataSource.getRepository(BaseUser).findOneBy({id: userId});
}
export async function loginUser(email: string, password: string, role: keyof typeof UserRole) {
  let user;
  switch (role) {
    case "Industry":
      user = await industryRepository.findOneBy({ email });
      break;
    case "Government":
      user = await governmentRepository.findOneBy({ email });
      break;
    case "NGO":
      user = await ngoRepository.findOneBy({ email });
      break;
    case "Individual":
      user = await individualRepository.findOneBy({ email });
      break;
    default:
      throw new Error("Invalid role");
  }
  if (user && await bcrypt.compare(password, user.password)) {
    console.log("Login successful:", { role });
    return user;
  } else {
    console.log("Invalid credentials");
    return null;
  }
}
