import { Component, OnInit } from '@angular/core';
import { Podcast } from '@features/podcasts/podcast';
import { SubscriptionsService } from '../subscriptions.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  subscriptions: Podcast[] = [];

  constructor(
    private subscriptionsService: SubscriptionsService
  ) { }

  ngOnInit(): void {
    this.getSubscriptions();
  }

  async getSubscriptions() {
    let userId: number = Number(localStorage.getItem('userId'));
    this.subscriptions = await this.subscriptionsService.getPodcastSubscriptions(userId);
  }

}
