"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(user) {
        return this.userService.createUser(user);
    }
    async getAllAtk() {
        return this.userService.getAllAtk();
    }
    async getAtk(id) {
        return this.userService.getAtk(Number(id));
    }
    async login(user) {
        return this.userService.login(user.username, user.password);
    }
    async submitAtkResult(request, response, data, file) {
        try {
            let imagePath;
            if (file) {
                imagePath = `/public/${file.filename}`;
            }
            if (typeof data.result === 'string') {
                data.result = parseInt(data.result, 10);
            }
            if (typeof data.regis_id === 'string') {
                data.regis_id = parseInt(data.regis_id, 10);
            }
            const result = await this.userService.createAtkResult(data, imagePath);
            return response.status(common_1.HttpStatus.CREATED).json({
                status: 'Created',
                message: `ATK Result ID ${result.id} was created successfully`,
                result: result,
            });
        }
        catch (error) {
            console.error(error);
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Internal Server Error',
                message: 'Error creating ATK Result',
            });
        }
    }
    getHello() {
        return this.userService.getHello();
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('atk'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllAtk", null);
__decorate([
    (0, common_1.Get)('atk/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAtk", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('result'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "submitAtkResult", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserController.prototype, "getHello", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map