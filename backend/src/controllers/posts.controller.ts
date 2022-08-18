import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePostDto } from '../models/posts/dto/create-post.dto';
import { UpdatePostDto } from '../models/posts/dto/update-post.dto';
import { PostsService } from '../services/posts.service';
import { Post as PostSchema } from '../models/posts/post.schema';
import { Observable, of } from 'rxjs';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<void> {
    await this.postsService.create(createPostDto);
  }

  @Get()
  findAll(): Observable<Promise<PostSchema[]>> {
    return of(this.postsService.findAll());
  }

  @Post('posts-by-id')
  async findInArray(@Body() postIds: string[]): Promise<PostSchema[]> {
    return this.postsService.findWithArray(postIds);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostSchema> {
    return this.postsService.find(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostSchema> {
    return this.postsService.updateOne(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.postsService.deleteOne(id);
  }

  @Get('like/:id')
  async likePost(@Param('id') id: string): Promise<PostSchema> {
    return this.postsService.likePost(id);
  }
}
