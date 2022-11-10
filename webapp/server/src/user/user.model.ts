import { Column, Table, Model } from "sequelize-typescript";

@Table
export class User extends Model {

  @Column({primaryKey: true})
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
