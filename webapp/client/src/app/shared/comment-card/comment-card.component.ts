import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '@features/social/comment';
import { SocialService } from '@features/social/social.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent implements OnInit {

  @Input() comment!: Comment;

  constructor(private socialService: SocialService) {}

  ngOnInit(): void {
  }

  async delete() {
    let isDeleted: boolean = await this.socialService.deleteComment(this.comment.userId, this.comment.episodeId);

    console.log(`Deleted: ${isDeleted}`);

    this.socialService.getUpdatedCommentsForUserId.emit(this.comment.userId);
  }

}
