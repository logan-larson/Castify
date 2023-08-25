import { Column, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'follows', timestamps: false })
export class Follow extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  })
  followerId: number;

  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  })
  followeeId: number;

  @Column
  followDate: Date;

  @Column
  unfollowDate: Date;
}
