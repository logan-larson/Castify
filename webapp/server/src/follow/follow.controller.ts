import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Patch,
  Param,
} from '@nestjs/common';
import { FollowDto } from './dtos/follow.dto';
import { FollowService } from './follow.service';

@Controller('/api')
export class FollowController {
  constructor(private followService: FollowService) {}

  /*
  @Post('fo')
  async createFollow(
    @Body() subscriptionDto: SubscriptionDto,
  ): Promise<SubscriptionDto> {
    try {
      return await this.subscriptionService.create(subscriptionDto);
    } catch (err) {
      throw new HttpException(
        'Error in creating subscription',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  */

  @Patch('followers/:followerId/followees/:followeeId')
  async updateFollow(
    @Param('followerId') followerId: number,
    @Param('followeeId') followeeId: number,
    @Body() status: { status: string },
  ): Promise<boolean> {
    try {
      return await this.followService.updateFollow(
        followerId,
        followeeId,
        status.status,
      );
    } catch (err) {
      throw new HttpException(
        'Error in updating follow',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
