import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Podcast } from 'src/app/models/podcast';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  currentPodcastResults: Podcast[] = [];

  constructor(private http: HttpClient) {}

  async searchPodcast(name: string): Promise<Podcast[] | null> {
    try {
      let data = await this.http
        .get<Podcast[]>(`/api/podcasts?name=${name}`)
        .toPromise();

      console.log(data);

      this.currentPodcastResults = data;

      return this.currentPodcastResults;
    } catch (error) {
      this.currentPodcastResults = [];
      console.log('Error in searching for podcasts');
      return null;
    }
  }

  searchEpisode() {}

  searchUser() {}
}
