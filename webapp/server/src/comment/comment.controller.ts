import { Controller, Post, Body, HttpException, HttpStatus, Patch } from '@nestjs/common';


@Controller('/api/comments')
export class CommentController {

  constructor() {}

  /*
  // -- Create comment --
  @Post()
  async createSubscription(@Body() subscriptionDto: SubscriptionDto): Promise<SubscriptionDto> {
    try {
      return await this.subscriptionService.create(subscriptionDto);
    } catch (err) {
        throw new HttpException('Error in creating subscription', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // -- Delete comment --
  @Delete()
  async updateSubscription(@Body() subscriptionDto: SubscriptionDto): Promise<boolean> {
    try {
      return await this.subscriptionService.update(subscriptionDto);
    } catch (err) {
        throw new HttpException('Error in updating subscription', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  */

}