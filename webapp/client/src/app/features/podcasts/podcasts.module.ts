import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastCardComponent } from './components/podcast-card.component';
import { PodcastsService } from './podcasts.service';

@NgModule({
  declarations: [PodcastCardComponent],
  providers: [PodcastsService],
  imports: [
    CommonModule
  ]
})
export class PodcastsModule { }
