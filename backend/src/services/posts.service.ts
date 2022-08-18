import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, PostDocument } from '../models/posts/post.schema';
import { CreatePostDto } from '../models/posts/dto/create-post.dto';
import { UpdatePostDto } from '../models/posts/dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findWithArray(postIds: string[]): Promise<Post[]> {
    return this.postModel
      .aggregate()
      .match({
        _id: { $in: postIds.map((u) => new Types.ObjectId(u)) },
      })
      .sort({ date: -1 })
      .exec();
  }

  async find(postId: string): Promise<Post> {
    const post = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async updateOne(postId: string, updatePostDto: UpdatePostDto) {
    return this.postModel.findOneAndUpdate(
      { _id: postId },
      { $set: updatePostDto },
      { useFindAndModify: false, new: true },
    );
  }

  async deleteOne(postId: string) {
    return this.postModel.findOneAndDelete({ _id: postId });
  }

  async likePost(postId: string) {
    return this.postModel.findByIdAndUpdate(
      postId,
      { $inc: { like: 1 } },
      { useFindAndModify: false, new: true },
    );
  }
}
