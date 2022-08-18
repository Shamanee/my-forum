import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { User, UserSchema } from './models/users/user.schema';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Post, PostSchema } from './models/posts/post.schema';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://new_user:xO%40ac6%23KT%5E%23O4XaU0QrC@freecluster.cqvcw.mongodb.net/my-forum-test?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [AppController, UsersController, PostsController],
  providers: [UsersService, PostsService],
})
export class AppModule {}
