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

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Polevault567*', // Change this and get from env
      database: 'castify',
      models: [User, Podcast, Episode],
    }),
    UserModule,
    PodcastModule,
    EpisodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
