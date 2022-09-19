import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  text: string;
  @IsString()
  post: string;
}
