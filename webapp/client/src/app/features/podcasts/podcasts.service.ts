import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Podcast } from './podcast';

@Injectable({
  providedIn: 'root'
})
export class PodcastsService {

  currentPodcastResults: Podcast[] = [];

  constructor(private http: HttpClient) {}

  async searchPodcast(name: string, numEpisodes: number): Promise<Podcast[] | null> {
    try {
      let userId: number = Number(localStorage.getItem('userId'));
      let data = await this.http
        .get<Podcast[]>(`/api/podcasts/count?name=${name}&count=${numEpisodes}&userId=${userId}`)
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
}
