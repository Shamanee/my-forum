import { User } from '../../users/user.schema';

export class CreatePostDto {
  title: string;
  text: string;
  date: Date;
  author: User;
}
