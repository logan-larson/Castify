import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { UserDto } from './dtos/user.dto';
import { UserSearchDto } from './dtos/user-search.dto';
//import { QueryTypes } from 'sequelize/types';
import { User } from './user.model';
import { FollowService } from 'src/follow/follow.service';
import { FollowDto } from 'src/follow/dtos/follow.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize,
    private followService: FollowService,
  ) {}

  async getAllActive(): Promise<User[]> {
    try {
      await this.sequelize
        .query('SELECT * FROM User WHERE isActive = true', {
          model: User,
          mapToModel: true,
        })
        .then((users) => {
          return users;
        });
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
      const [data, meta] = await this.sequelize.query(
        'SELECT * FROM User WHERE username = :username LIMIT 1',
        {
          model: User,
          mapToModel: true,
          replacements: { username: username },
        },
      );

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
          replacements: { id: id },
        })
        .then((user) => {
          return user;
        });
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id);
    await user.destroy();
  }

  async create(userDto: { username; password }): Promise<User> {
    try {
      let existingUser: User = await this.findOneByUsername(userDto.username);

      if (existingUser != null) return null;

      /*
      this.userModel.create({
        username: userDto.username,
        password: userDto.password,
        avatar: '',
        joinDate: new Date(),
        isActive: true,
      });
      */
      await this.sequelize.query(
        'INSERT INTO User (userId, username, password, isActive) VALUES (DEFAULT, :username, :password, true)',
        {
          replacements: {
            username: userDto.username,
            password: userDto.password,
          },
        },
      );

      let newUser: User = await this.findOneByUsername(userDto.username);

      return newUser;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async findWithUsername(
    username: string,
    userId: number,
  ): Promise<UserSearchDto[]> {
    // Finds all users that match search query
    let users: UserSearchDto[] = await this.sequelize.query<UserSearchDto>(
      `
        SELECT userId, username, avatar FROM user
        WHERE username LIKE '%${username}%' AND isActive = true AND userId != ${userId}
      `,
      { type: QueryTypes.SELECT },
    );

    // Get ids of all users the current user follows
    let followedDtos: FollowDto[] = await this.followService.getUsersFollowees(
      userId,
    );

    users.forEach((u) => {
      u.followingStatus = 'none';
      followedDtos.forEach((f) => {
        if (u.userId == f.followeeId) {
          if (f.unfollowDate == null) {
            u.followingStatus = 'following';
          } else {
            u.followingStatus = 'notFollowing';
          }
        }
      });
    });

    return users;
  }

  async findFriends(
    userId: number,
    username: string,
  ): Promise<UserSearchDto[]> {
    let lowerUsername = username.toString().toLowerCase();
    let friends: UserSearchDto[] = await this.sequelize.query<UserSearchDto>(
      `
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
      `,
      {
        type: QueryTypes.SELECT,
      },
    );

    friends.forEach((f) => (f.followingStatus = 'following'));

    return friends;
  }
}
