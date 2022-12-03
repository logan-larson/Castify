import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

import { SubscriptionModule } from '../subscription/subscription.module';
import { PodcastModule } from '../podcast/podcast.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), SubscriptionModule, PodcastModule, CommentModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
