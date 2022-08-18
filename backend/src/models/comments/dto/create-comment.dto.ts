import { User } from '../../users/user.schema';
import { Post } from '../../posts/post.schema';

export class CreateCommentDto {
  text: string;
  date: Date;
  author: User;
  post: Post;
}
