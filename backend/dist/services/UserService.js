"use strict";
// src/controller/UserService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
require("reflect-metadata");
// import * as argon2 from "argon2";
const index_1 = require("../entity/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const data_source_1 = require("../data-source");
const industryRepository = data_source_1.AppDataSource.getRepository(index_1.IndustryUser);
const governmentRepository = data_source_1.AppDataSource.getRepository(index_1.GovernmentUser);
const ngoRepository = data_source_1.AppDataSource.getRepository(index_1.NGOUser);
const individualRepository = data_source_1.AppDataSource.getRepository(index_1.IndividualUser);
const saltRounds = 10;
function registerUser(userData, role) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        switch (role) {
            case "industry":
                user = new index_1.IndustryUser();
                Object.assign(user, userData);
                user.password = yield bcrypt_1.default.hash(userData.password, saltRounds);
                yield industryRepository.save(user);
                break;
            case "government":
                user = new index_1.GovernmentUser();
                Object.assign(user, userData);
                user.password = yield bcrypt_1.default.hash(userData.password, saltRounds);
                yield governmentRepository.save(user);
                break;
            case "ngo":
                user = new index_1.NGOUser();
                Object.assign(user, userData);
                user.password = yield bcrypt_1.default.hash(userData.password, saltRounds);
                yield ngoRepository.save(user);
                break;
            case "individual":
                user = new index_1.IndividualUser();
                Object.assign(user, userData);
                user.password = yield bcrypt_1.default.hash(userData.password, saltRounds);
                yield individualRepository.save(user);
                break;
            default:
                throw new Error("Invalid role");
        }
        console.log("user has been registered");
    });
}
exports.registerUser = registerUser;
function loginUser(email, password, role) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        switch (role) {
            case "industry":
                user = yield industryRepository.findOneBy({ email });
                break;
            case "government":
                user = yield governmentRepository.findOneBy({ email });
                break;
            case "ngo":
                user = yield ngoRepository.findOneBy({ email });
                break;
            case "individual":
                user = yield individualRepository.findOneBy({ email });
                break;
            default:
                throw new Error("Invalid role");
        }
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            console.log("Login successful");
            return user;
        }
        else {
            console.log("Invalid credentials");
            return null;
        }
    });
}
exports.loginUser = loginUser;
//# sourceMappingURL=UserService.js.map