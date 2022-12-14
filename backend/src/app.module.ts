import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import { CoachModule } from './coach/coach.module';
import {ServicesModule} from "./services/services.module";
import { BlogModule } from './blog/blog.module';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      UserModule,
      CoachModule,
      ServicesModule,
      BlogModule,
      JwtModule.register({}),
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('MONGO_URI')
        })
      }),
  ],
})
export class AppModule {}
