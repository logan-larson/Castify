import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FollowController } from './follow.controller';
import { Follow } from './follow.model';
import { FollowService } from './follow.service';

@Module({
  imports: [SequelizeModule.forFeature([Follow])],
  providers: [FollowService],
  controllers: [FollowController],
  exports: [FollowService],
})
export class FollowModule {}
