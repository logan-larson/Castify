import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Podcast } from 'src/app/models/podcast';
import { SearchService } from 'src/app/services/search.service';

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
