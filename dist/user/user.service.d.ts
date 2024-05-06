import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(user: User): Promise<{
        id: number;
        username: string;
        email: string;
        password: number;
        role: number;
        created_at: Date;
    }>;
    getAtk(id: number): Promise<{
        id: number;
        username: string;
        release_date: Date;
        result: number;
        image_url: string;
        reported_at: Date;
        regis_id: number;
    }>;
    login(username: string, password: number): Promise<{
        id: number;
        username: string;
        email: string;
        password: number;
        role: number;
        created_at: Date;
    }>;
    getAllAtk(): Promise<{
        id: number;
        username: string;
        release_date: Date;
        result: number;
        image_url: string;
        reported_at: Date;
        regis_id: number;
    }[]>;
    createAtkResult(data: any, image_url: string): Promise<{
        id: number;
        username: string;
        release_date: Date;
        result: number;
        image_url: string;
        reported_at: Date;
        regis_id: number;
    }>;
    getHello(): string;
}
