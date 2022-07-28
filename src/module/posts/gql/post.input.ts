import { Field, InputType, Int } from '@nestjs/graphql';
import { MinLength, IsUrl, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class PostInput {
  @Field(() => String, { nullable: false, name: 'title' })
  @MinLength(5, { message: 'title must be min 5 char long' })
  title: string;

  @Field(() => String, { nullable: false, name: 'description' })
  @MinLength(20, { message: 'description must be 20 char long' })
  description: string;

  @Field(() => String, { nullable: false, name: 'image' })
  @IsUrl(['http', 'https'], { message: 'enter valid url' })
  image: string;
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: false, name: 'page' })
  @IsNumber()
  @IsPositive()
  page: number;

  @Field(() => Int, { nullable: false, name: 'limit' })
  @IsNumber()
  @IsPositive()
  limit: number;
}
