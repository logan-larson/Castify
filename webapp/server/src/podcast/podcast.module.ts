import { Module } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { PodcastController } from './podcast.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Podcast } from './podcast.model';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [SequelizeModule.forFeature([Podcast]), SubscriptionModule],
  providers: [PodcastService],
  controllers: [PodcastController],
  exports: [PodcastService]
})
export class PodcastModule {}
