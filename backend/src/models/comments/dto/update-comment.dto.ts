import { User } from '../../users/user.schema';

export class UpdateCommentDto {
  text: string;
  date: Date;
  author: User;
  like: number;
}
