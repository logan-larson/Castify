import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    console.log("Hit login endpoint");
    return;
  }

  @Post('/user')
  authenticateUser(@Body() userDto: CreateUserDto): UserDto {
    console.log(JSON.stringify(userDto));
    if (userDto.username != 'logan' || userDto.password != 'larson')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    let u: UserDto = new UserDto();
    u.id = 1;
    u.username = 'logan';
    u.password = 'larson';
    u.isActive = true;

    return u;
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
    return this.userService.findOne(params.id);
  }

}
