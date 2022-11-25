import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PodcastsModule } from '@features/podcasts/podcasts.module';
import { EpisodesModule } from '@features/episodes/episodes.module';
import { UsersModule } from '@features/users/users.module';

import { SearchComponent } from './components/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, FormsModule, PodcastsModule, EpisodesModule, UsersModule],
  exports: [SearchComponent],
})
export class SearchModule {}
