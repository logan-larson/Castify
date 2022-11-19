import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {

  constructor(private readonly userService: UserService) { }

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

    if (user == null)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    if (userDto.password != user.password || !user.isActive)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

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
  getUserId(@Param() params) {
    return this.userService.findOneById(params.id);
  }

}
