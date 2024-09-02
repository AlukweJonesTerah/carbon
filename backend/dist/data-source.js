"use strict";
// // src/data-source.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const BaseUser_1 = require("./entity/BaseUser");
const GovernmentUser_1 = require("./entity/GovernmentUser");
const IndustryUser_1 = require("./entity/IndustryUser");
const NGOUser_1 = require("./entity/NGOUser");
const IndividualUser_1 = require("./entity/IndividualUser");
// export const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: "./db/cc.sqlite", // Adjust the path as needed
//   synchronize: true,
//   logging: false,
//   entities: [User],
//   migrations: [],
//   subscribers: [],
// });
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./db/cc.sqlite",
    synchronize: true,
    logging: true,
    entities: [BaseUser_1.BaseUser, GovernmentUser_1.GovernmentUser, IndustryUser_1.IndustryUser, NGOUser_1.NGOUser, IndividualUser_1.IndividualUser],
    migrations: ["./migration/*.ts"],
    subscribers: ["./subscribers/*.ts"], // Adjust as needed
});
//# sourceMappingURL=data-source.js.map