import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { SubscriptionDto } from './dtos/subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('/api/subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  async createSubscription(
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

  @Patch()
  async updateSubscription(
    @Body() subscriptionDto: SubscriptionDto,
  ): Promise<boolean> {
    try {
      console.log(subscriptionDto);
      return await this.subscriptionService.update(subscriptionDto);
    } catch (err) {
      throw new HttpException(
        'Error in updating subscription',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
