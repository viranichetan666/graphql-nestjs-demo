import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { PostUser } from '../../users/gql/user.type';

@ObjectType()
export class PostEntity {
  @Field(() => ID, { description: 'id' })
  id: string;

  @Field(() => String, { description: 'title' })
  title: string;

  @Field(() => String, { description: 'image' })
  image: string;

  @Field(() => String, { description: 'description' })
  description: string;

  @Field(() => PostUser, { description: 'user' })
  user: PostUser;
}

@ObjectType()
export class PaginatedPostEntity {
  @Field(() => [PostEntity], { description: 'posts' })
  posts: [PostEntity];

  @Field(() => Int, { description: 'total' })
  total: number;
}