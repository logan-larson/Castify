import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http: HttpClient) {}

  /*
  async createComment(userId: number, podcastId: number): Promise<boolean> {
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

  async deleteComment(userId: number, podcastId: number, status: string): Promise<boolean> {
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
  */

  async getCommentsByUserId(userId: number): Promise<Comment[]> {
    try {
      return await this.http.get<Comment[]>(`/api/users/${userId}/comments`).toPromise();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

}