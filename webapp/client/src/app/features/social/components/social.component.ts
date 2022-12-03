import { Component, OnInit } from '@angular/core';
import { SocialService } from '../social.service';

import { Comment } from '../comment';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  
  episodeId: number = 0;
  commentDesc: string = '';

  currentUsersComments: Comment[] = [];

  constructor(
    private socialService: SocialService
  ) { }

  ngOnInit(): void {
    let userId: number = Number(localStorage.getItem('userId'));
    this.getComments(userId);
  }

  async submitComment() {
    console.log(`Episode: ${this.episodeId}\nComment: ${this.commentDesc}`);
  }

  async getComments(userId: number) {
    this.currentUsersComments = await this.socialService.getCommentsByUserId(userId);
  }

}
