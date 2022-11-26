import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Episode } from './episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  currentEpisodeSearchResults: Episode[] = [];

  constructor(private http: HttpClient) {}

  async searchEpisodes(title: string, sortParam: string): Promise<Episode[] | null> {
    try {
      let data = await this.http
        .get<Episode[]>(`/api/episodes/sort?title=${title}&sort=${sortParam}`)
        .toPromise();

      this.currentEpisodeSearchResults = data;

      return this.currentEpisodeSearchResults;
    } catch (error) {
      this.currentEpisodeSearchResults = [];
      console.log('Error in searching for episodes');
      return null;
    }
  }
}
