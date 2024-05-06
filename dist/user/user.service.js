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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(user) {
        return this.prisma.regis.create({
            data: {
                ...user,
                role: 1,
            },
        });
    }
    async getAtk(id) {
        return this.prisma.atk_results.findUnique({
            where: {
                id: id,
            },
        });
    }
    async login(username, password) {
        const user = await this.prisma.regis.findUnique({
            where: {
                username: username,
            },
        });
        if (!user) {
            throw new Error('No such user found');
        }
        if (user.password !== password) {
            throw new Error('Invalid password');
        }
        return user;
    }
    async getAllAtk() {
        return this.prisma.atk_results.findMany();
    }
    async createAtkResult(data, image_url) {
        const { regis_id, ...rest } = data;
        return this.prisma.atk_results.create({
            data: {
                ...rest,
                image_url,
                regis: {
                    connect: { id: regis_id },
                },
            },
        });
    }
    getHello() {
        return 'Hello World!';
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map