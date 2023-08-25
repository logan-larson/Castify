import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';
import { PodcastModule } from './podcast/podcast.module';
import { Podcast } from './podcast/podcast.model';
import { EpisodeModule } from './episode/episode.module';
import { Episode } from './episode/episode.model';
import { SubscriptionModule } from './subscription/subscription.module';
import { Subscription } from './subscription/subscription.model';
import { FollowModule } from './follow/follow.module';
import { Follow } from './follow/follow.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Polevault567*', // Change this and get from env
      database: 'castify',
      models: [User, Podcast, Episode, Subscription, Follow],
    }),
    UserModule,
    PodcastModule,
    EpisodeModule,
    SubscriptionModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
