import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  createUser(): Promise<UserDto> {
    console.log("Hit login endpoint");
    return;
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
