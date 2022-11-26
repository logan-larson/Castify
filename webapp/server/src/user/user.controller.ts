import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserSearchDto } from './dtos/user-search.dto';
import { SearchPodcastDto } from 'src/podcast/dtos/searchPodcast.dto';
import { PodcastService } from 'src/podcast/podcast.service';

@Controller('/api/users')
export class UserController {
  
  constructor(
    private userService: UserService,
    private podcastService: PodcastService
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    let user: User = await this.userService.create(createUserDto);

    if (user == null)
      throw new HttpException('Username taken', HttpStatus.FORBIDDEN);

    return user;
  }

  @Post('/user')
  async authenticateUser(@Body() userDto: CreateUserDto): Promise<UserDto> {
    let user: User = await this.userService.findOneByUsername(userDto.username);

    if (user == null || userDto.password != user.password) {
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.FORBIDDEN,
      );
    }

    if (user.isActive == 0)
      throw new HttpException('Inactive user', HttpStatus.FORBIDDEN);

    return user;
  }

  /*
  @Get('active')
  async getActiveUsers(): Promise<User[]> {
    return await this.userService.getAllActive();
  }
  */

  @Get('active')
  async getActiveUsers(): Promise<string> {
    let str: string = 'Hell';

    let users = await this.userService.getAllActive();

    str = JSON.stringify(users);

    return str;
  }

  @Get(':id')
  async getUsersWithUsername(@Query() queryParams): Promise<UserSearchDto[]> {
    try {
      return await this.userService.findWithUsername(queryParams.username);
    } catch (err) {
      throw new HttpException('Error in finding users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id/friends')
  async getFriendsWithUsername(@Param() params, @Query() query): Promise<UserSearchDto[]> {
    try {
      return await this.userService.findFriends(params.id, query.username);
    } catch (err) {
      throw new HttpException('Error in finding friends', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  getUserId(@Param() params) {
    return this.userService.findOneById(params.id);
  }


  @Get(':userId/subscriptions')
  async getSubscriptions(@Param() params): Promise<SearchPodcastDto[]> {
    try {
      let podcasts = await this.podcastService.findAllByNameWithEpCount('', 0, params.userId);
      console.log(podcasts);
      return podcasts.filter(p => p.subscriptionStatus == 'subscribed');
    } catch (error) {
      console.log(error);
      throw new HttpException('Error in getting subscriptions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
