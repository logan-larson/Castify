import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionController } from './subscription.controller';
import { Subscription } from './subscription.model';
import { SubscriptionService } from './subscription.service';


@Module({
  imports: [SequelizeModule.forFeature([Subscription])],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
  exports: [SubscriptionService]
})
export class SubscriptionModule {}
