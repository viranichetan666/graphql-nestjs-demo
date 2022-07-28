import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { LoginInput, RegisterInput } from './gql/user.input';
import { UserEntity } from './gql/user.type';
import { UserService } from './users.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) { }
  @Mutation(() => UserEntity, { name: 'register', nullable: true })
  async register(@Args('object') user: RegisterInput): Promise<UserEntity> {
    return this.userService.register(user);
  }

  @Query(() => UserEntity, { name: 'login', nullable: true })
  async login(@Args('object') user: LoginInput): Promise<UserEntity> {
    return this.userService.login(user);
  }
}
