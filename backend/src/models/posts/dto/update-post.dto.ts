import { User } from '../../users/user.schema';

export class UpdatePostDto {
  title: string;
  text: string;
  date: Date;
  author: User;
  like: number;
}
