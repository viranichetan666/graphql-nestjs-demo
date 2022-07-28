import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Post {
  @Prop({
    required: true,
    minlength: 5,
    trim: true,
  })
  title: string;

  @Prop({
    required: true,
    minlength: 20,
    trim: true
  })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, ref: 'User' })
  user: string;

}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
