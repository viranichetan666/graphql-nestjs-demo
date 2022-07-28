import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { DatabaseService } from "./database.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseService,
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule { }