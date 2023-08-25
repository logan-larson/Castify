import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Episode } from './episode.model';

@Module({
  imports: [SequelizeModule.forFeature([Episode])],
  providers: [EpisodeService],
  controllers: [EpisodeController]
})
export class EpisodeModule {}
