import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) { }
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('MONGO_URL'),
      retryWrites: true,
      retryAttempts: 5,
      retryDelay: 10,
    };
  }
}