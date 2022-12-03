import { Component, OnInit } from '@angular/core';
import { SocialService } from '../social.service';

import { Comment } from '../comment';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  createComment: Comment;

  currentUsersComments: Comment[] = [];

  constructor(
    private socialService: SocialService
  ) {
    this.createComment = {
      userId: 0,
      episodeId: 0,
      commentDesc: '',
      commentDate: new Date(),
      timestampStart: 0,
      timestampEnd: 0
    };
  }

  ngOnInit(): void {
    let userId: number = Number(localStorage.getItem('userId'));
    this.getComments(userId);

    this.socialService.getUpdatedCommentsForUserId.subscribe(uid => {
      if (userId == uid) {
        this.getComments(uid);
      }
    });
  }

  async submitComment() {
    let userId: number = Number(localStorage.getItem('userId'));

    this.createComment.commentDate = new Date();
    this.createComment.userId = userId;
    await this.socialService.createComment(this.createComment);

    this.getComments(userId);
  }

  async getComments(userId: number) {
    this.currentUsersComments = await this.socialService.getCommentsByUserId(userId);
  }

}
