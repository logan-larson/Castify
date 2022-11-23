import { Column, Table, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  userId: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  avatar: string;

  @Column
  joinDate: Date;

  @Column({ defaultValue: true })
  isActive: number;
}
