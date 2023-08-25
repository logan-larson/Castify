import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodeSearchCardComponent } from './components/episode-search-card/episode-search-card.component';
import { EpisodesService } from './episodes.service';

@NgModule({
  declarations: [EpisodeSearchCardComponent],
  providers: [EpisodesService],
  imports: [
    CommonModule
  ]
})
export class EpisodesModule { }