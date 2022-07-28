import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    minlength: 2,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
