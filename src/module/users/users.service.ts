import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { LoginInput, RegisterInput } from './gql/user.input';
import { UserEntity } from './gql/user.type';
import { User, UserDocument } from './users.schema';
import { USER } from '../../shared/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<User>,
    private readonly jwt: JwtService,
  ) { }

  async register(user: RegisterInput): Promise<UserEntity> {
    try {
      const data = await this.model.create(user);
      const token = await this.generateToken(data);
      return { id: data._id.toString(), email: data.email, name: data.name, token }
    } catch (err) {
      if (err?.code === 11000) {
        throw new ConflictException(USER.EMAIL_EXIST)
      }
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async login(user: LoginInput): Promise<UserEntity> {
    try {
      const details: UserDocument = await this.model.findOne({ email: user.email });
      if (!details) {
        throw new BadRequestException(USER.INVALID_CRED)
      }
      const isValid: boolean = await bcrypt.compare(user.password, details.password);
      if (!isValid) {
        throw new BadRequestException(USER.INVALID_CRED)
      }
      const token = await this.generateToken(details);
      return { id: details._id.toString(), email: details.email, name: details.name, token }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateToken(user: UserDocument): Promise<string> {
    return this.jwt.signAsync({ email: user.email, id: user._id });
  }
}
