import { Component, OnInit } from '@angular/core';
import { Podcast } from '@features/podcasts/podcast';
import { Episode } from '@features/episodes/episode';
import { PodcastsService } from '@features/podcasts/podcasts.service';
import { EpisodesService } from '@features/episodes/episodes.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchType: string = '';
  queryStr: string = '';
  resultsType: string = '';

  numEpisodes: number = 0;
  sortingParam: string = '';

  podcastResults: Podcast[] = [];
  episodesResult: Episode[] = [];

  constructor(
    private podcastsService: PodcastsService,
    private episodesService: EpisodesService
  ) {}

  ngOnInit(): void {
    this.searchType = 'podcast';
    this.sortingParam = 'title';
  }

  async search() {
    this.resultsType = '';
    if (this.searchType == 'user') {
      console.log('TODO: search users');
    } else if (this.searchType == 'podcast') {
      let podcasts = await this.podcastsService.searchPodcast(this.queryStr, this.numEpisodes);
      if (podcasts != null) {
        this.podcastResults = podcasts;
        this.resultsType = 'podcast';
      } else {
        this.podcastResults = [];
        this.resultsType = '';
      }
    } else if (this.searchType == 'episode') {
      let episodes = await this.episodesService.searchEpisodes(this.queryStr, this.sortingParam);
      if (episodes != null) {
        this.episodesResult = episodes;
        this.resultsType = 'episode';
      } else {
        this.episodesResult = [];
        this.resultsType = '';
      }
    }
  }
}
