import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from './user.model';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize
  ) { }

  async getAllActive(): Promise<User[]> {
    try {
      await this.sequelize
        .query('SELECT * FROM User WHERE isActive = true', {
          model: User,
          mapToModel: true
        })
        .then(users => {
          return users;
        })
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    try {
      await this.sequelize
        .query('SELECT * FROM User WHERE id = :id', {
          model: User,
          mapToModel: true,
          replacements: { id: id }
        })
        .then(user => {
          return user;
        })
    } catch (err) {
      console.log(err);
      return;
    }
  }


  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

}
