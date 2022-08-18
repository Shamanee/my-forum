import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

export type PostDocument = Post & Document;

@Schema({ versionKey: false })
export class Post {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop({ default: () => new Date() })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ default: () => 0 })
  like: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
