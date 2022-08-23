import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ username: string; _id: string; createdAt: Date }> {
    const user = await this.usersService.findOneWithPassword(username);

    if (user && user.password === pass) {
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
}
