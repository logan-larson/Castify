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

  async create(comDto: CommentDto): Promise<CommentDto> {

    await this.sequelize.query(`INSERT INTO comments_on (episodeId, userId, commentDesc, commentDate, timestampStart, timestampEnd) VALUES (${comDto.episodeId}, ${comDto.userId}, '${comDto.commentDesc}', '${comDto.commentDate.toString().substring(0, 10)}', ${comDto.timestampStart}, ${comDto.timestampEnd})`, { type: QueryTypes.INSERT });

    return comDto;
  }

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

  async delete(userId: number, episodeId: number): Promise<boolean> {
    try {
      await this.sequelize.query(`DELETE FROM comments_on WHERE userId = ${userId} AND episodeId = ${episodeId}`, { type: QueryTypes.DELETE });

      return true;
    } catch (err) {
      return false;
    }
  }

}
