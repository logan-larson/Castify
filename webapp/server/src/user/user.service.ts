import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { UserDto } from './dtos/user.dto';
import { UserSearchDto } from './dtos/user-search.dto';
//import { QueryTypes } from 'sequelize/types';
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

  async findOneByUsername(username: string): Promise<User> {
    try {
      const [data, meta] = await this.sequelize
        .query('SELECT * FROM User WHERE username = :username LIMIT 1', {
          model: User,
          mapToModel: true,
          replacements: { username: username },
        });

        console.log(data);

        return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findOneById(id: string): Promise<User> {
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
    const user = await this.findOneById(id);
    await user.destroy();
  }

  async create(userDto: {username, password}): Promise<User> {
    try {

      let existingUser: User = await this.findOneByUsername(userDto.username);

      if (existingUser != null)
        return null;

      await this.sequelize
        .query('INSERT INTO User (username, password, isActive) VALUES (:username, :password, true)', {
          replacements: { username: userDto.username, password: userDto.password }
        });

      let newUser: User = await this.findOneByUsername(userDto.username);

      return newUser;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async findWithUsername(username: string): Promise<UserSearchDto[]> {
    return await this.sequelize
      .query<UserSearchDto>(`
        SELECT userId, username, avatar FROM user
        WHERE username LIKE '%${username}%'
      `, { type: QueryTypes.SELECT });
  }

  async findFriends(userId: number, username: string): Promise<UserSearchDto[]> {
    let lowerUsername = username.toString().toLowerCase();
    return await this.sequelize
      .query<UserSearchDto>(`
      SELECT Q1.userId, Q1.username, Q1.avatar FROM
        (SELECT followee.userId, followee.username, followee.avatar
        FROM user AS follower JOIN follows JOIN user AS followee
        ON follower.userId = follows.followerId AND follows.followeeId = followee.userId
        WHERE follower.userId = ${userId}) AS Q1
      JOIN
        (SELECT follower.userId
        FROM user AS follower JOIN follows JOIN user AS followee
        ON follower.userId = follows.followerId AND follows.followeeId = followee.userId
        WHERE followee.userId = ${userId}) AS Q2
      WHERE Q1.userId = Q2.userId AND Q1.username LIKE '%${lowerUsername}%';
      `, {
        type: QueryTypes.SELECT
      });
  }

}
