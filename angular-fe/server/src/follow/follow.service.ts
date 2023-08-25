import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UserSearchDto } from 'src/user/dtos/user-search.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { FollowDto } from './dtos/follow.dto';
import { UpdateFollowDto } from './dtos/update-follow.dto';
import { Follow } from './follow.model';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow)
    private followModel: typeof Follow,
    private sequelize: Sequelize,
  ) {}

  async create(followerId: number, followeeId: number): Promise<FollowDto> {
    let follow: FollowDto = await this.followModel.create({
      followerId: followerId,
      followeeId: followeeId,
      followDate: new Date(),
      unfollowDate: null,
    });

    return follow;
  }

  async getUsersFollowees(userId: number): Promise<FollowDto[]> {
    return await this.sequelize.query<FollowDto>(
      `SELECT * FROM follows WHERE follows.followerId = ${userId} AND follows.unfollowDate IS NULL`,
      { type: QueryTypes.SELECT },
    );
  }

  async updateFollow(
    followerId: number,
    followeeId: number,
    status: string,
  ): Promise<boolean> {
    try {
      if (status == 'notFollowing') {
        // User wants to unfollow the followee
        await this.sequelize.query(
          `UPDATE follows SET unfollowDate = '${new Date()
            .toISOString()
            .substring(
              0,
              10,
            )}' WHERE followerId = ${followerId} AND followeeId = ${followeeId}`,
          { type: QueryTypes.UPDATE },
        );
      } else {
        // User wants to re-follow the followee
        await this.sequelize.query(
          `UPDATE follows SET followDate = '${new Date()
            .toISOString()
            .substring(
              0,
              10,
            )}', unfollowDate = NULL WHERE followerId = ${followerId} AND followeeId = ${followeeId}`,
          { type: QueryTypes.UPDATE },
        );
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}
