import { Column, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'subscribes_to' })
export class Subscription extends Model {

  @Column({
    allowNull: false
  })
  userId: number;

  @Column({
    allowNull: false
  })
  podcastId: number;

  @Column
  subscribeDate: Date;

  @Column
  unsubscribeDate: Date;

}