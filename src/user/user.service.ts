import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(user: User) {
        return this.prisma.regis.create({
            data: {
                ...user,
                role: 1,
            },
        });
    }

    async getAtk(id: number) {
        return this.prisma.atk_results.findUnique({
            where: {
                id: id,
            },
        });
    }

    async login(username: string, password: number) {
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

    async createAtkResult(data: any, image_url: string) {
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

    getHello(): string {
        return 'Hello World!';
    }
}
