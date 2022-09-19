import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { UpdateUserDto } from '../models/users/dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../models/users/user.schema';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.create({
      username: createUserDto.username,
      password: await this.authService.hashPassword(createUserDto.password),
    });
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('users-by-id')
  async findInArray(@Body() userIds: string[]): Promise<User[]> {
    return this.usersService.findWithArray(userIds);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.find(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteOne(id);
  }
}
