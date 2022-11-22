import { Module } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { PodcastController } from './podcast.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Podcast } from './podcast.model';

@Module({
  imports: [SequelizeModule.forFeature([Podcast])],
  providers: [PodcastService],
  controllers: [PodcastController]
})
export class PodcastModule {}
