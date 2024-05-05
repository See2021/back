import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  imports: [
    MulterModule.register({
      dest: './public', 
      limits: {
        fileSize: 5 * 1024 * 1024, // Adjust file size limit as needed
      },
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // Implement any directory logic here if needed
            cb(null, './public'); // Default for now
        },
        filename: (req, file, cb) => {
          const newFilename = `${Date.now()}-${file.originalname}`; 
          cb(null, newFilename);
        },
      }),
    }),
  ],
  providers: [UserService, PrismaService],
  controllers: [UserController]
})
export class UserModule {}
