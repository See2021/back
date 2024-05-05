import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('register')
    async register(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Get('atk')
    async getAllAtk() {
        return this.userService.getAllAtk();
    }

    @Get('atk/:id')
    async getAtk(@Param('id') id: number) {
        return this.userService.getAtk(Number(id));
    }

    @Post('login')
    async login(@Body() user: Pick<User, 'username' | 'password'>) {
        return this.userService.login(user.username, user.password);
    }

    @Post('result')
    @UseInterceptors(FileInterceptor('image'))
    async submitAtkResult(
        @Req() request: Request,
        @Res() response: Response,
        @Body() data: any,
        @UploadedFile() file: Express.Multer.File,
    ) {
        try {
            let imagePath: string | undefined;
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

            return response.status(HttpStatus.CREATED).json({
                status: 'Created',
                message: `ATK Result ID ${result.id} was created successfully`,
                result: result,
            });
        } catch (error) {
            console.error(error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'Internal Server Error',
                message: 'Error creating ATK Result',
            });
        }
    }

    @Get()
    getHello(): string {
        return this.userService.getHello();
    }
}
