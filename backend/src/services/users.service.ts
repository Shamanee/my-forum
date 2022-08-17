import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../models/users/user.schema';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { UpdateUserDto } from '../models/users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findWithArray(userIds: string[]): Promise<User[]> {
    return this.userModel
      .aggregate()
      .match({
        _id: { $in: userIds.map((u) => new Types.ObjectId(u)) },
      })
      .sort({ date: -1 })
      .exec();
  }

  async find(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateOne(userId: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate(
      { _id: userId },
      { $set: updateUserDto },
      { useFindAndModify: false, new: true },
    );
  }

  async deleteOne(userId: string) {
    return this.userModel.findOneAndDelete({ _id: userId });
  }
}
