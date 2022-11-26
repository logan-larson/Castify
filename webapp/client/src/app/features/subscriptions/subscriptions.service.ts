import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from '@features/subscriptions/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private http: HttpClient) {}

  async createSubscription(userId: number, podcastId: number): Promise<boolean> {
    try {
      let subscriptionDto: Subscription = {
        userId: userId,
        podcastId: podcastId,
        subscribeDate: new Date(),
        unsubscribeDate: null
      }

      let subscription = await this.http.post<Subscription>(
        `/api/subscriptions`,
        subscriptionDto
      ).toPromise();


      return true;
    } catch (err) {
      return false;
    }
  }

  async changeSubscription(userId: number, podcastId: number, status: string): Promise<boolean> {
    try {
      let subscriptionDto: Subscription;
      let isUpdated: boolean;

      if (status == 'unsubscribed') {
        subscriptionDto = {
          userId: userId,
          podcastId: podcastId,
          unsubscribeDate: new Date()
        }
      } else {
        subscriptionDto = {
          userId: userId,
          podcastId: podcastId,
          subscribeDate: new Date(),
          unsubscribeDate: null
        }

      }
      isUpdated = await this.http.patch<boolean>(
        `/api/subscriptions`,
        subscriptionDto
      ).toPromise();

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

}