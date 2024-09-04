// // src/data-source.ts

// import { DataSource } from "typeorm";
// import { User } from "./entity/User";

// export const AppDataSource = new DataSource({
//   type: "mysql", // or other supported database types, e.g., "postgres"
//   host: "localhost",
//   port: 3306, // or your database port
//   username: "your_db_username",
//   password: "your_db_password",
//   database: "your_db_name",
//   synchronize: true, // set to false in production
//   logging: false,
//   entities: [User], // Include your entity files here
//   subscribers: [],
//   migrations: [],
// });

// src/data-source.ts

import "reflect-metadata";
import { DataSource } from "typeorm";
import { BaseUser } from "./entity/BaseUser";
import { GovernmentUser } from "./entity/GovernmentUser";
import { IndustryUser } from "./entity/IndustryUser";
import { NGOUser } from "./entity/NGOUser";
import { IndividualUser } from "./entity/IndividualUser";
import { KYCSubmission } from "./entity/KYCSubmission";
import { Emission } from "./entity/Emission";


// export const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: "./db/cc.sqlite", // Adjust the path as needed
//   synchronize: true,
//   logging: false,
//   entities: [User],
//   migrations: [],
//   subscribers: [],
// });

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./db/cc.sqlite",
    synchronize: true, // Change to false in production
    logging: true, // Enable for development
    entities: [BaseUser,GovernmentUser, IndustryUser, NGOUser, IndividualUser, KYCSubmission, Emission],
    migrations: ["./migration/*.ts"], // Adjust as needed
    subscribers: ["./subscribers/*.ts"], // Adjust as needed
  });
  