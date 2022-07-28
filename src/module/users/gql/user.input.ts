import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String, { nullable: false, name: 'email' })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false, name: 'name' })
  @MinLength(2, { message: 'name must be min 2 char long' })
  name: string;

  @Field(() => String, { nullable: false, name: 'password' })
  @MinLength(8, { message: 'password must be 8 char long' })
  password: string;
}

@InputType()
export class LoginInput extends OmitType(RegisterInput, ['name'] as const) { }
