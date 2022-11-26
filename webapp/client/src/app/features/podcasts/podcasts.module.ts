import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsModule } from '@features/subscriptions/subscriptions.module';

import { PodcastCardComponent } from './components/podcast-card.component';

import { PodcastsService } from './podcasts.service';

@NgModule({
  declarations: [PodcastCardComponent],
  providers: [PodcastsService],
  imports: [
    CommonModule,
    SubscriptionsModule
  ],
  exports: [PodcastCardComponent]
})
export class PodcastsModule { }
