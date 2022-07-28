import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostResolver } from './posts.resolver';

import { Post, PostSchema } from './posts.schema';
import { PostService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema
      },
    ]),
  ],
  providers: [PostService, PostResolver],
})
export class PostModule { }
