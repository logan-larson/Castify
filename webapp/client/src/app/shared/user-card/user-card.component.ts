import { Component, Input, OnInit } from '@angular/core';
import { Podcast } from 'src/app/features/podcasts/podcast';
//import { PodcastsService } from '@features/podcasts/podcasts.service';
import { SubscriptionsService } from '@features/subscriptions/subscriptions.service';
import { User } from '@features/users/user';
import { UsersService } from '@features/users/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;

  followingStatus: string = 'none';
  followingButtonStr: string = 'Follow';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.setStatus();
  }

  setStatus(status?: string) {
    console.log(
      `setStatus: param: ${status} | user: ${this.user.followingStatus} `
    );
    // Set following status
    if (status) {
      this.followingStatus = status;
    } else if (this.user.followingStatus) {
      this.followingStatus = this.user.followingStatus;
    }

    // Set the following button string
    // If current user has never followed the user or is not following currently
    // show 'Follow'
    if (
      this.followingStatus == 'none' ||
      this.followingStatus == 'notFollowing'
    ) {
      this.followingButtonStr = 'Follow';
    } else {
      // If current user is currently following the user show 'Unfollow'
      this.followingButtonStr = 'Unfollow';
    }
  }

  async changeFollowing() {
    console.log(`changeFollowing: ${this.followingStatus}`);
    console.log(this.followingStatus);
    if (this.followingStatus == 'none') {
      let userId: number = Number(localStorage.getItem('userId'));
      let res = await this.usersService.createFollow(userId, this.user.userId);

      if (res) {
        this.followingStatus = 'following';
        this.setStatus(this.followingStatus);
      }
    } else if (this.followingStatus == 'following') {
      // User is currently following and is now unfollowing
      let userId: number = Number(localStorage.getItem('userId'));
      let res = await this.usersService.changeFollowingStatus(
        userId,
        this.user.userId,
        'notFollowing'
      );

      if (res) {
        this.followingStatus = 'notFollowing';
        this.setStatus(this.followingStatus);
      }
    } else {
      // Current user is currently not following this user and is now re-following
      let userId: number = Number(localStorage.getItem('userId'));
      let res = await this.usersService.changeFollowingStatus(
        userId,
        this.user.userId,
        'following'
      );

      if (res) {
        this.followingStatus = 'following';
        this.setStatus(this.followingStatus);
      }
    }
  }
}
