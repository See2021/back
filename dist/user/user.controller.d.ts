/// <reference types="multer" />
import { UserService } from './user.service';
import { User } from './user.model';
import { Request, Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register(user: User): Promise<{
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
    getAtk(id: number): Promise<{
        id: number;
        username: string;
        release_date: Date;
        result: number;
        image_url: string;
        reported_at: Date;
        regis_id: number;
    }>;
    login(user: Pick<User, 'username' | 'password'>): Promise<{
        id: number;
        username: string;
        email: string;
        password: number;
        role: number;
        created_at: Date;
    }>;
    submitAtkResult(request: Request, response: Response, data: any, file: Express.Multer.File): Promise<Response<any, Record<string, any>>>;
    getHello(): string;
}
