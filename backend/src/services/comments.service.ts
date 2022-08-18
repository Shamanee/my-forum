import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from '../models/comments/comment.schema';
import { CreateCommentDto } from '../models/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../models/comments/dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async findAll(query: string[]): Promise<Comment[]> {
    return this.commentModel.find(query).exec();
  }

  async findWithArray(commentIds: string[]): Promise<Comment[]> {
    return this.commentModel
      .aggregate()
      .match({
        _id: { $in: commentIds.map((u) => new Types.ObjectId(u)) },
      })
      .sort({ date: -1 })
      .exec();
  }

  async find(commentId: string): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId).exec();
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }

  async updateOne(commentId: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.findOneAndUpdate(
      { _id: commentId },
      { $set: updateCommentDto },
      { useFindAndModify: false, new: true },
    );
  }

  async deleteOne(commentId: string) {
    return this.commentModel.findOneAndDelete({ _id: commentId });
  }

  async likeComment(commentId: string) {
    return this.commentModel.findByIdAndUpdate(
      commentId,
      { $inc: { like: 1 } },
      { useFindAndModify: false, new: true },
    );
  }
}
