import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { User, UserSchema } from './users.schema';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<User>('save', async function () {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
          });
          return schema;
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION')
          },
        }
      },
      inject: [ConfigService]
    }),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule { }
