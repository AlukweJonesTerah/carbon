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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = req.body, { role } = _a, userData = __rest(_a, ["role"]);
            try {
                yield (0, UserService_1.registerUser)(userData, role);
                res.status(201).send("User registered successfully");
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = req.body;
            try {
                const user = yield (0, UserService_1.loginUser)(email, password, role);
                if (user) {
                    res.status(200).send("Login successful");
                }
                else {
                    res.status(401).send("Invalid credentials");
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map