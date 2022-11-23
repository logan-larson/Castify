import { Component, OnInit } from '@angular/core';
import { Podcast } from 'src/app/features/podcasts/podcast';
import { SearchService } from '@core/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchType: string = '';
  queryStr: string = '';
  resultsType: string = '';

  podcastResults: Podcast[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchType = 'podcast';
  }

  async search() {
    this.resultsType = '';
    if (this.searchType == 'user') {
      console.log('TODO: search users');
    } else if (this.searchType == 'podcast') {
      let podcasts = await this.searchService.searchPodcast(this.queryStr);
      if (podcasts != null) {
        this.podcastResults = podcasts;
        this.resultsType = 'podcast';
      } else {
        this.podcastResults = [];
        this.resultsType = '';
      }
    } else if (this.searchType == 'episode') {
      console.log('TODO: search episodes');
    }
  }
}
