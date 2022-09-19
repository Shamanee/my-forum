import {HttpException, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly HASH_SALT_ROUNDS = 10;

  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ username: string; _id: string; createdAt: Date }> {
    const user = await this.usersService.findOneWithPassword(username);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      const { username, _id, createdAt } = user;
      return { username, _id, createdAt };
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, this.HASH_SALT_ROUNDS);
  }
}
