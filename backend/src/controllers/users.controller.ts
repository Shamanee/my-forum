import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { UpdateUserDto } from '../models/users/dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { UserInterface } from '../models/users/interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserInterface[]> {
    return this.usersService.findAll();
  }

  @Post('users-by-id')
  async findInArray(@Body() userIds: string[]): Promise<UserInterface[]> {
    return this.usersService.findWithArray(userIds);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserInterface> {
    return this.usersService.find(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    return this.usersService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteOne(id);
  }
}
