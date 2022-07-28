import { Module } from '@nestjs/common';
import { PostModule } from './posts/posts.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [UserModule, PostModule],
  exports: [UserModule, PostModule],
})
export class ApiModule { }
