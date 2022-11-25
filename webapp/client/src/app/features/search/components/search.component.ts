import { Component, OnInit } from '@angular/core';
import { Podcast } from '@features/podcasts/podcast';
import { Episode } from '@features/episodes/episode';
import { User } from '@features/users/user';
import { PodcastsService } from '@features/podcasts/podcasts.service';
import { EpisodesService } from '@features/episodes/episodes.service';
import { UsersService } from '@features/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  currentUserId: number = -1;

  searchType: string = '';
  queryStr: string = '';
  resultsType: string = '';

  numEpisodes: number = 0;
  sortingParam: string = '';
  friendsOnly: boolean = false;

  podcastResults: Podcast[] = [];
  episodesResult: Episode[] = [];
  usersResult: User[] = [];

  constructor(
    private podcastsService: PodcastsService,
    private episodesService: EpisodesService,
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchType = 'podcast';
    this.sortingParam = 'title';

    this.currentUserId = Number(localStorage.getItem('userId'));
    console.log(this.currentUserId);
  }

  async search() {
    this.resultsType = '';
    if (this.searchType == 'user') {
      let users = await this.usersService.searchUsers(this.currentUserId, this.queryStr, this.friendsOnly);
      if (users != null) {
        this.usersResult = users;
        this.resultsType = 'user';
      } else {
        this.podcastResults = [];
        this.resultsType = '';
      }
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
