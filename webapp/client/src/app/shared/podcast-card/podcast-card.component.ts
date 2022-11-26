import { Component, Input, OnInit } from '@angular/core';
import { Podcast } from 'src/app/features/podcasts/podcast';
//import { PodcastsService } from '@features/podcasts/podcasts.service';
import { SubscriptionsService } from '@features/subscriptions/subscriptions.service';

@Component({
  selector: 'app-podcast-card',
  templateUrl: './podcast-card.component.html',
  styleUrls: ['./podcast-card.component.css'],
})
export class PodcastCardComponent implements OnInit {

  @Input() podcast!: Podcast;

  subscriptionStatus: string = 'none';
  subscriptionButtonStr: string = 'Subscribe';

  constructor(
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.setStatus();
  }

  setStatus(status?: string) {
    // Set subscription status
    if (status) {
      this.subscriptionStatus = status;
    } else if (this.podcast.subscriptionStatus) {
      this.subscriptionStatus = this.podcast.subscriptionStatus;
    }

    // Set the subscription button string
    // If user has never subscribed or is unsubscribed currently
    // show 'Subscribe'
    if (this.subscriptionStatus == 'none' || this.subscriptionStatus == 'unsubscribed') {
      this.subscriptionButtonStr = 'Subscribe';
    } else { // If user is currently subscribed show 'Unsubscribe'
      this.subscriptionButtonStr = 'Unsubscribe';
    }
  }

  async changeSubscription() {
    if (this.subscriptionStatus == 'none') {
      let userId: number = Number(localStorage.getItem('userId'));
      let res = await this.subscriptionsService.createSubscription(userId, this.podcast.podcastId);
      
      if (res) {
       this.subscriptionStatus = 'subscribed';
       this.setStatus(this.subscriptionStatus);
      }
    } else if (this.subscriptionStatus == 'subscribed') { // User is currently subscribed and is now unsubscribing
      let userId: number = Number(localStorage.getItem('userId'));
      let res = await this.subscriptionsService.changeSubscription(userId, this.podcast.podcastId, 'unsubscribed');

      if (res) {
       this.subscriptionStatus = 'unsubscribed';
       this.setStatus(this.subscriptionStatus);
      }
    } else { // User is currently unsubscribed and is now re-subscribing
      // every time someone subscribes
      let userId: number = Number(localStorage.getItem('userId'));
      let res = await this.subscriptionsService.changeSubscription(userId, this.podcast.podcastId, 'subscribed');

      if (res) {
       this.subscriptionStatus = 'subscribed';
       this.setStatus(this.subscriptionStatus);
      }
    }
  }
}
