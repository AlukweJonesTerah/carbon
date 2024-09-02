// src/controller/UserService.ts

import "reflect-metadata";
import  express  from "express";
import { DataSource } from "typeorm";
// import * as argon2 from "argon2";
import { IndustryUser, GovernmentUser, NGOUser, IndividualUser } from "../entity/index";
import bcrypt from 'bcrypt';
import { AppDataSource } from "../data-source";
// import {ethers} from "ethers";


const industryRepository = AppDataSource.getRepository(IndustryUser);
const governmentRepository = AppDataSource.getRepository(GovernmentUser);
const ngoRepository = AppDataSource.getRepository(NGOUser);
const individualRepository = AppDataSource.getRepository(IndividualUser);
const saltRounds = 10;

// smartcontract address

// const provider = new ethers.providers.JsonRpcProvider("Your_RPC_URL");
// const userRegistryAddress = "YOUR_USER_REGISTRY_CONTRACT_ADDRESS";
// const carbonCreditAddress = "YOUR_USER_REGISTRY_CONTRACT_ADDRESS";

const userRegistryAbi = [
  "function registerUser() external",
  "function getUserId(address user) external view returns (unit256)"
];
const carbonCreditAbi = [ 
  "function mint(address to, uint256 amount) external",
  "function burn(adress from, unit256 amount) external"
];
// const userRegistry = new ethers.Contract(userRegistryAddress, userRegistryAbi, provider);
// const userRegistry = new ethers.Contract(carbonCreditAddress, carbonCreditAbi, provider);

interface userData{
    email: string;
    password: string;
    phone: string;
    username: string;
    role: string;

}

type Role = "industry" | "government" | "ngo" | "individual";

export async function registerUser(userData: any, role: Role): Promise<void> {
    let user;
      switch (role) {
        case "industry":
          user = new IndustryUser();
          Object.assign(user, userData, {role});
          user.password = await bcrypt.hash(userData.password, saltRounds);
          await industryRepository.save(user);
          break;
        
        case "government":
          user = new GovernmentUser();
          Object.assign(user, userData, {role});
          user.password = await bcrypt.hash(userData.password, saltRounds);
          await governmentRepository.save(user);
          break;
        
        case "ngo":
          user = new NGOUser();
          Object.assign(user, userData, {role});
          user.password = await bcrypt.hash(userData.password, saltRounds);
          await ngoRepository.save(user);
          break;
        
        case "individual":
          user = new IndividualUser();
          Object.assign(user, userData, {role});
          user.password = await bcrypt.hash(userData.password, saltRounds);
          await individualRepository.save(user);
          break;
        
        default:
          throw new Error("Invalid role");
      }
      console.log(`${role}user has been registered`);
  }
  
  export async function loginUser(email: string, password: string, role:string) {
    let user;
    switch (role) {
        case "industry":
            user = await industryRepository.findOneBy({ email });
            break;
        case "government":
            user = await governmentRepository.findOneBy({ email });
            break;
        case "ngo":
            user = await ngoRepository.findOneBy({ email });
            break;
        case "individual":
            user = await individualRepository.findOneBy({ email });
            break;
        
        default:
            throw new Error("Invalid role");
    }
    if (user && await bcrypt.compare(password, user.password)) {
        console.log("Login successful: ", {role});
        return user;
    } else {
        console.log("Invalid credentials");
        return null;
    }
} 
  