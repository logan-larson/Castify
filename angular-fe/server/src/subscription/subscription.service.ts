import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SearchPodcastDto } from 'src/podcast/dtos/searchPodcast.dto';
import { SubscriptionDto } from './dtos/subscription.dto';
import { UpdateSubscriptionDto } from './dtos/update-subscription.dto';
import { Subscription } from './subscription.model';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private subscriptionModel: typeof Subscription,
    private sequelize: Sequelize,
  ) {}

  async create(subDto: SubscriptionDto): Promise<SubscriptionDto> {
    await this.sequelize.query(
      `INSERT INTO subscribes_to (userId, podcastId, subscribeDate, unsubscribeDate) VALUES (${
        subDto.userId
      }, ${subDto.podcastId}, '${subDto.subscribeDate
        .toString()
        .substring(0, 10)}', ${subDto.unsubscribeDate})`,
      { type: QueryTypes.INSERT },
    );

    return subDto;
  }

  async getUsersSubscriptions(userId: number): Promise<SubscriptionDto[]> {
    return await this.sequelize.query<SubscriptionDto>(
      `SELECT * FROM subscribes_to WHERE subscribes_to.userId = ${userId}`,
      {
        type: QueryTypes.SELECT,
      },
    );
  }

  async update(updateSubDto: UpdateSubscriptionDto): Promise<boolean> {
    try {
      if (updateSubDto.subscribeDate) {
        await this.sequelize.query(
          `UPDATE subscribes_to SET subscribeDate = '${updateSubDto.subscribeDate
            .toString()
            .substring(0, 10)}', unsubscribeDate = NULL WHERE userId = ${
            updateSubDto.userId
          } AND podcastId = ${updateSubDto.podcastId}`,
          { type: QueryTypes.UPDATE },
        );
      } else {
        await this.sequelize.query(
          `UPDATE subscribes_to SET unsubscribeDate = '${updateSubDto.unsubscribeDate
            .toString()
            .substring(0, 10)}' WHERE userId = ${
            updateSubDto.userId
          } AND podcastId = ${updateSubDto.podcastId}`,
          { type: QueryTypes.UPDATE },
        );
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}
