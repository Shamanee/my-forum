import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateCommentDto } from '../models/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../models/comments/dto/update-comment.dto';
import { CommentsService } from '../services/comments.service';
import { Comment as Comment } from '../models/comments/comment.schema';
import { Observable, of } from 'rxjs';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<void> {
    await this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() query): Observable<Promise<Comment[]>> {
    return of(this.commentsService.findAll(query));
  }

  @Post('comments-by-id')
  async findInArray(@Body() commentIds: string[]): Promise<Comment[]> {
    return this.commentsService.findWithArray(commentIds);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.find(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.updateOne(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.commentsService.deleteOne(id);
  }

  @Get('like/:id')
  async likeComment(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.likeComment(id);
  }
}
