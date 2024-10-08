"use strict";
// src/entity/BaseUser.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUser = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let BaseUser = class BaseUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BaseUser.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEmail)() // This ensures the email field is a valid email
    ,
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], BaseUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], BaseUser.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], BaseUser.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.Length)(6, 100) // password is at least 6 characters long
    ,
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BaseUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BaseUser.prototype, "role", void 0);
BaseUser = __decorate([
    (0, typeorm_1.Entity)()
], BaseUser);
exports.BaseUser = BaseUser;
//# sourceMappingURL=BaseUser.js.map