import { Column, Table, Model } from 'sequelize-typescript';

@Table
export class Podcast extends Model {

  @Column({primaryKey: true})
  podcastId: number;

  @Column
  name: string;

  @Column
  thumbnail: string;

  @Column
  rssFeed: string;
}