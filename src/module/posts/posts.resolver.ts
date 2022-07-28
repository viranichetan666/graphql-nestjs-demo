import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { PaginationInput, PostInput } from './gql/post.input';
import { PaginatedPostEntity, PostEntity } from './gql/post.type';
import { PostService } from './posts.service';

import { GqlUser } from '../../shared/decorator/current-user.decorator';
import { GqlAuthGuard } from '../../shared/guard/gql.guard';


@Resolver(() => [PostEntity, PaginatedPostEntity])
export class PostResolver {
  constructor(private readonly postService: PostService) { }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => PostEntity, { nullable: false, name: 'create' })
  async create(@Args('object') input: PostInput, @GqlUser() user: { id: string }): Promise<PostEntity> {
    return this.postService.create(user.id, input);
  }

  @Query(() => PaginatedPostEntity, { nullable: false, name: 'posts' })
  async findAll(@Args('object') pagination: PaginationInput): Promise<PaginatedPostEntity> {
    return this.postService.findAll(pagination);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedPostEntity, { nullable: false, name: 'myPosts' })
  async myPosts(@Args('object') pagination: PaginationInput, @GqlUser() user: { id: string }): Promise<PaginatedPostEntity> {
    return this.postService.findMyPosts(user.id, pagination);
  }
}