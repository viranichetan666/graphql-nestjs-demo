import { ObjectType, Field, ID, OmitType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => ID, { description: 'id' })
  id: string;

  @Field(() => String, { description: 'name' })
  name: string;

  @Field(() => String, { description: 'email' })
  email: string;

  @Field(() => String, { description: 'token' })
  token: string;
}


@ObjectType()
export class PostUser extends OmitType(UserEntity, ['token'] as const) { }