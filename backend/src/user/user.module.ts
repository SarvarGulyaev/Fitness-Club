import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModel} from "./models/user.model";
import {MailerModule} from "@nestjs-modules/mailer";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
      MongooseModule.forFeature([{name: 'User', schema: UserModel}]),
      MailerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
              transport: {
                  host: configService.get('SMTP_HOST'),
                  port: configService.get('SMTP_PORT'),
                  secure: false,
                  auth: {
                      user: configService.get('SMTP_USER'),
                      pass: configService.get('SMTP_PASSWORD')
                  }
              }
          })
      })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
