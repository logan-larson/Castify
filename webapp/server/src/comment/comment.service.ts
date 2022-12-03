import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Comment } from './comment.model';
import { CommentDto } from './dtos/comment.dto';


@Injectable()
export class CommentService {

  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
    private sequelize: Sequelize
  ) { }

  /*
  async create(subDto: SubscriptionDto): Promise<SubscriptionDto> {

    await this.sequelize.query(`INSERT INTO subscribes_to (userId, podcastId, subscribeDate, unsubscribeDate) VALUES (${subDto.userId}, ${subDto.podcastId}, '${subDto.subscribeDate.toString().substring(0, 10)}', ${subDto.unsubscribeDate})`, { type: QueryTypes.INSERT });

    return subDto;
  }
  */

  /* Get comments by a specific user */
  async getUsersComments(userId: number): Promise<CommentDto[]> {
    return await this.sequelize.query<CommentDto>(`SELECT * FROM comments_on WHERE comments_on.userId = ${userId}`, { type: QueryTypes.SELECT });
  }

  /* Get comments by users contained in the userIds list */
  async getCommentsByUsers(userIds: number[]): Promise<CommentDto[]> {
    if (userIds.length == 0) return [];

    let idList: string = `(${userIds[0]}`;
    for (let i = 1; i < userIds.length; i++) {
      idList += `, ${userIds[i]}`;
    }
    idList += ')';

    return await this.sequelize.query<CommentDto>(`SELECT * FROM comments_on WHERE comments_on.userId IN ${idList}`, { type: QueryTypes.SELECT });
  }

  /*
  async update(updateSubDto: UpdateSubscriptionDto): Promise<boolean> {
    try {
      if (updateSubDto.subscribeDate) {
        await this.sequelize.query(`UPDATE subscribes_to SET subscribeDate = '${updateSubDto.subscribeDate.toString().substring(0, 10)}', unsubscribeDate = '${updateSubDto.unsubscribeDate.toString().substring(0, 10)}' WHERE userId = ${updateSubDto.userId} AND podcastId = ${updateSubDto.podcastId}`, { type: QueryTypes.UPDATE });
      } else {
        await this.sequelize.query(`UPDATE subscribes_to SET unsubscribeDate = '${updateSubDto.unsubscribeDate.toString().substring(0, 10)}' WHERE userId = ${updateSubDto.userId} AND podcastId = ${updateSubDto.podcastId}`, { type: QueryTypes.UPDATE });
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  */

}
