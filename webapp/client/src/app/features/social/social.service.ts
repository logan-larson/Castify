import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  @Output() getUpdatedCommentsForUserId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  async createComment(commentDto: Comment): Promise<boolean> {
    try {
      let comment = await this.http.post<Comment>(
        `/api/comments`,
        commentDto
      ).toPromise();


      return true;
    } catch (err) {
      return false;
    }
  }

  async deleteComment(userId: number, episodeId: number): Promise<boolean> {
    try {
      let isDeleted = await this.http.delete<boolean>(
        `/api/comments?userId=${userId}&episodeId=${episodeId}`
      ).toPromise();

      return isDeleted;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getCommentsByUserId(userId: number): Promise<Comment[]> {
    try {
      return await this.http.get<Comment[]>(`/api/users/${userId}/comments`).toPromise();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

}