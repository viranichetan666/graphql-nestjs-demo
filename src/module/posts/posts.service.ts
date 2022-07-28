import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Post } from "./posts.schema";
import { PostEntity, PaginatedPostEntity } from './gql/post.type';
import { PaginationInput, PostInput } from './gql/post.input';


@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly model: Model<Post>,
  ) { }

  async create(id: string, input: PostInput): Promise<PostEntity> {
    const data = await this.model.create({ ...input, user: id });
    return data.populate('user');
  }

  async findAll(pagination: PaginationInput): Promise<PaginatedPostEntity> {
    return this.findAllAndCount({}, pagination);
  }

  async findMyPosts(user: string, pagination: PaginationInput): Promise<PaginatedPostEntity> {
    return this.findAllAndCount({ user }, pagination);
  }

  async findAllAndCount(condition, { page, limit }: PaginationInput): Promise<{ total: number, posts: any }> {
    const total = await this.model.find(condition).countDocuments();
    const posts = await this.model.find(condition).skip((page - 1) * limit).limit(limit).populate('user');
    return { total, posts }
  }
}