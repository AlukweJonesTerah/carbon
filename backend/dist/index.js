"use strict";
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
// src/index.ts
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const UserController_1 = require("./controller/UserController"); // Corrected import
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/register", UserController_1.UserController.register);
app.post("/login", UserController_1.UserController.login);
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}))
    .catch((error) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map