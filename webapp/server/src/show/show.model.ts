import { Column, Table, Model } from 'sequelize-typescript';

@Table
export class Show extends Model {

  @Column({primaryKey: true})
  showId: number;

  @Column
  name: string

  @Column
  thumbnail: string

  @Column
  rssFeed: string
}