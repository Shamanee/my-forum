import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { User, UserSchema } from './models/users/user.schema';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://new_user:xO%40ac6%23KT%5E%23O4XaU0QrC@freecluster.cqvcw.mongodb.net/my-forum-test?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController, UsersController],
  providers: [UsersService],
})
export class AppModule {}
