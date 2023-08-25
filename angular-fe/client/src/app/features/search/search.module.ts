import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PodcastsModule } from '@features/podcasts/podcasts.module';
import { EpisodesModule } from '@features/episodes/episodes.module';
import { UsersModule } from '@features/users/users.module';
import { UserCardModule } from '@shared/user-card/user-card.module';

import { SearchComponent } from './components/search.component';
import { PodcastCardComponent } from '@features/podcasts/components/podcast-card.component';
import { UserCardComponent } from '@shared/user-card/user-card.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    PodcastsModule,
    EpisodesModule,
    UsersModule,
    UserCardModule,
  ],
  exports: [SearchComponent, PodcastCardComponent],
})
export class SearchModule {}
