import { Column, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'comments_on' })
export class Comment extends Model {

  @Column({
    allowNull: false
  })
  userId: number;

  @Column({
    allowNull: false
  })
  episodeId: number;

  @Column
  commentDesc: string;

  @Column
  commentDate: Date;

  @Column
  timestampStart: number;

  @Column
  timestampEnd: number;

}