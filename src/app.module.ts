import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { GraphQlModule } from './graphql/graphql.module';
import { ApiModule } from './module/api.module';
import { DatabaseModule } from './database/database.module';
import { JwtStrategy } from './shared/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      ignoreEnvVars: false,
    }),
    DatabaseModule,
    GraphQlModule,
    ApiModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [JwtStrategy]
})
export class AppModule { }
