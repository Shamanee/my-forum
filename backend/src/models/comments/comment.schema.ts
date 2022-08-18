import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Post } from '../posts/post.schema';

export type CommentDocument = Comment & Document;

@Schema({ versionKey: false })
export class Comment {
  @Prop()
  text: string;

  @Prop({ default: () => 0 })
  like: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop({ default: () => new Date() })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
