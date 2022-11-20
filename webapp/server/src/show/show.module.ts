import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Show } from './show.model';

@Module({
  imports: [SequelizeModule.forFeature([Show])],
  providers: [ShowService],
  controllers: [ShowController]
})
export class ShowModule {}
