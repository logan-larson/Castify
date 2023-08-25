import { Column, Table, Model } from 'sequelize-typescript';

@Table
export class Episode extends Model {

  @Column({primaryKey: true})
  episodeId: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  duration: number;

  @Column
  releaseDate: Date;

  @Column
  podcastId: number;
}